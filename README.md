# 🎬 VIKO — AI-Powered Viral Video Script Generator

> **Turn your ideas into viral short-form video scripts in seconds.**

VIKO is a production-ready AI Telegram bot built with Node.js that generates high-converting viral video scripts for TikTok, Instagram Reels, and YouTube Shorts — powered by Claude via OpenRouter. Designed for creators, agencies, and entrepreneurs who want to automate content creation and scale viral video production.

---

## 📸 Demo

> **Coming soon** — A live demo GIF will be added here showcasing VIKO in action inside Telegram.

---

## ✨ Features

- 🤖 **AI-Generated Viral Scripts** — Hooks, storytelling arcs, and CTAs crafted by Claude
- 🎯 **Multi-Platform Optimization** — Scripts tailored for TikTok, Instagram Reels, and YouTube Shorts
- 🔁 **Exponential Backoff Retry System** — Gracefully handles API rate limits and transient failures
- 🚦 **Per-User Rate Limiting / Anti-Spam** — Prevents abuse and ensures fair usage
- 🛡️ **Environment Variable Validation** — Safe startup with clear error messages for missing config
- ⚡ **Robust Error Handling** — Try/catch wrappers with API failure recovery
- 🏗️ **Production-Ready Architecture** — Clean, modular code ready for scale
- ☁️ **Railway Deployment** — One-click cloud deployment with zero infrastructure hassle

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **node-telegram-bot-api** | Telegram bot integration |
| **OpenRouter API (Claude)** | AI script generation |
| **dotenv** | Environment variable management |
| **Railway** | Cloud deployment platform |

---

## 🚀 Installation

### Prerequisites

- Node.js v18+
- A [Telegram Bot Token](https://core.telegram.org/bots#how-do-i-create-a-bot) from [@BotFather](https://t.me/BotFather)
- An [OpenRouter API Key](https://openrouter.ai/)

### 1. Clone the repository

```bash
git clone https://github.com/mehdibouzera21-cell/viko-bot.git
cd viko-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials (see [Environment Variables](#-environment-variables) below).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Telegram Bot Token from @BotFather
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# OpenRouter API Key
OPENROUTER_API_KEY=your_openrouter_api_key_here

# (Optional) OpenRouter model to use — defaults to Claude
OPENROUTER_MODEL=anthropic/claude-3-haiku
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## ▶️ Usage

### Start the bot

```bash
npm start
```

Once running, open Telegram, find your bot, and send it a message with your video idea. VIKO will respond with a complete viral video script including a hook, story arc, and call-to-action.

**Example interaction:**

```
You:   Give me a script about 5 productivity hacks for students

VIKO:  🎬 Hook: "Your phone is destroying your GPA — here's how to take it back."
       📖 Story: ...
       📢 CTA:  "Follow for more tips that actually work."
```

---

## 📁 Project Structure

```
viko-bot/
├── index.js          # Entry point — bot initialization and message handling
├── .env              # Environment variables (not committed)
├── .env.example      # Example environment variables template
├── package.json      # Project metadata and dependencies
└── README.md         # Project documentation
```

---

## ☁️ Deployment (Railway)

VIKO is optimized for deployment on [Railway](https://railway.app).

### Steps

1. Push your code to a GitHub repository.
2. Go to [railway.app](https://railway.app) and create a **New Project**.
3. Select **Deploy from GitHub repo** and connect your repository.
4. Navigate to **Variables** and add your environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` *(optional)*
5. Railway will automatically detect your `package.json` and run `npm start`.

> 💡 Railway provides a free tier suitable for hobby projects. For production use, upgrade to a paid plan for higher uptime guarantees.

---

## 🗺️ Roadmap

- [ ] 🎥 **TikTok Automation** — Direct posting of generated scripts via TikTok API
- [ ] 📊 **Analytics Dashboard** — Track script performance and engagement metrics
- [ ] 💼 **SaaS Platform** — Multi-tenant web app with user accounts and billing
- [ ] 💳 **Monetization** — Subscription tiers (free, pro, agency) with usage quotas
- [ ] 🌍 **Multi-Language Support** — Generate scripts in multiple languages
- [ ] 🔗 **Integrations** — Connect with Notion, Google Sheets, and scheduling tools

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 VIKO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  Built with ❤️ by the VIKO team · <a href="https://t.me/your_bot">Try VIKO on Telegram</a>
</div>
