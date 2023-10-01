const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");
//const path = require("path");

//initialize app
const app = express();

//environment variables
dotenv.config();

// middlewares

//for local dev
//app.use(cors());

//for production
app.use(
  cors({
    origin: ["https://shopsy-store.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

//routes
//app.get("/", (req, res) => {
//  res.json("Hello");
//});

app.use("/api/payment", paymentRoutes);

//For local dev
// static files (build of your frontend)
//app.use(express.static(path.join(__dirname, "../frontend", "dist")));

//app.get("/*", (req, res) => {
//  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//});

//start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
