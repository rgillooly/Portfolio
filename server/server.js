require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { PORT } = process.env;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials (like cookies) if needed
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions)); // Apply the correct CORS options

app.get("/");

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });