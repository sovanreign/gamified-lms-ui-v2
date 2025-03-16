"use client";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import dynamic from "next/dynamic";
import { Button } from "./ui/button";

export default function EmptyState({
  animation,
  message,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <Lottie animationData={animation} className="w-64" />
      <p className="text-gray-500">{message}</p>
      {buttonText && onButtonClick && (
        <Button
          onClick={onButtonClick}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
