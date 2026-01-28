"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLockOpen } from "react-icons/fa";
import cookie from "js-cookie";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const USERNAME = process.env.NEXT_PUBLIC_DEFAULT_USERNAME;
    const PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;

    if (USERNAME === username && PASSWORD === password) {
      setUsername("");
      setPassword("");
      alert("Successfully sign in..");
      navigation.push("/loan-accounts");
      cookie.set("flag", "true", { expires: 7, secure: true });
    } else {
      setUsername("");
      setPassword("");
      alert("Username and password are incorrect");
    }
  };
  return (
    <form
      className="flex justify-center  w-screen h-screen items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-10 flex flex-col gap-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-amber-600 text-center">
            WestMin Loan Accounts
          </h1>
          <p className="text-gray-500 text-center text-sm">
            Sign in to your account to continue
          </p>

          {/* Username */}
          <TextField
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <TextField
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <Button mode="primary" type="submit">
            <FaLockOpen /> Sign in
          </Button>

          {/* Optional: footer */}
          <div className="text-center text-sm text-gray-400 mt-2">
            © 2026 WestMin Finance. All rights reserved.
          </div>
        </div>
      </div>
    </form>
  );
}
