# [My Python Web Practice](../README.md)

Django, Flask, FastAPI and aiogram


### \<List>

- [*aiogram* : Telegram Bot with Local Ollama LLM (2026.04.04)](#aiogram--telegram-bot-with-local-ollama-llm-20260404)
- [*aiogram* : Telegram Bot Initial Practice (2026.03.31)](#aiogram--telegram-bot-initial-practice-20260331)
- [Flask/FastAPI : Sum Calculator (2024.06.07)](#flaskfastapi--sum-calculator-20240607)


## [*aiogram* : Telegram Bot with Local Ollama LLM (2026.04.04)](#list)

- Extended Telegram bot using *aiogram* and a local Ollama LLM
  - Idle-time watchdog sends periodic AI thoughts after a configurable silence interval.
  - Supports direct chat replies through local Ollama on every user message.
  - Topics, system prompt, and idle interval are configured in `.env`.

    ![Telegram_Bot_02_20260405_0451.png](./aiogram/telegram_bot_with_ollama/images/Telegram_Bot_02_20260405_0451.PNG)


- Development Environment  
  - *Python* 3.8.17 / *aiogram* 3.5.0 / *aiohttp* / *python-dotenv* with local Ollama.

- How to Run
  - Installation : `pip install aiogram python-dotenv`
  - Copy `.env` from `.env_sample` and configure:
    - `BOT_TOKEN`, `USER_ID`, `OLLAMA_BASE_URL`, `LLM_MODEL`, `REPORT_INTERVAL`, `SYSTEM_PROMPT`, `THOUGHT_TOPICS`
  - Run : `python ./main.py`


## [*aiogram* : Telegram Bot Initial Practice (2026.03.31)](#list)

- Initial Practice for Telegram bot using *aiogram* library
  - Features include periodic time reports, `/time` command, `/pick` command, and echo handler.

  ![telegram_bot_20260402_masking.png](./aiogram/telegram_bot_practice/images/telegram_bot_20260402_masking.png)

- Development Environment  
  - *Python* 3.8.17 / *aiogram* 3.5.0 / *python-dotenv* 1.0.0 in local environment.

- How to Run
  - Installation : `pip install -r requirements.txt`
  - Set environment variables in `.env` file: `BOT_TOKEN` and `USER_ID`
  - Run : `python ./main.py`


## [*Flask*/*FastAPI* : Sum Calculator (2024.06.07)](#list)

- Initial Practice of *Flask* and *FastAPI*  
  - *Flask* is simple but *FastAPI* supports asynchronous programming.
  - The results are absolutely the same.

  ![Sum Calculator](./Images/Flask_FastAPI_SumCalculator.png)

- Development Environment  
  - *Python* 3.8.17 / *Flask* 3.0.3 / *fastapi* 0.111.0 / *Jinja2* 3.1.4 in [*Replit*](https://replit.com/)

- How to Run
  - Flask
    - Installation : `pip install Flask`
    - Run : `flask run` or `python app.py`
  - FastAPI
    - Installation : `pip install fastapi uvicorn jinja2`
    - Run : `fastapi run` or `python main.py`
