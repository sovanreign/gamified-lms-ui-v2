"use client";

import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Settings2, ListChecks } from "lucide-react";

// Dummy Data for Activities
const activities = [
  {
    id: 1,
    title: "UI/UX Principles Quiz",
    description: "Test your knowledge of fundamental UI/UX design principles.",
    questions: 10,
    lastEdited: "3h ago",
    image: "/module.png",
  },
  {
    id: 2,
    title: "Color Theory Challenge",
    description: "Understand how colors affect design and user experience.",
    questions: 15,
    lastEdited: "5h ago",
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
              <BreadcrumbPage>Activities</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Activities Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="shadow-sm border rounded-lg p-0 m-0"
            >
              <CardHeader className="relative p-0">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                  {activity.questions} Items
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  Edited {activity.lastEdited}
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-4">
                  <Button className="bg-primary flex items-center gap-2">
                    <ListChecks size={16} /> View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings2 className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => alert("Edit Activity")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => alert("Delete Activity")}
                      >
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
