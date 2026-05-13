import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const books = [
  {
    name: "Atomic Habits",
    title: "Tiny changes, remarkable results. Build good habits and break bad ones.",
    price: 18,
    category: "Free",
    image: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
  },
  {
    name: "The Lean Startup",
    title: "How today's entrepreneurs use continuous innovation to create success.",
    price: 22,
    category: "Free",
    image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
  },
  {
    name: "Deep Work",
    title: "Rules for focused success in a distracted world by Cal Newport.",
    price: 20,
    category: "Free",
    image: "https://covers.openlibrary.org/b/id/8739164-L.jpg",
  },
  {
    name: "Think and Grow Rich",
    title: "The landmark bestseller now revised and updated for the 21st century.",
    price: 15,
    category: "Free",
    image: "https://covers.openlibrary.org/b/id/8739168-L.jpg",
  },
  {
    name: "The Psychology of Money",
    title: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
    price: 19,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/12842058-L.jpg",
  },
  {
    name: "Rich Dad Poor Dad",
    title: "What the rich teach their kids about money that the poor don't.",
    price: 14,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/8739162-L.jpg",
  },
  {
    name: "Zero to One",
    title: "Notes on startups, or how to build the future. By Peter Thiel.",
    price: 25,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/8739163-L.jpg",
  },
  {
    name: "The 4-Hour Work Week",
    title: "Escape the 9-5, live anywhere and join the new rich. Tim Ferriss.",
    price: 17,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/8739165-L.jpg",
  },
  {
    name: "Sapiens",
    title: "A brief history of humankind. From the Stone Age to the present.",
    price: 23,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/8739166-L.jpg",
  },
  {
    name: "Good to Great",
    title: "Why some companies make the leap and others don't. Jim Collins.",
    price: 21,
    category: "Paid",
    image: "https://covers.openlibrary.org/b/id/8739167-L.jpg",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MongoDBURI, {
      tlsAllowInvalidCertificates: true,
    });
    console.log("✅ Connected to MongoDB");

    await Book.deleteMany({});
    console.log("🗑️  Cleared existing books");

    const inserted = await Book.insertMany(books);
    console.log(`📚 Inserted ${inserted.length} books successfully!`);

    inserted.forEach((b, i) =>
      console.log(`  ${i + 1}. ${b.name} [${b.category}] - $${b.price}`)
    );
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
