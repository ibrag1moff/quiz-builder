"use client";
import { Quizz } from "@/types/quizz";
import { notifySuccess } from "@/utils/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";

interface QuizzCardProps {
  quiz: Quizz;
}

async function deleteQuizz(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch quizz detail");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export const QuizzCard = ({ quiz }: QuizzCardProps) => {
  const router = useRouter();

  async function handleDelete(id: number) {
    const data = await deleteQuizz(id);
    router.refresh();
    notifySuccess(data.message || "Deleted successfully!");
  }

  return (
    <div className="flex items-center justify-between rounded-lg p-4 border border-gray-700 bg-gray-900 shadow-sm">
      <Link className="xl:hover:text-gray-500" href={`/quizzes/${quiz.id}`}>
        {quiz.title}
      </Link>
      <button onClick={() => handleDelete(quiz.id)} className="cursor-pointer">
        <GrClose size={20} />
      </button>
    </div>
  );
};
