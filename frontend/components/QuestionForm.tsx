import { QuestionType } from "@/types/quizz";
import { OptionField } from "./OptionField";
import { GrClose } from "react-icons/gr";

interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  type: QuestionType;
  correctAnswer: string;
  options: Option[];
}

interface QuestionFormProps {
  index: number;
  question: Question;
  onChange: (question: Question) => void;
  onRemove: () => void;
}

export function QuestionForm({
  index,
  question,
  onChange,
  onRemove,
}: QuestionFormProps) {
  const handleOptionChange = (optIndex: number, field: Partial<Option>) => {
    const updatedOptions = question.options.map((opt, i) =>
      i === optIndex ? { ...opt, ...field } : opt
    );
    onChange({ ...question, options: updatedOptions });
  };

  const addOption = () => {
    onChange({
      ...question,
      options: [...question.options, { text: "", isCorrect: false }],
    });
  };

  const removeOption = (optIndex: number) => {
    const updated = question.options.filter((_, i) => i !== optIndex);
    onChange({ ...question, options: updated });
  };

  const toggleCorrect = (index: number) => {
    const updatedOptions = question.options.map((opt, i) => ({
      ...opt,
      isCorrect:
        question.type === "CHECKBOX"
          ? i === index
            ? !opt.isCorrect
            : opt.isCorrect
          : i === index,
    }));

    const correctAnswer =
      question.type === "INPUT" || question.type === "BOOLEAN"
        ? updatedOptions.find((opt) => opt.isCorrect)?.text ?? ""
        : question.correctAnswer;

    onChange({ ...question, options: updatedOptions, correctAnswer });
  };

  return (
    <div className="border border-gray-700 bg-gray-900 rounded-lg p-4 mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Question {index + 1}
        </h3>
        <button onClick={onRemove}>
          <GrClose size={20} />
        </button>
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
        placeholder="Enter question text"
      />

      <select
        value={question.type}
        onChange={(e) =>
          onChange({
            ...question,
            type: e.target.value as QuestionType,
            options: e.target.value === "INPUT" ? [] : question.options,
          })
        }
        className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
      >
        <option value="INPUT">Input</option>
        <option value="BOOLEAN">True/False</option>
        <option value="CHECKBOX">Checkbox</option>
      </select>

      {(question.type === "INPUT" ||
        question.type === "BOOLEAN" ||
        question.type === "CHECKBOX") && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <OptionField
              key={i}
              text={opt.text}
              isCorrect={opt.isCorrect}
              type={question.type}
              onTextChange={(text) => handleOptionChange(i, { text })}
              onToggleCorrect={() => {
                toggleCorrect(i);

                if (question.type === "INPUT") {
                  onChange({
                    ...question,
                    correctAnswer: question.options[i].text,
                  });
                }
              }}
              onRemove={() => removeOption(i)}
            />
          ))}

          <button
            type="button"
            onClick={addOption}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}
