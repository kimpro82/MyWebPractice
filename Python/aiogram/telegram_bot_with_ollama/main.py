"""
Telegram Bot Server: AI Thought Reporter (Idle-Time Watchdog)

This version ensures the bot waits for a specific 'idle duration'
after the last user message before generating a thought.

Author : kimpro82
Date : 2026.04.04
"""

import asyncio
import os
import logging
import json
import random
import aiohttp
import time  # To calculate time differences
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import Command

# --- Logging & Config ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
TARGET_USER_ID = int(os.getenv("USER_ID"))
OLLAMA_URL = f"{os.getenv('OLLAMA_BASE_URL')}/api/generate"
MODEL_NAME = os.getenv("LLM_MODEL", "llama3.1:8b")
# Threshold for idle time (e.g., 3600 seconds = 1 hour)
IDLE_THRESHOLD = int(os.getenv("REPORT_INTERVAL", "3600"))
SYSTEM_PROMPT = os.getenv("SYSTEM_PROMPT", "You are a helpful assistant. Always respond in Korean.")

bot = Bot(token=TOKEN)
dp = Dispatcher()

# Control flags
current_thought_task = None
llm_lock = asyncio.Lock()
# Track the last time the user sent a message (initialized to current time)
last_user_interaction = time.time()

# --- Utility Functions ---

async def call_ollama(prompt: str) -> str:
    instruction = f"System: {SYSTEM_PROMPT}\n\nUser: {prompt}\n\n(Important: Respond in Korean.)\nAssistant:"
    payload = {"model": MODEL_NAME, "prompt": instruction, "stream": False}

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(OLLAMA_URL, json=payload, timeout=300) as resp:
                if resp.status == 200:
                    result = await resp.json()
                    return result.get("response", "Content generation failed.")
                return f"❌ Error: {resp.status}"
    except asyncio.CancelledError:
        raise
    except Exception as e:
        logger.error(f"Ollama Error: {e}")
        return "⚠️ Server Connection Error"

# --- Core Logic: Idle-based Thought Generation ---

async def generate_periodic_thought():
    topics_str = os.getenv("THOUGHT_TOPICS", "[]")
    try:
        topics = json.loads(topics_str)
    except json.JSONDecodeError:
        logger.error("Invalid JSON format in THOUGHT_TOPICS")
        topics = ["Say anything that you are inspired."]

    if llm_lock.locked():
        return

    async with llm_lock:
        topic = random.choice(topics)
        logger.info(f"Starting idle-based thought: {topic[:15]}...")
        try:
            content = await call_ollama(topic)
            await bot.send_message(TARGET_USER_ID, f"💡 **AI 사색 보고**\n\n{content}", parse_mode="Markdown")
        except asyncio.CancelledError:
            logger.info("Thought generation cancelled by user activity.")
        except Exception as e:
            logger.error(f"Periodic generation failed: {e}")

async def idle_watchdog():
    """
    Checks every 10 seconds if the user has been idle longer than the threshold.
    """
    global current_thought_task, last_user_interaction
    logger.info(f"Watchdog started. Idle threshold: {IDLE_THRESHOLD}s")

    while True:
        current_time = time.time()
        idle_duration = current_time - last_user_interaction

        # If idle duration exceeds threshold AND no task is running AND LLM is free
        if idle_duration >= IDLE_THRESHOLD and current_thought_task is None and not llm_lock.locked():
            logger.info(f"User idle for {int(idle_duration)}s. Triggering thought...")
            current_thought_task = asyncio.create_task(generate_periodic_thought())

            try:
                await current_thought_task
            except asyncio.CancelledError:
                pass
            finally:
                current_thought_task = None
                # Reset interaction time after finishing/cancelling to prevent instant re-trigger
                last_user_interaction = time.time()

        await asyncio.sleep(10) # Check every 10 seconds

# --- Telegram Handlers ---

@dp.message(Command("start"))
async def start_handler(message: types.Message):
    await message.answer("🤖 **Idle-Watchdog Mode Active**\nWaiting for 5 mins of silence...")

@dp.message(F.text)
async def chat_handler(message: types.Message):
    global current_thought_task, last_user_interaction

    if message.from_user.is_bot:
        return

    # Update the last interaction time IMMEDIATELY
    last_user_interaction = time.time()

    # Interrupt if AI is currently thinking
    if current_thought_task and not current_thought_task.done():
        logger.info("User interrupted AI thought. Cancelling...")
        current_thought_task.cancel()
        await asyncio.sleep(0.1)

    async with llm_lock:
        await bot.send_chat_action(message.chat.id, "typing")
        response = await call_ollama(message.text)
        await message.reply(response)
        # Update again after response to ensure idle timer starts AFTER bot finishes speaking
        last_user_interaction = time.time()

# --- Main ---

async def main():
    if not TOKEN:
        logger.error("BOT_TOKEN is missing!")
        return

    # Run the watchdog in the background
    asyncio.create_task(idle_watchdog())

    logger.info("Telegram polling started with Idle-Watchdog.")
    try:
        await dp.start_polling(bot, skip_updates=True)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Server shut down.")
