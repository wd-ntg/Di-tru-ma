import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

// router
import initRouter from "./routes/index.js";

const app = express();

app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'models' directory
app.use('/models', express.static(path.join(__dirname, 'models')));

// CORS configuration
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let port = process.env.PORT || 5000;


app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
})

// Initialize routes
initRouter(app);
