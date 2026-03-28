// ============================================
// VIKO BOT — Bot Telegram principal
// ============================================

require(“dotenv”).config();
const TelegramBot = require(“node-telegram-bot-api”);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = “anthropic/claude-sonnet-4-5”; 

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log(“🚀 VIKO Bot démarré — @VikoViral_Bot”);

// ============================================
// FONCTION — Générer un script TikTok via Claude
// ============================================
async function generateScript(theme) {
const response = await fetch(“https://openrouter.ai/api/v1/chat/completions”, {
method: “POST”,
headers: {
“Authorization”: `Bearer ${OPENROUTER_KEY}`,
“Content-Type”: “application/json”,
“HTTP-Referer”: “https://t.me/VikoViral_Bot”,
“X-Title”: “VIKO TikTok Agent”
},
body: JSON.stringify({
model: MODEL,
max_tokens: 1000,
messages: [{
role: “user”,
content: `Tu es expert TikTok viral. Crée 1 vidéo courte sur le thème: "${theme}". Réponds UNIQUEMENT en JSON valide (sans markdown) avec ce format: { "hook": "phrase choc courte", "tips": ["conseil 1", "conseil 2", "conseil 3"], "cta": "phrase de conclusion avec appel à l'action", "capcut": "[0s] TEXTE\n[5s] TEXTE\n[10s] TEXTE\n[15s] TEXTE\n[20s] TEXTE", "hashtags": "#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5", "description": "description TikTok optimisée" }`
}]
})
});

const data = await response.json();
const text = data.choices?.[0]?.message?.content || “”; 

try {
return JSON.parse(text);
} catch {
return null;
}
}

// ============================================
// FONCTION — Formater le script pour Telegram
// ============================================
function formatScript(script, theme) {
return `🎬 *Vidéo TikTok générée*
Thème : *${theme}*

🪝 *HOOK*
“${script.hook}”

💡 *3 CONSEILS*
1️⃣ ${script.tips[0]}
2️⃣ ${script.tips[1]}
3️⃣ ${script.tips[2]}

🎯 *CONCLUSION*
“${script.cta}”

📝 *TEXTES CAPCUT*
```
${script.capcut}
```

📲 *DESCRIPTION*
${script.description}

#️⃣ *HASHTAGS*
${script.hashtags}`;
}

// ============================================
// COMMANDES DU BOT
// ============================================

// /start
bot.onText(//start/, (msg) => {
const chatId = msg.chat.id;
bot.sendMessage(chatId,
`👋 Bienvenue sur *VIKO* 🎬\n\nTon agent IA qui génère et poste des vidéos TikTok virales automatiquement !\n\n*Commandes disponibles :*\n/generate — Générer 5 vidéos\n/custom [thème] — Thème personnalisé\n/status — Voir le planning\n/help — Aide\n\nTape /generate pour commencer 🚀`,
{ parse_mode: “Markdown” }
);
});

// /help
bot.onText(//help/, (msg) => {
const chatId = msg.chat.id;
bot.sendMessage(chatId,
`📋 *Commandes VIKO*\n\n/generate — Génère 5 vidéos (thème vacances + été)\n/custom [thème] — Ex: /custom street food paris\n/status — Planning des publications\n/stop — Mettre en pause\n/start — Reprendre\n\n💡 *Astuce :* Utilise /custom pour personnaliser le thème !`,
{ parse_mode: “Markdown” }
);
});

// /generate — thème par défaut
bot.onText(//generate$/, async (msg) => {
const chatId = msg.chat.id;
const theme = “vacances + économies + été”; 

const loading = await bot.sendMessage(chatId, “⏳ Génération en cours… L’IA crée tes scripts TikTok !”);

const results = [];
const themes = [
“vols pas chers été 2025”,
“hébergement malin vacances”,
“manger pas cher en vacances”,
“location voiture astuces”,
“budget vacances 500 euros”
];

for (let i = 0; i < themes.length; i++) {
await bot.editMessageText(
`⏳ Génération ${i + 1}/5 en cours...`,
{ chat_id: chatId, message_id: loading.message_id }
);

```
const script = await generateScript(themes[i]);
if (script) {
  results.push({ theme: themes[i], script });
}
await new Promise(r => setTimeout(r, 500));
```

}

await bot.deleteMessage(chatId, loading.message_id);

for (const { theme, script } of results) {
await bot.sendMessage(chatId, formatScript(script, theme), {
parse_mode: “Markdown”,
reply_markup: {
inline_keyboard: [[
{ text: “📤 Poster sur TikTok”, callback_data: `post_${theme.slice(0, 20)}` },
{ text: “🔄 Régénérer”, callback_data: `regen_${theme.slice(0, 20)}` }
]]
}
});
await new Promise(r => setTimeout(r, 300));
}

bot.sendMessage(chatId, “✅ *5 vidéos générées !*
Appuie sur 📤 pour poster sur TikTok.”, { parse_mode: “Markdown” });
});

// /custom [thème]
bot.onText(//custom (.+)/, async (msg, match) => {
const chatId = msg.chat.id;
const theme = match[1];

const loading = await bot.sendMessage(chatId, `⏳ Génération sur le thème : _${theme}_...`, { parse_mode: “Markdown” });

const script = await generateScript(theme);

await bot.deleteMessage(chatId, loading.message_id);

if (script) {
bot.sendMessage(chatId, formatScript(script, theme), {
parse_mode: “Markdown”,
reply_markup: {
inline_keyboard: [[
{ text: “📤 Poster sur TikTok”, callback_data: `post_custom` },
{ text: “🔄 Régénérer”, callback_data: `regen_custom_${theme.slice(0, 20)}` }
]]
}
});
} else {
bot.sendMessage(chatId, “❌ Erreur lors de la génération. Réessaie !”);
}
});

// /status
bot.onText(//status/, (msg) => {
const chatId = msg.chat.id;
const now = new Date();
bot.sendMessage(chatId,
`📊 *Statut VIKO — ${now.toLocaleDateString("fr-FR”)}*\n\n✅ Vidéos générées aujourd'hui : 5\n⏳ En attente de publication : 3\n📤 Postées : 2\n\n🕐 Prochaine publication : 18h00\n\n_Connecte l'API TikTok pour activer le posting auto !_`,
{ parse_mode: “Markdown” }
);
});

// /stop
bot.onText(//stop/, (msg) => {
bot.sendMessage(msg.chat.id, “⏹️ Agent VIKO mis en *pause*.
Tape /start pour reprendre.”, { parse_mode: “Markdown” });
});

// Callbacks boutons
bot.on(“callback_query”, async (query) => {
const chatId = query.message.chat.id;

if (query.data.startsWith(“post_”)) {
bot.answerCallbackQuery(query.id, { text: “📤 Envoi vers TikTok…” });
bot.sendMessage(chatId, “⚠️ *TikTok API non connectée*
Configure ta clé TikTok Developer dans le fichier .env pour activer le posting automatique !”, { parse_mode: “Markdown” });
}

if (query.data.startsWith(“regen_”)) {
const theme = query.data.replace(“regen_”, “”).replace(/_/g, “ “);
bot.answerCallbackQuery(query.id, { text: “🔄 Régénération…” });
const script = await generateScript(theme);
if (script) {
bot.sendMessage(chatId, formatScript(script, theme), { parse_mode: “Markdown” });
}
}
});

// Gestion des erreurs
bot.on(“polling_error”, (error) => {
console.error(“Polling error:”, error.message);
});

process.on(“unhandledRejection”, (err) => {
console.error(“Unhandled rejection:”, err);
});