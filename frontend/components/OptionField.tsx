import { GrClose } from "react-icons/gr";
import { QuestionType } from "@/types/quizz";

interface OptionFieldProps {
  text: string;
  isCorrect: boolean;
  type: QuestionType;
  onTextChange: (text: string) => void;
  onToggleCorrect: () => void;
  onRemove: () => void;
}

export function OptionField({
  text,
  isCorrect,
  type,
  onTextChange,
  onToggleCorrect,
  onRemove,
}: OptionFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2"
        placeholder="Option text"
      />
      <input
        type={type === "BOOLEAN" ? "radio" : "checkbox"}
        checked={isCorrect}
        onChange={onToggleCorrect}
        className="accent-green-500"
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-red-400 hover:text-red-500"
      >
        <GrClose />
      </button>
    </div>
  );
}
