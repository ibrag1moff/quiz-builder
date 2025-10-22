import { Router } from "express";
import {
  createQuizz,
  deleteQuizz,
  getQuizzById,
  getAllQuizzes,
} from "../controllers/quizzes";

const router = Router();

router.get("/", getAllQuizzes);

router.get("/:id", getQuizzById);

router.post("/", createQuizz);

router.delete("/:id", deleteQuizz);

export { router as quizzesRouter };
