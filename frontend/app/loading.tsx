import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <BeatLoader color="#fff" />
    </div>
  );
}
