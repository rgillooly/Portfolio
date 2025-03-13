require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");

const { MONGO_URL, PORT } = process.env;

const app = express();

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials (like cookies) if needed
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions)); // Apply the correct CORS options
app.use(express.json());

app.use(express.static("client"));

app.use("/api/submission", submissionRoutes);

app.use("/api/auth", userRoutes);

// User fetch route (Example)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Return the users as JSON
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
