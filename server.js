// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import fs from "fs";
import csvParser from "csv-parser";
import multer from "multer";

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aamrcye.mongodb.net/InvestiSmart`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
    console.log("MongoDB Atlas connected");
}).catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    csvFilePath: String
}, { versionKey: false });
const User = mongoose.model("logindatas", userSchema);


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// signup route
app.post("/signup", async (req, res) => {
  try {
    const { username, password, csvFilePath } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password, csvFilePath });
    await newUser.save();

    // Return the saved user object
    res.json({ user: newUser }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//LOGIN SECTION

import jwt from 'jsonwebtoken';

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid username or password" });

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});


app.listen(5000, () => console.log("Backend running at http://localhost:5000"));


//Token auth
function AuthenticateToken (req,res,next){
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}




//UPLOAD SECTION

const upload = multer({ dest: "uploads/" });

const portfolioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  holdings: [
    {
      code: String,
      stock: String,
      units: Number,
      pricePence: Number,
      value: Number,
      cost: Number,
      gainLoss: Number,
      gainLossPercent: Number,
    },
  ],
}, { timestamps: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

const headers = [
  "Code",
  "Stock",
  "Units held",
  "Price (pence)",
  "Value (£)",
  "Cost (£)",
  "Gain/loss (£)",
  "Gain/loss (%)"
];

app.post("/upload-csv", AuthenticateToken, upload.single("file"), async (req, res) => {
  try {
    const username = req.user.username;

    const allRows = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser({ headers, skipEmptyLines: true }))
      .on("data", (row) => {
        allRows.push(row);
      })
      .on("end", async () => {
        fs.unlinkSync(req.file.path);

        // Remove top 11 rows and bottom 4 rows
        console.log(allRows.length);
        const holdingsRows = allRows.slice(11, allRows.length - 4);

        const cleanNumber = (str) => Number(str.replace(/,/g, "")) || 0;

        const holdings = holdingsRows.map(row => ({
          code: row["Code"]?.trim() || "",
          stock: row["Stock"]?.trim() || "",
          units: cleanNumber(row["Units held"]),
          pricePence: cleanNumber(row["Price (pence)"]),
          value: cleanNumber(row["Value (£)"]),
          cost: cleanNumber(row["Cost (£)"]),
          gainLoss: cleanNumber(row["Gain/loss (£)"]),
          gainLossPercent: cleanNumber(row["Gain/loss (%)"]),
        }));

        // Save to MongoDB
        await Portfolio.findOneAndUpdate(
          { username },
          { holdings },
          { upsert: true }
        );

        res.json({ message: "CSV uploaded and processed", holdings });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process CSV" });
  }
});