require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const path = require('path');

const { generateScript } = require('./ai/generateScript');
const { generateVoice } = require('./voice/generateVoice');
const { generateVideo } = require('./video/generateVideo');
const { uploadVideo, getAuthUrl, saveToken } = require('./upload/youtubeUpload');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

console.log('🚀 VIKO V2 démarré');

app.get('/auth/callback', async (req, res) => {
  try {
    await saveToken(req.query.code);
    res.send('✅ YouTube connecté ! Retourne sur Telegram.');
  } catch (err) {
    res.send('❌ Erreur: ' + err.message);
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(process.env.PORT || 3000);

function cleanup(...files) {
  files.forEach(f => { try { if (f && fs.existsSync(f)) fs.unlinkSync(f); } catch {} });
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Bienvenue sur *VIKO V2* 🎬\n\n/generate [thème] — Créer une vidéo YouTube\n/auth — Connecter YouTube\n/status — Statut', { parse_mode: 'Markdown' });
});

bot.onText(/\/auth/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔗 Connecte YouTube ici:\n\n${getAuthUrl()}`, { parse_mode: 'Markdown' });
});

bot.onText(/\/status/, (msg) => {
  const connected = fs.existsSync(path.join(__dirname, 'config/youtube_token.json'));
  bot.sendMessage(msg.chat.id, `📊 *Statut VIKO V2*\n\nYouTube: ${connected ? '✅ Connecté' : '❌ Tape /auth'}`, { parse_mode: 'Markdown' });
});

bot.onText(/\/generate(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const niche = match[1]?.trim() || 'vacances économies été';
  const ts = Date.now();
  let voicePath, videoPath;
  try {
    const m = await bot.sendMessage(chatId, '⏳ *1/4* Génération script...', { parse_mode: 'Markdown' });
    const script = await generateScript(niche);
    if (!script) throw new Error('Script non généré');
    await bot.editMessageText('⏳ *2/4* Génération voix...', { chat_id: chatId, message_id: m.message_id, parse_mode: 'Markdown' });
    voicePath = await generateVoice(script.script, `voice_${ts}.mp3`);
    await bot.editMessageText('⏳ *3/4* Création vidéo...', { chat_id: chatId, message_id: m.message_id, parse_mode: 'Markdown' });
    videoPath = await generateVideo({ voicePath, script, outputName: `video_${ts}.mp4` });
    await bot.editMessageText('⏳ *4/4* Upload YouTube...', { chat_id: chatId, message_id: m.message_id, parse_mode: 'Markdown' });
    const url = await uploadVideo({ videoPath, title: script.title, description: script.description, tags: script.tags });
    await bot.deleteMessage(chatId, m.message_id);
    bot.sendMessage(chatId, `🎉 *Vidéo uploadée !*\n\n📺 ${script.title}\n\n🔗 ${url}`, { parse_mode: 'Markdown' });
  } catch (err) {
    bot.sendMessage(chatId, `❌ Erreur: ${err.message}\n\nVérifie /auth`, { parse_mode: 'Markdown' });
  } finally {
    cleanup(voicePath, videoPath);
  }
});

bot.on('polling_error', (err) => console.error(err.message));