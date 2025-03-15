const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const { MONGODB_URI, PORT } = process.env;
const app = express();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  });

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://rgillooly-portfolio-b3a90409f6d8.herokuapp.com/"
      : "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Apply correct CORS options
app.use(express.json());

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// API routes
app.use("/api/submission", submissionRoutes);
app.use("/api/auth", userRoutes);

app.listen(PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${PORT || 5000}`);
});
