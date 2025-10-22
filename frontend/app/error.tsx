"use client";

import { Button } from "@/components/Button";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="fixed inset-0 bg-black/20 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-4xl font-semibold">{error.message}</h1>
      <Button onClick={reset}>Try again!</Button>
    </div>
  );
}
