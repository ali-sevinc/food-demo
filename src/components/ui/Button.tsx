import { ReactNode } from "react";
interface PropsType {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
}
export default function Button({ children, onClick, type }: PropsType) {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : () => {}}
      className="mt-2 rounded-sm bg-stone-100 px-8 py-2 text-stone-800 hover:bg-stone-300"
    >
      {children}
    </button>
  );
}
