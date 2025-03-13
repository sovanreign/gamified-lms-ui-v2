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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";

// Dummy Data for Lessons
const lessons = [
  {
    id: 1,
    title: "Mastering UI/UX Design: A Guide",
    image: "/module.png",
    content: 5,
    completion: null,
    deadline: "1 Day",
    deadlineUrgency: "normal",
    status: "Start",
  },
  {
    id: 2,
    title: "Creating Engaging Learning Journeys",
    image: "/module.png",
    content: 12,
    completion: 64,
    deadline: "12 hrs",
    deadlineUrgency: "urgent",
    status: "Continue",
  },
];

export default function Page() {
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
              <BreadcrumbPage>Lessons</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Lessons List */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                {/* Lesson Title with Image */}
                <TableCell className="flex items-center gap-4">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Odit, molestias?
                    </p>
                  </div>
                </TableCell>

                {/* Completion Progress */}
                <TableCell></TableCell>

                {/* Action Button */}
                <TableCell>
                  <Button
                    variant={
                      lesson.status === "Start" ? "default" : "secondary"
                    }
                  >
                    {lesson.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Body>
  );
}
