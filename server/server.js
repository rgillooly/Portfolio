require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Add this
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User"); // ✅ Add this

const { MONGO_URL, PORT = 5000 } = process.env; // ✅ Set default PORT

const app = express();

// ✅ Correct CORS placement
const corsOptions = {
  origin: "http://localhost:5173", // Change this for production
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// ✅ Define API routes
app.use("/api/submission", submissionRoutes);
app.use("/api/auth", userRoutes);

// ✅ Fix missing User model
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

// ✅ Start the server correctly
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
