import { ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

export interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  mode: "success" | "danger" | "primary";
  type?: "submit" | "reset" | "button";
  isSubmitting?: boolean;
}
export default function Button({
  mode,
  onClick,
  type,
  isSubmitting = false,
  children = "Click Me",
}: IButtonProps) {
  const buttonClass =
    mode === "success"
      ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      : mode === "primary"
        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        : "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer";
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isSubmitting}
      className={`${buttonClass} flex justify-center items-center gap-2 w-full`}
    >
      {isSubmitting ? <LoadingSpinner /> : children}
    </button>
  );
}
