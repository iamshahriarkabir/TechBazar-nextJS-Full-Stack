const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("techbazar");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products");

    // ================= API ROUTES ================= //

    // --- AUTH ROUTES ---
    app.post("/api/register", async (req, res) => {
      try {
        const { name, email, password, image } = req.body;
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name, email, password: hashedPassword, image: image || "",
          provider: "credentials", createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User registered", userId: result.insertedId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: "Invalid password" });

        res.json({ id: user._id, name: user.name, email: user.email, image: user.image });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // --- PRODUCT ROUTES ---

    // 1. Get All Products
    app.get("/api/products", async (req, res) => {
      try {
        const products = await productsCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    });

    // 2. Get Single Product
    app.get("/api/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    });

    // 3. Add Product (Owner Email Save করা হবে)
    app.post("/api/products", async (req, res) => {
      try {
        const { userEmail, ...productData } = req.body; 

        if (!userEmail) {
          return res.status(400).json({ message: "User email is required to add product" });
        }

        const newProduct = {
          ...productData,
          userEmail, 
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await productsCollection.insertOne(newProduct);
        res.status(201).json({ ...newProduct, _id: result.insertedId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 4. Update Product 
    app.put("/api/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        // currentUserEmail 
        const { currentUserEmail, _id, ...updateData } = req.body; 

        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

        
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).json({ message: "Product not found" });

        
        if (product.userEmail && product.userEmail !== currentUserEmail) {
          return res.status(403).json({ message: "Forbidden: You are not the owner of this product!" });
        }

        const updateDoc = {
          $set: { ...updateData, updatedAt: new Date() },
        };

        const result = await productsCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          updateDoc,
          { returnDocument: "after" }
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 5. Delete Product 
    app.delete("/api/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        
        const currentUserEmail = req.query.email; 

        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).json({ message: "Not found" });

        
        if (product.userEmail && product.userEmail !== currentUserEmail) {
          return res.status(403).json({ message: "Forbidden: Only owner can delete this!" });
        }

        await productsCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: "Product deleted" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 6. Seed Data (Updated with userEmail)
    app.get("/api/seed", async (req, res) => {
      try {
        // dummy 'admin@techbazar.com' 
        const dummyData = [
          { title: "iPhone 15 Pro", price: 999, category: "Phone", description: "Titanium design.", image: "https://placehold.co/600x400", userEmail: "admin@techbazar.com", inStock: true, createdAt: new Date() },
          { title: "MacBook Air M2", price: 1199, category: "Laptop", description: "Supercharged.", image: "https://placehold.co/600x400", userEmail: "admin@techbazar.com", inStock: true, createdAt: new Date() },
          // ... Data
        ];

        await productsCollection.deleteMany({});
        await productsCollection.insertMany(dummyData);
        res.json({ message: "Database seeded successfully!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => { res.send("TechBazar Server Running"); });
app.listen(port, () => { console.log(`TechBazar Server is running on port ${port}`); });