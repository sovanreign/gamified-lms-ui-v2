"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Lottie from "lottie-react";
import partyPopper from "@/public/party-popper.json";

const fruits = [
  { name: "Apples", emoji: "🍎", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Bananas", emoji: "🍌", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Oranges", emoji: "🍊", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Grapes", emoji: "🍇", count: Math.floor(Math.random() * 10) + 1 },
  {
    name: "Strawberries",
    emoji: "🍓",
    count: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Watermelons",
    emoji: "🍉",
    count: Math.floor(Math.random() * 10) + 1,
  },
  { name: "Cherries", emoji: "🍒", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Peaches", emoji: "🍑", count: Math.floor(Math.random() * 10) + 1 },
  {
    name: "Pineapples",
    emoji: "🍍",
    count: Math.floor(Math.random() * 10) + 1,
  },
  { name: "Lemons", emoji: "🍋", count: Math.floor(Math.random() * 10) + 1 },
];

export default function CountTheFruit() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");
  const router = useRouter();
  let studentId;

  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false); // ✅ Back confirmation dialog
  const [showResult, setShowResult] = useState(null); // ✅ Correct/Incorrect state

  const { name, emoji, count } = fruits[currentFruitIndex];

  useEffect(() => {
    studentId = localStorage.getItem("id");
  }, []);

  const sendScoreMutation = useMutation({
    mutationFn: sendFinalScore,
    onSuccess: () => setIsModalOpen(true),
    onError: (error) => console.error("Error sending score:", error),
  });

  const handleCheckAnswer = () => {
    const isCorrect = parseInt(inputValue) === count;

    if (isCorrect) {
      setScore((prev) => prev + 1); // ✅ Only increase score if correct
    }

    setShowResult(isCorrect); // ✅ Set correct/incorrect state
    setTimeout(() => handleNextFruit(), 1500); // ✅ Delay before next fruit
  };

  const handleNextFruit = () => {
    setInputValue("");
    setShowResult(null); // ✅ Reset result state

    if (currentFruitIndex < fruits.length - 1) {
      setCurrentFruitIndex((prev) => prev + 1);
    } else {
      console.log("Sending score with:", { studentId, activityId, score });

      if (!activityId) {
        console.error("❌ Missing activityId!");
        return;
      }
      sendScoreMutation.mutate({
        studentId: String(studentId), // Ensure it's a string
        activityId: String(activityId), // Ensure it's a string
        score,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-50 p-6">
      {/* ✅ Back Button */}
      <Button
        variant="outline"
        className="absolute top-4 left-4 flex items-center gap-2"
        onClick={() => setIsBackModalOpen(true)}
      >
        <FaArrowLeft /> Back
      </Button>

      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
        Count the Fruit
      </h1>

      <Card className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
        {/* ✅ Display Progress: "Question 3/10" */}
        <p className="text-gray-600 mb-2">
          Question {currentFruitIndex + 1} of {fruits.length}
        </p>

        {/* ✅ Progress Bar */}
        <Progress
          value={((currentFruitIndex + 1) / fruits.length) * 100}
          className="mb-4"
        />

        <CardHeader className="text-5xl mb-6 flex flex-wrap justify-center overflow-hidden">
          <div className="flex flex-wrap justify-center max-w-full">
            {Array.from({ length: count }).map((_, index) => (
              <span key={index} className="text-3xl">
                {emoji}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-xl font-medium mb-4">
            How many <span className="text-green-700 font-bold">{name}</span> do
            you see?
          </p>

          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-32 mx-auto text-center text-lg"
            placeholder="Enter number"
            disabled={showResult !== null}
          />

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
                  The correct number was {count}.
                </>
              )}
            </p>
          )}

          <Button
            onClick={handleCheckAnswer}
            className="mt-6 w-full bg-primary text-white py-3 text-lg font-semibold"
            disabled={showResult !== null || sendScoreMutation.isLoading}
          >
            {sendScoreMutation.isLoading ? "Submitting..." : "Check Answer"}
          </Button>

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Score: <span className="text-green-700">{score}</span>/{" "}
            {fruits.length}
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

          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center px-4 py-2 rounded-lg">
              <span className="text-lg">You Earned Points</span>
              <div className="flex items-center gap-2 text-yellow-600">
                <FaStar size={18} />
                <span className="text-lg font-bold">{score} points</span>
              </div>
            </div>
          </div>

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
