// Update to the /generate command in index.js to include visual generation after sending each script message

// Existing part of the /generate command...

  // Loop for each script
  for (let i = 0; i < themes.length; i++) {
    // Send script message
    await bot.sendMessage(chatId, formatScript(script, theme), ...);

    // New addition for image generation
    const imageUrl = await generateVisual(`TikTok thumbnail for: ${themes[i]}, vibrant colors, modern style`);
    if (imageUrl) {
      await bot.sendPhoto(chatId, imageUrl, { caption: "🎨 Visuel généré par IA" });
    }
}