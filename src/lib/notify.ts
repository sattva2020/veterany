// Сповіщення безпеки: Telegram + email.
// Канали конфігуруються через env-змінні. Якщо канал не налаштований — тихо пропускаємо,
// тож фіча безпечна навіть без повного конфігу (нічого не ламає).
//
// Потрібні env (додати в docker-compose сервіс web):
//   ALERT_TELEGRAM_BOT_TOKEN, ALERT_TELEGRAM_CHAT_ID   — Telegram-бот і chat_id
//   ALERT_RESEND_API_KEY, ALERT_EMAIL_FROM, ALERT_EMAIL_TO — email через Resend HTTP API
//   (ALERT_EMAIL_TO — через кому кілька адрес)

type NotifyInput = { subject: string; lines: Record<string, string> }

function formatText(subject: string, lines: Record<string, string>): string {
  const body = Object.entries(lines)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `${subject}\n\n${body}`
}

export async function sendSecurityAlert(input: NotifyInput): Promise<void> {
  const text = formatText(input.subject, input.lines)
  await Promise.allSettled([sendTelegram(input.subject, text), sendEmail(input.subject, text)])
}

async function sendTelegram(subject: string, text: string): Promise<void> {
  const token = process.env.ALERT_TELEGRAM_BOT_TOKEN
  const chatId = process.env.ALERT_TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🔐 ${text}`,
        disable_web_page_preview: true,
      }),
    })
  } catch (error) {
    console.error('[alert] telegram failed:', error)
  }
}

async function sendEmail(subject: string, text: string): Promise<void> {
  const key = process.env.ALERT_RESEND_API_KEY
  const from = process.env.ALERT_EMAIL_FROM
  const to = process.env.ALERT_EMAIL_TO
  if (!key || !from || !to) return
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `[Безпека] ${subject}`,
        text,
      }),
    })
  } catch (error) {
    console.error('[alert] email failed:', error)
  }
}
