import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL || "*"
    ],
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Async MongoDB connection with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(URI, {
                tlsAllowInvalidCertificates: true,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            console.log("✅ Connected to MongoDB");
            return;
        } catch (error) {
            console.log(`❌ MongoDB connection attempt ${i + 1}/${retries} failed: ${error.message}`);
            if (i < retries - 1) {
                console.log(`⏳ Retrying in ${delay / 1000}s... (Atlas may be waking up)`);
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
    console.log("⚠️  Could not connect to MongoDB after all retries. Server will still run.");
};

// Handle mongoose connection errors gracefully (prevents crash)
mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error (will retry automatically):", err.message);
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting to reconnect...");
});
mongoose.connection.on("reconnected", () => {
    console.log("✅ MongoDB reconnected!");
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);

// Health check endpoint
app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({ status: "ok", database: dbStatus });
});

// Start server then connect to DB
const startServer = async () => {
    if (process.env.NODE_ENV !== "production") {
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on port ${PORT}`);
        });
    }
    await connectDB();
};

startServer();

export default app;
