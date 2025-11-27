# 🛍️ TechBazar - nextJS - Full Stack eCommerce Application

TechBazar is a robust eCommerce platform built with a decoupled architecture. It features a modern **Next.js 15** frontend communicating with a standalone **Express.js** backend. The project emphasizes polished UI/UX, secure authentication, and comprehensive product management.

## 🚀 Live Demo

- **Frontend (Vercel):** [তোমার Vercel লাইভ লিংক এখানে বসাও]
- **Backend API (Render):** [তোমার Render লাইভ লিংক এখানে বসাও]

---

## 📂 Project Architecture

The repository is divided into two distinct directories:

| Directory | Description | Tech Stack |
| :--- | :--- | :--- |
| **`/client`** | The frontend user interface and client-side logic. | Next.js (App Router), Tailwind CSS, Framer Motion, NextAuth.js |
| **`/server`** | The RESTful API and database management logic. | Express.js, MongoDB, Mongoose, CORS |

---

## 🛠️ Quick Start Guide

To run the full project locally, you need to set up both the client and server terminals.

### Prerequisites
- Node.js installed
- MongoDB Connection String (Atlas)

### Step 1: Setup Backend
Open a terminal and navigate to the server directory:
```bash
cd server
npm install
# Create a .env file (See server/README.md)
node index.js
```
*Server will start on http://localhost:5000*

### Step 2: Setup Frontend
Open a **new terminal** and navigate to the client directory:
```bash
cd client
npm install
# Create a .env.local file (See client/README.md)
npm run dev
```
*Client will start on http://localhost:3000*

---

## ✨ Key Features
- **Authentication:** Secure Google & Credentials login (NextAuth.js).
- **Product Management:** Admin dashboard to Add, Edit, and Delete products.
- **Smart Cart:** Off-canvas shopping cart with persistent state.
- **Responsive Design:** Fully adaptive UI with mobile-friendly navigation.
- **Animations:** Smooth transitions using Framer Motion.

## 👨‍💻 Developer
Developed by **[Shahriar Kabir (Zafor)]**.
```
