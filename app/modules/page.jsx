"use client";

import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Settings2, Users } from "lucide-react";

// Dummy Data for Lessons
const lessons = [
  {
    id: 1,
    title: "Mastering UI Design for Impactful Solutions",
    enrolled: 10,
    accuracy: 40,
    completionRate: 60,
    tags: ["UI/UX", "Not Urgent"],
    lastEdited: "2h ago",
    questions: 10,
    image: "/module.png",
  },
  {
    id: 2,
    title: "Mastering UI Design for Impactful Solutions",
    enrolled: 10,
    accuracy: 40,
    completionRate: 60,
    tags: ["UI/UX", "Not Urgent"],
    lastEdited: "2h ago",
    questions: 10,
    image: "/module.png",
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
              <BreadcrumbPage>Modules</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Lessons Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="shadow-sm border rounded-lg p-0 m-0"
            >
              <CardHeader className="relative p-0 m-0">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                  {lesson.enrolled} Lessons
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-8">
                  <Button className="bg-primary">View</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings2 className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => alert("Edit Module")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert("Delete Module")}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Body>
  );
}
