require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/auth/callback', async (req, res) => {
  try {
    await saveYouTubeToken(req.query.code);
    res.send('✅ YouTube connecté ! Retourne sur Telegram.');
  } catch (err) {
    res.send('❌ Erreur: ' + err.message);
  }
});
app.listen(process.env.PORT || 3000);

console.log('🚀 VIKO V2 démarré');

// YouTube OAuth
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

async function saveYouTubeToken(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  process.env.YOUTUBE_TOKEN = JSON.stringify(tokens);
}

// Generate script
async function generateScript(theme) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-5',
      max_tokens: 800,
      messages: [{ role: 'user', content: `Expert YouTube Shorts[...]