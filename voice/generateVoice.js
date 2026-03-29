const gTTS = require('gtts');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../temp');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateVoice(text, filename = 'voice.mp3') {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(OUTPUT_DIR, filename);
    const gtts = new gTTS(text, 'fr');
    gtts.save(outputPath, (err) => {
      if (err) return reject(err);
      console.log(`✅ Voix générée: ${outputPath}`);
      resolve(outputPath);
    });
  });
}

module.exports = { generateVoice };