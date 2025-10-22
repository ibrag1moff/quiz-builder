import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col gap-8 items-center justify-center text-center px-4">
      <h1 className="text-3xl sm:text-5xl">Welcome to Quiz Builder App!</h1>
      <Button href="/create" isLink>
        Create a Quizz
      </Button>
      <Button href="/quizzes" isLink>
        All Quizzes
      </Button>
    </div>
  );
}
