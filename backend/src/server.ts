import express, { NextFunction, Request, Response } from "express";
import { quizzesRouter } from "./routes/quizzes";
import { AppErrorType } from "./utils/AppError";
import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./middlewares/logger";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/quizzes", quizzesRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello world from QuizzBuilder API!" });
});

// Error middleware
app.use(
  (err: AppErrorType, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
