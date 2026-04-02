"""
Telegram Bot Server: Practice Project

Date   : 2026.03.31
Author : kimpro82

------------------------------------

Features:
1. Periodic Time Report: Sends KST time every 60 seconds.
2. /time Command: Responds with current server time (KST).
3. /pick Command: Randomly selects one item from a space-separated list.
4. Echo Handler: Replies with 'I received the message: "..."' for any text.

Requirements:
- aiogram
- python-dotenv
"""

import asyncio
import os
import logging
import random
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import Command

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")
TARGET_USER_ID = int(os.getenv("USER_ID"))

# Initialize Bot and Dispatcher
bot = Bot(token=TOKEN)
dp = Dispatcher()

def get_current_time_string():
    """
    Returns the current South Korea time (KST, UTC+9) 
    formatted as YYYY.MM.DD HH:MM:SS.
    """
    kst = timezone(timedelta(hours=9))
    now_kst = datetime.now(kst)
    return now_kst.strftime("%Y.%m.%d %H:%M:%S")

async def send_periodic_time():
    """
    Background task that sends the current time every 60 seconds.
    """
    while True:
        try:
            if TARGET_USER_ID:
                current_time = get_current_time_string()
                await bot.send_message(
                    chat_id=TARGET_USER_ID, 
                    text=f"⏰ Periodic Report: {current_time}"
                )
                logger.info("Periodic time sent: %s", current_time)
        except Exception as e:
            logger.error("Failed to send periodic message: %s", e)
        
        await asyncio.sleep(60)

@dp.message(Command("start"))
async def start_handler(message: types.Message):
    """
    Handle the /start command.
    """
    await message.answer(
        "Welcome! I am your Python Bot.\n"
        "Commands:\n"
        "/time - Check current KST time\n"
        "/pick A B C - Pick one randomly from A, B, and C"
    )
    logger.info("Start command from %s", message.from_user.id)

@dp.message(Command("time"))
async def time_command_handler(message: types.Message):
    """
    Handle the /time command.
    """
    current_time = get_current_time_string()
    await message.reply(f"⌚ Current Server Time (KST): {current_time}")
    logger.info("Time command handled for %s", message.from_user.id)

@dp.message(Command("pick"))
async def pick_command_handler(message: types.Message):
    """
    Randomly picks one item from the provided list.
    Usage: /pick item1 item2 item3
    """
    # Extract arguments after the command
    args = message.text.split()[1:]
    
    if not args:
        await message.reply("Please provide items to pick from! Example: /pick Pizza Pasta Burger")
        return

    selected = random.choice(args)
    await message.reply(f"🎲 I picked: **{selected}**", parse_mode="Markdown")
    logger.info("Pick command: %s selected from %s", selected, args)

@dp.message(F.text)
async def echo_handler(message: types.Message):
    """
    General echo handler for any other text input.
    """
    response_text = f'I received the message: "{message.text}"'
    await message.answer(response_text)
    logger.info("Echoed back to %s: %s", message.from_user.id, message.text)

async def main():
    """
    Main entry point.
    """
    if not TOKEN:
        logger.error("BOT_TOKEN is missing!")
        return

    # Start periodic background task
    asyncio.create_task(send_periodic_time())
    
    # Start long polling
    try:
        logger.info("Bot is starting...")
        await dp.start_polling(bot)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot server shut down.")
