"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlayCircle, Search, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy Data for Activity Details
const activity = {
  title: "UI Design Fundamentals & Best Practice",
  image: "/module.png",
  tags: ["Fundamental", "Design", "Urgent"],
  stats: {
    accuracy: 50,
    completionRate: 100,
    submissions: 20,
    avgTime: "04:20",
  },
  learners: [
    {
      id: 1,
      name: "Adit Irwan",
      role: "Jr UI/UX Designer",
      points: 30,
      answers: [true, true, true, false, true, true],
    },
    {
      id: 2,
      name: "Arif Brata",
      role: "Design",
      points: 30,
      answers: [true, true, true, true, true, true],
    },
    {
      id: 3,
      name: "Ardhi Irwandi",
      role: "Sr UI/UX Designer",
      points: 30,
      answers: [true, true, true, false, true, true],
    },
    {
      id: 4,
      name: "Bagus Yuli",
      role: "Design",
      points: 30,
      answers: [true, true, true, true, false, true],
    },
    {
      id: 5,
      name: "Boni Nxon",
      role: "Sr UI/UX Designer",
      points: 10,
      answers: [true, false, true, true, true, false],
    },
  ],
};

export default function Page() {
  const [search, setSearch] = useState("");

  // Filter learners based on search input
  const filteredLearners = activity.learners.filter((learner) =>
    learner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>Activities</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Activities</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Activity Header */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{activity.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              {activity.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Thumbnail Image */}
          <div className="relative">
            <img
              src={activity.image}
              alt="Activity Thumbnail"
              className="w-48 h-32 object-cover rounded-lg"
            />
            <Button
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition"
              size="lg"
            >
              <PlayCircle size={32} className="mr-2" /> Play
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-gray-500 text-sm">Accuracy</p>
            <p className="text-xl font-semibold">{activity.stats.accuracy}%</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-gray-500 text-sm">Completed Course</p>
            <p className="text-xl font-semibold">
              {activity.stats.completionRate}%
            </p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-gray-500 text-sm">Submissions</p>
            <p className="text-xl font-semibold">
              {activity.stats.submissions}
            </p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-gray-500 text-sm">Avg. Complete Time</p>
            <p className="text-xl font-semibold">{activity.stats.avgTime}</p>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search Learner..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline">
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>

        {/* Learners Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Learner</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>No. 1</TableHead>
              <TableHead>No. 2</TableHead>
              <TableHead>No. 3</TableHead>
              <TableHead>No. 4</TableHead>
              <TableHead>No. 5</TableHead>
              <TableHead>No. 6</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLearners.map((learner) => (
              <TableRow key={learner.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                      {learner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{learner.name}</p>
                      <p className="text-xs text-gray-500">{learner.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-gray-700">
                    {learner.points} points
                  </span>
                </TableCell>
                {learner.answers.map((isCorrect, index) => (
                  <TableCell key={index} className="text-center">
                    {isCorrect ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-red-500" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Body>
  );
}
