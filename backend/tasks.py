from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve()
print(BASE_DIR)
env_path = os.path.join(Path(__file__).resolve().parent.parent, ".env")
load_dotenv(env_path)


conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("GMAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


async def send_email(email: str, message_body=""):
    message = MessageSchema(
        subject="You got message",
        recipients=[email],  # List of recipients, as many as you can pass
        body=message_body,
        subtype="html",
    )
    fm = FastMail(conf)
    await fm.send_message(message)

    return "Success"
