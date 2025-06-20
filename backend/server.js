const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process"); // Import child_process module
const path = require("path");
const morgan = require("morgan"); // Import morgan
const User = require("./models/User");
const sequelize = require("./db");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json()); // Use express's built-in JSON parser

// Serve static files if needed (e.g., frontend build files)
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(morgan("dev")); // Use morgan to log HTTP requests (in 'dev' format)

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });

// Route for user registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  console.log(`Received registration request for email: ${email}`);

  // Check if email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    console.log(`Email ${email} is already registered.`);
    return res.status(400).json({ message: "Email is already registered" });
  }

  // Create new user
  try {
    const newUser = await User.create({ email, password });
    console.log(`User registered successfully: ${newUser.email}`);
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    return res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(`Received login request for email: ${email}`);

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.log(`User not found: ${email}`);
    return res.status(400).json({ message: "User not found" });
  }

  // Simple password check (In real apps, use hashed passwords)
  if (user.password === password) {
    console.log(`Login successful for user: ${email}`);
    return res.status(200).json({ message: "Login successful" });
  } else {
    console.log(`Incorrect password for user: ${email}`);
    return res.status(400).json({ message: "Incorrect password" });
  }
});

// Route for classifying a toxic comment
app.post("/predict", (req, res) => {
  const { comment } = req.body;

  console.log(`Received prediction request for comment: "${comment}"`);

  if (!comment || typeof comment !== "string") {
    console.log("Invalid comment input.");
    return res
      .status(400)
      .json({ error: "Comment is required and must be a string" });
  }

  // Run the Python script as a child process
  const pythonProcess = spawn("python", [
    path.join(__dirname, "predict.py"),
    comment,
  ]);

  // Collect the output from the Python process
  pythonProcess.stdout.on("data", (data) => {
    const predictions = data.toString().split(",").map(Number); // Convert output into an array of numbers

    console.log("Received predictions from Python script:", predictions);

    // Labels corresponding to the model output
    const labels = [
      "toxic",
      "severe_toxic",
      "obscene",
      "threat",
      "insult",
      "identity_hate",
    ];

    // Map predictions to their labels
    const predictionResults = labels.reduce((acc, label, idx) => {
      acc[label] = predictions[idx] === 1 ? "Toxic" : "Not Toxic";
      return acc;
    }, {});

    console.log("Prediction results:", predictionResults);

    // Send the result as a JSON response
    res.json(predictionResults);
  });

  // Handle errors in the Python process
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python script finished with code ${code}`);
      res.status(500).json({ error: "Error in prediction" });
    } else {
      console.log("Python script executed successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
