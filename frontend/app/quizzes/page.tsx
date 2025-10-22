import { Container } from "@/components/Container";
import { Page } from "@/components/Page";
import { QuizzCard } from "@/components/QuizzCard";
import { Quizz } from "@/types/quizz";

async function getQuizzes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default async function QuezzesPage() {
  const quizzes: Quizz[] = await getQuizzes();

  return (
    <Page>
      <Container>
        <h1 className="text-center text-5xl font-semibold">All quizzes</h1>

        <div className="flex flex-col gap-8 mt-20">
          {quizzes.map((quiz) => (
            <QuizzCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </Container>
    </Page>
  );
}
