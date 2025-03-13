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
import { Pencil, Image, Clock } from "lucide-react";
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

// Dummy Lesson Data
const lesson = {
  title: "UI Design Fundamentals & Best Practice",
  thumbnail: "/module.png",
  categories: ["Fundamental", "Design", "Not Urgent"],
  duration: "1 hour",
  description: `Unlock the secrets to crafting compelling and user-centric digital experiences 
  with our "UI Design Fundamentals & Best Practices" course. Whether you're a beginner eager 
  to dive into UI design or a seasoned professional, this course provides a comprehensive 
  journey through the core principles and industry best practices.`,
  instructions: [
    "There are 10 questions in this quiz.",
    "Each question will present a brief description of UI Design Fundamentals & Best Practice.",
    "Choose the answer that you believe best matches the description.",
    "You have 1 minute to answer each question.",
    "I hope this helps! If you have any more questions or need further assistance, feel free to ask.",
  ],
};

const xpData = {
  lessonXP: 20,
  comboXP: 4,
  image: "/profile-m.png", // Change this to your actual image
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/modules">Modules</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/lessons">Lessons</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Learn</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Lesson Content */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Lesson Thumbnail */}
        <img
          src={lesson.thumbnail}
          alt="Lesson Thumbnail"
          className="w-full h-52 object-cover rounded-lg"
        />

        {/* Lesson Title */}
        <h1 className="text-2xl font-bold">{lesson.title}</h1>

        {/* Categories */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Category</span>
          {lesson.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        {/* Estimated Duration */}
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>Estimate duration</span>
          <span className="font-medium">{lesson.duration}</span>
        </div>

        {/* Lesson Description */}
        <p className="text-gray-700 leading-relaxed">{lesson.description}</p>

        {/* Instructions */}
        <div>
          <h2 className="text-lg font-semibold">Instructions:</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {lesson.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>

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
                <span className="text-lg font-bold">{xpData.lessonXP}</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-primary text-white py-2 text-lg font-semibold"
              onClick={() => setIsModalOpen(false)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Body>
  );
}
