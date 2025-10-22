import { Container } from "@/components/Container";
import { Page } from "@/components/Page";
import { Quizz } from "@/types/quizz";
import { notFound } from "next/navigation";

interface QuizzDetailsProps {
  params: { id: string };
}

async function getQuizzDetails(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch quizz detail");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default async function QuizzDetails({ params }: QuizzDetailsProps) {
  const { id } = await params;

  const quizz: Quizz = await getQuizzDetails(Number(id));

  if (!quizz) {
    return notFound();
  }

  return (
    <Page className="mt-30">
      <Container className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium">{quizz.title}</h1>

        <div className="flex flex-col gap-6">
          {quizz.questions.map((question, index) => (
            <div
              key={question.id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900 shadow-sm"
            >
              <div className="mb-2">
                <h2 className="text-lg font-medium text-gray-100">
                  {index + 1}. {question.text}
                </h2>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                  Type: {question.type}
                </span>
              </div>

              {question.type === "INPUT" && (
                <input
                  type="text"
                  disabled
                  placeholder="User will type here"
                  className="w-full mt-2 px-3 py-2 border border-gray-600 rounded bg-gray-800 text-gray-400 placeholder-gray-500"
                />
              )}

              {question.type === "BOOLEAN" && (
                <div className="flex items-center gap-4 mt-2">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <input
                        type="radio"
                        disabled
                        name={`question-${question.id}`}
                        checked={option.isCorrect}
                        className="accent-green-500"
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              )}

              {question.type === "CHECKBOX" && (
                <div className="flex flex-col gap-2 mt-2">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <input
                        type="checkbox"
                        disabled
                        checked={option.isCorrect}
                        className="accent-green-500"
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              )}

              {question.type === "INPUT" && (
                <div className="mt-2 text-sm text-gray-400 italic">
                  Expected answer:{" "}
                  <span className="text-green-400">
                    {question.correctAnswer}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Page>
  );
}
