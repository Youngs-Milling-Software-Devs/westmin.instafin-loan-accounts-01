"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLockOpen } from "react-icons/fa";
import cookie from "js-cookie";
import Image from "next/image";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const USERNAME = process.env.NEXT_PUBLIC_DEFAULT_USERNAME;
    const PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;

    console.log("credewntial", USERNAME, PASSWORD, "nputs", username, password);

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
    <div className="w-screen h-screen relative">
      {/* Top half blue */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-800"></div>

      {/* Bottom half white (optional, since default is white) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      {/* Login form centered */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          {/* Header */}

          <div className="p-10 flex flex-col gap-6">
            <Image
              className="w-full"
              src="/westmin.png"
              alt="Next.js logo"
              width={1000}
              height={1000}
              priority
            />
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

            {/* Footer */}
            <div className="text-center text-sm text-gray-400 mt-2">
              © 2026 WestMin Finance. All rights reserved.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
