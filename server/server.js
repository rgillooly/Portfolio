const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const { MONGO_URI, PORT } = process.env;
const app = express();

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  });

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL during development
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Apply correct CORS options
app.use(express.json());

// ✅ Serve frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// API routes
app.use("/api/submission", submissionRoutes);
app.use("/api/auth", userRoutes);

app.listen(PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${PORT || 5000}`);
});
