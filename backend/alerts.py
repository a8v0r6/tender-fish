import os
import httpx
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

async def send_tender_alert(telegram_id: str, tender: dict):
    if not TELEGRAM_BOT_TOKEN or not telegram_id:
        print("Skipping alert: No bot token or user ID configured.")
        return

    message = (
        f"🐟 *New Tender Match Found!*\n\n"
        f"*ID:* {tender.get('id')}\n"
        f"*Title:* {tender.get('title')}\n"
        f"*Value:* ₹{tender.get('value'):,.2f}\n"
        f"*Deadline:* {tender.get('deadline')}\n\n"
        f"[View on TenderFish](http://localhost:5173/discovery)"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": telegram_id,
        "text": message,
        "parse_mode": "Markdown"
    }

    try:
        async with httpx.AsyncClient() as client:
            await client.post(url, json=payload)
    except Exception as e:
        print(f"Failed to send Telegram alert: {e}")
