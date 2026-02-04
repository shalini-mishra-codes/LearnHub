import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";

const app = express();

// ✅ Middleware - PEHLE yeh (sirf 1 baar)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
}

// ✅ Routes - middleware ke BAAD
app.get("/", (req, res) => {
  res.json({ message: "Server is running!", status: "OK" });
});

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

// ✅ Server start - SABSE LAST mein
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});