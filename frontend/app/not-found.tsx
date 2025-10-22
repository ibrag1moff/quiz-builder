import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center fixed inset-0">
      <h1 className="text-8xl lg:text-9xl font-bold tracking-[2px]">404</h1>
      <h2 className="text-4xl">PAGE NOT FOUND</h2>
      <Button href="/quizzes" isLink>
        Go to quizzes
      </Button>
    </div>
  );
}
