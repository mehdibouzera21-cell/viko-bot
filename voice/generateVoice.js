const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const TEMP_DIR = path.join(__dirname, '../temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

async function generateVoice(text, filename = 'voice.mp3') {
  const outputPath = path.join(TEMP_DIR, filename);
  execSync(`ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 30 -q:a 9 -acodec libmp3lame "${outputPath}" -y`);
  return outputPath;
}

module.exports = { generateVoice };
