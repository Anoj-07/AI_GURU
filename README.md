# 🧠 AI Guru - AI-Powered E-Learning Platform

**AI Guru** is a cutting-edge e-learning platform that leverages artificial intelligence to generate personalized study materials. Users can instantly create custom courses, flashcards, quizzes, and Q&A sessions on any topic. Built with **Next.js** and integrated with **Google Generative AI**, AI Guru transforms the learning experience into an engaging, interactive, and efficient journey.

🎥 [WEBSITE_LINK]([https://ai-guru-xi.vercel.app/])

---

## 🚀 Features

### 📘 Course Generation
- Create personalized courses on any topic.
- Select difficulty level: **Beginner**, **Intermediate**, or **Advanced**.
- AI-generated course outlines with chapters and summaries.

### 📚 Study Materials
- Auto-generated **flashcards** for quick memorization.
- Interactive **quizzes** to test comprehension.
- Rich **chapter notes** in markdown format.
- AI-powered **Q&A sessions** for deeper understanding.

### 🎨 Intuitive Interface
- Clean, modern, and responsive UI.
- Course **progress tracking** and centralized dashboard.
- **Dark/Light theme** toggle.

### 🔒 Secure Authentication
- User login/sign-up via **Clerk**.
- Protected routes for user-specific content.
- Secure connection to **Neon PostgreSQL**.

---

## 🧰 Tech Stack

### Frontend
- **Next.js 15** – React-based framework for SSR.
- **Tailwind CSS** – Utility-first styling.
- **Shadcn UI** – Beautifully crafted UI components.
- **Clerk** – User authentication and session management.

### Backend
- **Drizzle ORM** – TypeScript ORM for PostgreSQL.
- **Neon** – Serverless PostgreSQL database.
- **Inngest** – Background job scheduling and processing.
- **Google Generative AI** – AI-based content generation.

---

## 🤖 AI-Powered Capabilities

- Course outline generation
- Flashcard creation
- Quiz generation
- Q&A generation
- Chapter notes creation

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (Neon recommended)
- Google Generative AI API key

---

## 🛠️ Installation

```bash
git clone https://github.com/anoj-07/ai_guru.git
cd ai_guru
npm install
```
## Create .env File
```
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=your_postgres_connection_string
NEXT_PUBLIC_GEMINI_API_KEY=your_google_genai_api_key
```

## Start Development Server
```
npm run dev
```

## 🧱 Configuration
Database Setup
 - Create a Neon PostgreSQL instance.
  - Run Drizzle migrations:
```
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

## AI Configuration
 Modify AI models and prompt templates in configs/AiModel.js.

## 🙏 Acknowledgements

  - Google Generative AI – For powerful content generation.

   - Vercel – For seamless deployment.

   - Clerk – For authentication integration.

   - Shadcn UI – For beautiful UI components.

## Transform your learning experience with AI Guru — where knowledge meets intelligence. 🚀
