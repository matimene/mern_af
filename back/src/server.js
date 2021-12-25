import express from "express";
import cors from "cors";
import {
  connectDb,
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
} from "./config/index.js";
import { newsRouter, usersRouter, loginRouter } from "./controllers/index.js";
import path from "path";

// Initialize app and basic dependencies
const app = express();
app.use(cors()).use(express.json());

// Serving of static react files as SPA
const __dirname = path.resolve();
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// DB Connection
connectDb();

// Utility middlewares
app.use(requestLogger).use(tokenExtractor);

// Controllers
app.use("/api/users", usersRouter);
app.use("/api/news", userExtractor, newsRouter);
app.use("/api/login", loginRouter);

// Errore handling middlewares
app.use(unknownEndpoint).use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
