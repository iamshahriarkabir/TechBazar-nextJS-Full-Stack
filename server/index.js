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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    // await client.connect();

    const db = client.db("techbazar");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products");

    // ================= API ROUTES (Defined Inside Run) ================= //

    // --- AUTH ROUTES ---

    // Register API
    app.post("/api/register", async (req, res) => {
      try {
        const { name, email, password, image } = req.body;

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
          name,
          email,
          password: hashedPassword,
          image: image || "",
          provider: "credentials",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User registered", userId: result.insertedId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Login API
    app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

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
        const products = await productsCollection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    });

    // 2. Get Single Product
    app.get("/api/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ID format" });
        }
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    });

    // 3. Add Product
    app.post("/api/products", async (req, res) => {
      try {
        const newProduct = {
          ...req.body,
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
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

        const { _id, ...updateData } = req.body;
        const updateDoc = {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          },
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
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

        await productsCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: "Product deleted" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 6. Seed Data (Full Data included)
    app.get("/api/seed", async (req, res) => {
      try {
        const dummyData = [
          {
            title: "iPhone 15 Pro",
            price: 999,
            category: "Phone",
            description: "Titanium design with A17 Pro chip.",
            image: "https://placehold.co/600x400",
            inStock: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "MacBook Air M2",
            price: 1199,
            category: "Laptop",
            description: "Supercharged by M2, incredibly thin and light.",
            image: "https://placehold.co/600x400",
            inStock: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Sony WH-1000XM5",
            price: 299,
            category: "Audio",
            description: "Industry leading noise canceling headphones.",
            image: "https://placehold.co/600x400",
            inStock: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Samsung Galaxy S24 Ultra",
            price: 1299,
            category: "Phone",
            description: "Galaxy AI is here. Epic titanium design.",
            image: "https://placehold.co/600x400",
            inStock: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Dell XPS 13",
            price: 999,
            category: "Laptop",
            description: "Iconic design and powerful performance.",
            image: "https://placehold.co/600x400",
            inStock: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        await productsCollection.deleteMany({});
        await productsCollection.insertMany(dummyData);
        res.json({ message: "Database seeded successfully with initial products!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// Root Route (Handles the base URL /)
app.get("/", (req, res) => {
  res.send("TechBazar Server is Running");
});

app.listen(port, () => {
  console.log(`TechBazar Server is running on port ${port}`);
});