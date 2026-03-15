import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from sqlmodel import Session, select
from database import engine
from models import Project, AssistantContext
from dotenv import load_dotenv
import asyncio

load_dotenv()

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

async def get_assistant_knowledge(key: str) -> str:
    with Session(engine) as session:
        statement = select(AssistantContext).where(AssistantContext.key == key)
        result = session.exec(statement).first()
        return result.value if result else "I don't know about that yet!"

async def get_all_projects_summary() -> str:
    with Session(engine) as session:
        projects = session.exec(select(Project)).all()
        if not projects:
            return "No missions found in the database!"
        
        summary = "🚀 **CURRENT MISSIONS (PROJECTS):**\n\n"
        for p in projects:
            summary += f"🔹 **{p.name}** ({p.category})\n"
            summary += f"   _{p.description[:100]}..._\n\n"
        return summary

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    welcome_text = (
        "BOOM! 💥 Welcome to the VL Murimi HQ Assistant!\n\n"
        "I'm here to help you navigate Victor's digital headquarters.\n"
        "Try these commands:\n"
        "/missions - See all previous and current missions\n"
        "/origin - Learn about Victor's hero origin story\n"
        "/powers - Discover his technical superpowers"
    )
    await message.reply(welcome_text)

@dp.message(Command("missions"))
async def show_missions(message: types.Message):
    summary = await get_all_projects_summary()
    await message.answer(summary, parse_mode="Markdown")

@dp.message(Command("origin"))
async def show_origin(message: types.Message):
    origin = await get_assistant_knowledge("origin_story")
    await message.answer(f"📖 **HERO ORIGIN:**\n\n{origin}")

@dp.message(Command("powers"))
async def show_powers(message: types.Message):
    powers = await get_assistant_knowledge("superpowers")
    await message.answer(f"⚡ **SUPERPOWERS (SKILLS):**\n\n{powers}")

@dp.message()
async def handle_text(message: types.Message):
    # Basic keyword matching or fallback
    text = message.text.lower()
    if "who are you" in text or "assistant" in text:
        await message.reply("I am the VL Murimi Assistant, a high-tech bot designed to help you explore Victor's work!")
    else:
        await message.reply("I'm still learning! Try /missions to see what I know about Victor's work.")

async def start_bot():
    print("Bot is starting...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(start_bot())
