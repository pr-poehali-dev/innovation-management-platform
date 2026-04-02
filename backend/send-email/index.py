import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка письма на почту УИиП при вопросе или обращении через сайт"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()
    source = body.get("source", "сайт")

    if not message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Сообщение не может быть пустым"}),
        }

    smtp_host = "smtp.yandex.ru"
    smtp_port = 465
    smtp_user = "is.ryzhova@omgau.org"
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    to_email = "is.ryzhova@omgau.org"

    subject = f"Новое обращение с сайта УИиП — {source}"
    html_body = f"""
    <h2>Новое обращение с сайта УИиП</h2>
    <p><b>Источник:</b> {source}</p>
    <p><b>Имя:</b> {name or "не указано"}</p>
    <p><b>Email:</b> {email or "не указан"}</p>
    <hr>
    <p><b>Сообщение:</b></p>
    <p>{message}</p>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = to_email
    if email:
        msg["Reply-To"] = email

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
