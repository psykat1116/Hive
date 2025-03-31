"use client";
import { useState } from "react";

import { SignInFlow } from "@/type";
import SignInCard from "@/components/auth/SignInCard";
import SignUpCard from "@/components/auth/SignUpCard";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="md:h-auto w-[450px] md:w-[420px] px-4">
      {state === "signIn" ? (
        <SignInCard setState={setState} />
      ) : (
        <SignUpCard setState={setState} />
      )}
    </div>
  );
};

export default AuthScreen;
