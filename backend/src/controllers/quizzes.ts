import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { prisma } from "../config/prisma";
import { CreateQuizInput, createQuizSchema } from "../validations/quizSchema";

export const getAllQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return res.status(200).json(quizzes);
  } catch (e) {
    console.log(e);
    return next(new AppError("Internal Error", 500));
  }
};

export const getQuizzById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return next(new AppError("Invalid quiz ID", 400));
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return next(new AppError("Quiz not found", 404));
    }

    return res.status(200).json(quiz);
  } catch (e) {
    console.log(e);
    return next(new AppError("Internal Error", 500));
  }
};

export const createQuizz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createQuizSchema.safeParse(req.body);

  if (!result.success) {
    console.log(result.error.flatten());
    return next(new AppError("Validation failed", 400));
  }

  const quizData: CreateQuizInput = result.data;
  try {
    const createdQuiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        questions: {
          create: quizData.questions.map((question) => ({
            text: question.text,
            type: question.type,
            correctAnswer: question.correctAnswer,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect ?? false,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(201).json(createdQuiz);
  } catch (e) {
    console.log(e);
    return next(new AppError("Internal Error", 500));
  }
};

export const deleteQuizz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return next(new AppError("Invalid quiz ID", 400));
  }

  try {
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
    });

    if (!existingQuiz) {
      return next(new AppError("Quiz not found", 404));
    }

    await prisma.quiz.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (e) {
    console.log(e);
    return next(new AppError("Internal Error", 500));
  }
};
