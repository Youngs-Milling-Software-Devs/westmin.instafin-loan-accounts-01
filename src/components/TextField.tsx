"use client";
import { HTMLInputTypeAttribute } from "react";

export interface ITextFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
}
export default function TextField({
  id,
  name,
  placeholder,
  onChange,
  type = "text",
  value = "", // ✅ default value
}: ITextFieldProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
}
