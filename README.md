# VREC Campus Portal (Prototype)

A prototype campus website for Vijay Rural Engineering College (VREC), Nizamabad. It's a single-page React app with sections for departments, admissions, placements, campus life and a notice board. It also has an AI counselor chatbot that runs on Google Gemini through a small Express backend.

> **Demo content notice:** this is an unofficial prototype and is not affiliated with or endorsed by the college. Staff are shown by role only, and all phone numbers and email addresses (for example `+91 00000 00000`, `hod.cse@example.edu`) are placeholders. Placement charts and testimonials use illustrative sample data, and notices are examples. None of it should be treated as official information.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Departments**: engineering departments with intake, labs, curriculum highlights and a placeholder department contact.
- **Admissions**: eligibility, counselling and fee information, plus an enquiry form. Submissions are saved to the browser's `localStorage`.
- **Placements**: placement preparation overview, career paths by sector, and a chart and testimonials built on sample data.
- **Campus life**: facilities and student activities.
- **Notice board**: notices you can search and filter by category, and add or delete. Notices are stored in `localStorage`.
- **AI counselor**: a chat assistant served from `/api/chat`. It uses Gemini with a system prompt about the college. Without a `GEMINI_API_KEY`, it falls back to built-in keyword-based demo replies.
- A responsive header with mobile navigation.

## Tech stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide icons
- **Backend**: Node.js, Express 4, `@google/genai`
- **Build**: Vite for the client, esbuild bundles the server into `dist/server.cjs`

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- (Optional) a Google Gemini API key for live chatbot answers

### Setup

```bash
npm install
cp .env.example .env    # then set GEMINI_API_KEY
npm run dev
```

The dev server (Express with Vite middleware) runs at http://localhost:3000.

### Environment variables

| Variable         | Required | Description                                                       |
|------------------|----------|-------------------------------------------------------------------|
| `GEMINI_API_KEY` | No       | Enables Gemini responses in the AI counselor. Without it, demo replies are used. |
| `APP_URL`        | No       | Public URL of the deployed app (used by AI Studio hosting).       |

### Production build

```bash
npm run build
NODE_ENV=production npm start   # node dist/server.cjs
```

## Project structure

```
server.ts              Express server, /api/chat endpoint, Vite middleware / static hosting
src/App.tsx            Page layout and section routing
src/components/        Header, Departments, Admissions, Placements, CampusLife,
                       NoticeBoard, Chatbot
src/types.ts           Shared types
```
