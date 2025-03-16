"use client";

import Body from "@/components/body";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import partyPopper from "@/public/party-popper.json";
import Header from "@/components/header";
import Template from "./components/template";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchLessonById, markLessonAsDone } from "@/lib/api/lessons";
import { useMutation, useQuery } from "@tanstack/react-query";
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });
import dynamic from "next/dynamic";

const Lesson1 = dynamic(() => import("./components/lesson1"), { ssr: false });
const Lesson2 = dynamic(() => import("./components/lesson2"), { ssr: false });
const Lesson3 = dynamic(() => import("./components/lesson3"), { ssr: false });

function LearnPage() {
  const searchParams = useSearchParams();
  const [lessonId, setLessonId] = useState(null);

  useEffect(() => {
    setLessonId(searchParams.get("lessonId"));
  }, [searchParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setId(localStorage.getItem("id"));
  }, []);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLessonById(lessonId),
    enabled: !!lessonId,
  });

  const markAsDoneMutation = useMutation({
    mutationFn: markLessonAsDone,
    onSuccess: () => {
      setIsModalOpen(true); // ✅ Open modal ONLY after success
    },
    onError: () => {
      alert("Failed to mark lesson as done.");
    },
  });

  const handleMarkAsDone = () => {
    const studentId = localStorage.getItem("id"); // ✅ Get student ID
    if (!studentId) {
      alert("No student ID found.");
      return;
    }

    markAsDoneMutation.mutate({ studentId, lessonId });
  };

  const isCompleted = lesson?.StudentLesson?.some(
    (studentLesson) => studentLesson.studentId === id
  );

  const loadContent = () => {
    switch (lesson.content) {
      case "lesson1":
        return <Lesson1 />;
      case "lesson2":
        return <Lesson2 />;
      case "lesson3":
        return <Lesson3 />;
      default:
        return <Template />;
    }
  };

  if (isLoading) {
    return (
      <Body>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading lesson...</span>
        </div>
      </Body>
    );
  }

  if (isError || !lesson) {
    return (
      <Body>
        <div className="text-center text-red-500 mt-10">
          Failed to load lesson.
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Modules", href: "/modules" },
          {
            label: "Lessons",
            href: `/modules/lessons?moduleId=${lesson.moduleId}`,
          },
          { label: "Learn" },
        ]}
      />

      {isModalOpen && (
        <ReactConfetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* Lesson Content */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        {loadContent()}
        {/* Mark as Done Button */}
        {role === "Student" && (
          <div className="flex justify-end mt-4">
            <Button
              className={`flex items-center gap-2 ${
                isCompleted ? "bg-gray-400" : "bg-primary text-white"
              }`}
              onClick={() => {
                if (!isCompleted) {
                  handleMarkAsDone();
                }
              }}
              disabled={isCompleted || markAsDoneMutation.isLoading}
            >
              {isCompleted ? (
                "Completed"
              ) : markAsDoneMutation.isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Submitting...
                </>
              ) : (
                "Mark as Done"
              )}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} modal={true}>
        {" "}
        {/* ✅ Prevent closing on outside click */}
        <DialogContent className="text-center rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>🎉 Lesson Completed!</DialogTitle>
          </DialogHeader>

          {/* Image */}
          <div className="w-full flex justify-center">
            <Lottie animationData={partyPopper} loop className="w-48" />
          </div>

          <p className="mt-4">Congratulations on completing the lesson</p>

          {/* XP Breakdown */}
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center px-4 py-2 rounded-lg">
              <span className="text-lg">You Earned Points</span>
              <div className="flex items-center gap-2 text-yellow-600">
                <FaStar size={18} />
                <span className="text-lg font-bold">
                  {lesson.points} points
                </span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-primary text-white py-2 text-lg font-semibold"
              onClick={() => {
                setIsModalOpen(false); // ✅ Close modal on button click
                router.push(`/modules/lessons?moduleId=${lesson.moduleId}`);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Body>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <LearnPage />
    </Suspense>
  );
}
