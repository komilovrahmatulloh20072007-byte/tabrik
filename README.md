# Табрик сайтлари — битта лойиҳа, 2 домен

onam/index.html   — домен номида "ustoz" бўлмаса шу очилади
ustoz/index.html  — домен номида "ustoz" бўлса шу очилади
api/send.js       — устоз ёзган хабарни Telegram ботга юборади
vercel.json       — домен бўйича ажратиш

## Vercel → Settings → Environment Variables
TELEGRAM_BOT_TOKEN = Саййоранинг сайтидаги бот токени
TELEGRAM_CHAT_ID   = сизнинг Telegram ID'ингиз (хабар шунга келади)
(BOT_TOKEN / CHAT_ID номлари ҳам ишлайди)

Қўшгандан кейин албатта Redeploy қилинг.
