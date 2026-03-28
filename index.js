require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("🚀 VIKO Bot démarré — @VikoViral_Bot");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Bienvenue sur VIKO 🎬\n\nTape /generate pour créer des vidéos TikTok virales !");
});

bot.onText(/\/generate/, async (msg) => {
  bot.sendMessage(msg.chat.id, "⏳ Génération en cours...");
});