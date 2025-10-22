"use client";

import { useState, FormEvent } from "react";
import { Question, QuestionForm } from "./QuestionForm";
import { Button } from "./Button";
import { notifySuccess, notifyError } from "@/utils/notifications";

interface QuizState {
  title: string;
  questions: Question[];
}

export function CreateQuizForm() {
  const [quiz, setQuiz] = useState<QuizState>({
    title: "",
    questions: [
      {
        text: "",
        type: "INPUT",
        correctAnswer: "",
        options: [],
      },
    ],
  });

  const handleQuestionChange = (index: number, question: Question) => {
    const updated = [...quiz.questions];
    updated[index] = question;
    setQuiz({ ...quiz, questions: updated });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          text: "",
          type: "INPUT",
          correctAnswer: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });

      if (!res.ok) throw new Error("Failed to create quiz");

      notifySuccess("Quiz created!");
    } catch (err) {
      notifyError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-white">
      <div>
        <label className="block text-sm mb-1">Quiz Title</label>
        <input
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
          placeholder="Enter quiz title"
        />
      </div>

      {quiz.questions.map((question, index) => (
        <QuestionForm
          key={index}
          index={index}
          question={question}
          onChange={(q) => handleQuestionChange(index, q)}
          onRemove={() => removeQuestion(index)}
        />
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="text-sm bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        + Add Question
      </button>

      <Button>Save Quiz</Button>
    </form>
  );
}
