// Устоз ёзган хабарни Telegram ботга юборади.
// Токен ва chat ID кодда эмас, Vercel → Settings → Environment Variables'да туради.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ ok: false, error: 'not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const text = String(body?.text || '').trim().slice(0, 1500);
  const name = String(body?.name || '').trim().slice(0, 80);
  if (!text) return res.status(400).json({ ok: false, error: 'empty' });

  const message =
    '📩 Хабар устозимдан\n\n' +
    (name ? `👤 ${name}\n\n` : '') +
    `💬 ${text}\n\n` +
    `🕒 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}`;

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const data = await r.json();
    if (!data.ok) return res.status(502).json({ ok: false, error: 'telegram' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'network' });
  }
}
