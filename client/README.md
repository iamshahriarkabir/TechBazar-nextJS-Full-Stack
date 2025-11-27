# 🎨 TechBazar - Frontend (Client)

This directory contains the frontend application for TechBazar, built with **Next.js 15 (App Router)**. It handles the user interface, authentication, and communicates with the Express backend API.

## 🛠️ Technologies
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Auth:** NextAuth.js
- **State Management:** React Context API

## ⚙️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in this directory and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api  # Or your deployed Render URL
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 📂 Folder Structure
- `src/app`: Main application pages and routes.
- `src/components`: Reusable UI components (Navbar, Hero, Cards).
- `src/context`: Global state (CartContext).
- `src/lib`: Helper functions.

## 🚀 Key UI Features
- **Glassmorphism Hero Section:** Modern visual appeal.
- **Off-canvas Cart:** Smooth slide-in cart drawer.
- **Admin Dashboard:** Protected route for product management with Modal forms.