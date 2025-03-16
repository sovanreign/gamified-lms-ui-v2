"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { sendFinalScore } from "@/lib/api/activities";
import {
  FaTrophy,
  FaStar,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import partyPopper from "@/public/party-popper.json";

const words = [
  { word: "apple", missing: "p" },
  { word: "banana", missing: "n" },
  { word: "grape", missing: "a" },
  { word: "orange", missing: "g" },
  { word: "peach", missing: "c" },
  { word: "cherry", missing: "r" },
  { word: "melon", missing: "o" },
  { word: "kiwi", missing: "w" },
  { word: "mango", missing: "g" },
  { word: "lemon", missing: "m" },
];

export default function FindMissingLetter() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");
  const router = useRouter();
  const studentId = localStorage.getItem("id");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(null);

  const { word, missing } = words[currentIndex];

  const options = [
    missing,
    String.fromCharCode(missing.charCodeAt(0) + 1),
    String.fromCharCode(missing.charCodeAt(0) - 1),
  ].sort(() => Math.random() - 0.5);

  const sendScoreMutation = useMutation({
    mutationFn: sendFinalScore,
    onSuccess: () => setIsModalOpen(true),
    onError: (error) => console.error("Error sending score:", error),
  });

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    const isCorrect = letter === missing;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowResult(isCorrect);
    setTimeout(() => handleNextWord(), 1500);
  };

  const handleNextWord = () => {
    setSelectedLetter(null);
    setShowResult(null);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sendScoreMutation.mutate({
        studentId: studentId,
        activityId: activityId,
        score: (score += 1),
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
      {/* ✅ Back Button */}
      <Button
        variant="outline"
        className="absolute top-4 left-4 flex items-center gap-2"
        onClick={() => setIsBackModalOpen(true)}
      >
        <FaArrowLeft /> Back
      </Button>

      <h1 className="text-4xl font-extrabold mb-6 text-blue-800">
        Find the Missing Letter
      </h1>

      <Card className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
        {/* ✅ Display Progress */}
        <p className="text-gray-600 mb-2">
          Question {currentIndex + 1} of {words.length}
        </p>
        <Progress
          value={((currentIndex + 1) / words.length) * 100}
          className="mb-4"
        />

        <CardHeader className="text-2xl font-semibold mb-6">
          {word.replace(missing, "_")}
        </CardHeader>

        <CardContent>
          <div className="flex justify-center gap-4">
            {options.map((letter, index) => (
              <Button
                key={index}
                onClick={() => handleSelectLetter(letter)}
                disabled={showResult !== null}
                className={`px-6 py-3 rounded-lg font-bold ${
                  showResult !== null && letter === selectedLetter
                    ? letter === missing
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-600"
                }`}
              >
                {letter}
              </Button>
            ))}
          </div>

          {/* ✅ Show Correct/Incorrect indicator */}
          {showResult !== null && (
            <p
              className={`text-lg font-bold mt-4 ${
                showResult ? "text-green-600" : "text-red-600"
              }`}
            >
              {showResult ? (
                <>
                  <FaCheck className="inline-block text-green-600 mr-2" />{" "}
                  Correct!
                </>
              ) : (
                <>
                  <FaTimes className="inline-block text-red-600 mr-2" /> Wrong!
                  The correct letter was "{missing}".
                </>
              )}
            </p>
          )}

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Score: <span className="text-blue-800">{score}</span>/{words.length}
          </p>
        </CardContent>
      </Card>

      {/* ✅ Completion Dialog */}
      <Dialog open={isModalOpen} modal={true}>
        <DialogContent className="text-center rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>🎉 Activity Completed!</DialogTitle>
          </DialogHeader>

          <div className="w-full flex justify-center">
            <Lottie animationData={partyPopper} loop className="w-48" />
          </div>

          <p className="mt-4">Congratulations on completing the activity!</p>

          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-primary text-white py-2 text-lg font-semibold"
              onClick={() => router.push("/activities")}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Back Confirmation Dialog */}
      <Dialog open={isBackModalOpen} modal={true}>
        <DialogContent className="text-center rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>⚠️ Are you sure?</DialogTitle>
          </DialogHeader>

          <p className="mt-4 text-gray-600">
            If you leave now, your progress will be lost.
          </p>

          <DialogFooter className="mt-4 flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsBackModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={() => router.push("/activities")}
            >
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
