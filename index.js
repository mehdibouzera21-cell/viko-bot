// index.js

// This is the entry point for the Viko Bot

const startTime = new Date();
console.log(`Bot started at: ${startTime.toUTCString()}`);

function logCurrentTime() {
    const now = new Date();
    console.log(`Current Date and Time (UTC): ${now.toISOString().replace('T', ' ').substring(0, 19)}`);
}

setInterval(logCurrentTime, 60000); // Log the time every minute