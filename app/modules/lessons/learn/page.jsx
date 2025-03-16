"use client";

import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Image, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import Lottie from "lottie-react";
import partyPopper from "@/public/party-popper.json";
import Header from "@/components/header";
import Template from "./components/template";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchLessonById } from "@/lib/api/lessons";
import { useQuery } from "@tanstack/react-query";

const xpData = {
  lessonXP: 20,
  comboXP: 4,
  image: "/profile-m.png", // Change this to your actual image
};

export default function Page() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLessonById(lessonId),
    enabled: !!lessonId,
  });

  const loadContent = () => {
    switch (lesson.content) {
      case "lesson1":
        return <Template />;

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
          { label: "Lessons", href: "/modules/lessons?moduleId=" },
          { label: "Learn" },
        ]}
      />

      {/* Lesson Content */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        {loadContent()}
        {/* Mark as Done Button */}
        <div className="flex justify-end mt-4">
          <Button
            className="bg-primary text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Mark as Done
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="text-center  rounded-lg p-6">
          <DialogHeader>
            {/* <DialogTitle className="text-center text-2xl font-bold">
              🎉 Lesson Complete!
            </DialogTitle> */}
          </DialogHeader>

          {/* Image */}
          <div className="w-full flex justify-center">
            <Lottie animationData={partyPopper} loop={true} className="w-48" />
          </div>

          <p className="mt-4">Congratulations on completing the lesson</p>

          {/* XP Breakdown */}
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center  px-4 py-2 rounded-lg">
              <span className="text-lg">Lesson XP</span>
              <div className="flex items-center gap-2 ">
                <FaRegLightbulb size={18} />
                <span className="text-lg font-bold">{lesson.points}</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-primary text-white py-2 text-lg font-semibold"
              onClick={() => {
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
