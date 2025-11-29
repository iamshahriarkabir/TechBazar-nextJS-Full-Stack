# ⚙️ TechBazar - Backend (Server)

This directory contains the backend REST API for TechBazar, built with **Express.js** and **MongoDB**. It handles data persistence, product operations, and serves data to the frontend.

## 🛠️ Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Middleware:** CORS, Dotenv

## ⚙️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in this directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Run Server:**
   ```bash
   node index.js
   # OR for development with nodemon
   npm run dev
   ```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch all products (Sorted by latest). |
| `GET` | `/api/products/:id` | Fetch a single product details. |
| `POST` | `/api/products` | Add a new product. |
| `PUT` | `/api/products/:id` | Update an existing product. |
| `DELETE` | `/api/products/:id` | Delete a product. |

## 📦 Database Schema (Product)
- `title`: String (Required)
- `price`: Number (Required)
- `category`: String (Required)
- `description`: String (Required)
- `image`: String (URL)
- `timestamps`: CreatedAt / UpdatedAt

