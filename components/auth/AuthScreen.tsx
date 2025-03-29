"use client";
import { SignInFlow } from "@/type";
import { useState } from "react";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center relative bg-gradient-to-br from-[#5C3B58] to-rose-900 shadow-[10px_10px_20px_rgba(0,0,0,0.5),-10px_-10px_20px_rgba(255,255,255,0.1)] text-white">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
