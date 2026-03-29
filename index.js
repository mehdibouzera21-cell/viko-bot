require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(process.env.PORT || 3000);

console.log('🚀 VIKO démarré');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 VIKO en ligne !');
});

bot.on('polling_error', (err) => console.error(err.message));
