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

const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Purple", code: "#800080" },
  { name: "Orange", code: "#FFA500" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Cyan", code: "#00FFFF" },
  { name: "Brown", code: "#A52A2A" },
  { name: "Gray", code: "#808080" },
];

export default function NameTheColor() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");
  const router = useRouter();
  const studentId = localStorage.getItem("id");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(null);

  const { name, code } = colors[currentIndex];

  const options = colors
    .map((color) => color.name)
    .sort(() => Math.random() - 0.5);

  const sendScoreMutation = useMutation({
    mutationFn: sendFinalScore,
    onSuccess: () => setIsModalOpen(true),
    onError: (error) => console.error("Error sending score:", error),
  });

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === name;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowResult(isCorrect);
    setTimeout(() => handleNextColor(), 1500);
  };

  const handleNextColor = () => {
    setSelectedAnswer(null);
    setShowResult(null);

    if (currentIndex < colors.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sendScoreMutation.mutate({
        studentId: studentId,
        activityId: activityId,
        score: score + 1,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-50 p-6">
      {/* ✅ Back Button */}
      <Button
        variant="outline"
        className="absolute top-4 left-4 flex items-center gap-2"
        onClick={() => setIsBackModalOpen(true)}
      >
        <FaArrowLeft /> Back
      </Button>

      <h1 className="text-4xl font-extrabold mb-6 text-indigo-800">
        Name the Color
      </h1>

      <Card className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
        {/* ✅ Display Progress */}
        <p className="text-gray-600 mb-2">
          Question {currentIndex + 1} of {colors.length}
        </p>
        <Progress
          value={((currentIndex + 1) / colors.length) * 100}
          className="mb-4"
        />

        <CardHeader className="mb-6">
          <div
            className="w-40 h-40 rounded-md shadow-md mx-auto"
            style={{ backgroundColor: code }}
          ></div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 w-full">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={showResult !== null}
                className={`w-full px-4 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                  showResult !== null && option === selectedAnswer
                    ? option === name
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option}
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
                  The correct color was "{name}".
                </>
              )}
            </p>
          )}

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Score: <span className="text-indigo-800">{score}</span>/
            {colors.length}
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
