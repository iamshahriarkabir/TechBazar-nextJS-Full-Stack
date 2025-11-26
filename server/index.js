const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); 
app.use(express.json()); 

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected (Express)"))
  .catch((err) => console.log("❌ DB Error:", err));

// ================= SCHEMAS & MODELS ================= //

// 1. User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, 
    image: { type: String },
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// 2. Product Schema
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },

    inStock: { type: Boolean, default: true },
  },

  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

// ================= API ROUTES ================= //

// --- AUTH ROUTES ---

// Register API
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image || "",
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Verification API 
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password match
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid password" });

    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PRODUCT ROUTES ---

// 1. Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. Get Single Product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 3. Add Product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update Product
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Seed Data 
app.get("/api/seed", async (req, res) => {
  try {
    const dummyData = [
      {
        title: "iPhone 15 Pro",
        price: 999,
        category: "Phone",
        description: "Titanium",
        image: "https://placehold.co/600x400",
      },
      {
        title: "MacBook Air",
        price: 1199,
        category: "Laptop",
        description: "M2 Chip",
        image: "https://placehold.co/600x400",
      },
      {
        title: "Sony Headphones",
        price: 299,
        category: "Audio",
        description: "Noise cancelling",
        image: "https://placehold.co/600x400",
      },
      {
        title: "Samsung S24",
        price: 899,
        category: "Phone",
        description: "AI Phone",
        image: "https://placehold.co/600x400",
      },
    ];
    await Product.deleteMany({});
    await Product.insertMany(dummyData);
    res.json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on port ${PORT}`);
});
