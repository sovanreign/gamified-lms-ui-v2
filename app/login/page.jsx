"use client";

import { LoginForm } from "./components/login-form";
import Image from "next/image";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import childrenPlaying from "../../public/children-playing.json";
import dynamic from "next/dynamic";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a className="flex items-center gap-2 font-medium">
            <div className="flex h-14 w-14 items-center justify-center rounded-md  text-primary-foreground">
              <Image src="/logo.png" width="64" height="64" alt="logo" />
            </div>
            <span className="font-semibold text-white">
              Malasiqui Adventist School
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden  lg:block">
        <Lottie animationData={childrenPlaying} loop={true} />
      </div>
    </div>
  );
}
