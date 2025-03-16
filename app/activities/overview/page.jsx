"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchActivityById } from "@/lib/api/activities";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";

const Body = dynamic(() => import("@/components/body"), { ssr: false });

function ActivityOverview() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    setStudentId(id);
  }, []);

  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => fetchActivityById(activityId),
    enabled: !!activityId,
  });

  const filteredLearners =
    activity?.learners?.filter((learner) =>
      learner.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const isCompleted = activity?.StudentActivity?.some(
    (studentActivity) => studentActivity.studentId === studentId
  );

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Activities", href: "/activities" },
          { label: "Overview" },
        ]}
      />

      <div className="p-6 flex flex-col gap-6">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading activity...</span>
          </div>
        )}

        {isError && <EmptyState message="Failed to load activity." />}

        {!isLoading && activity && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{activity.name}</h1>
                <Badge variant="secondary">{activity.points} points</Badge>
                <div className="flex items-center gap-2 mt-4">
                  {activity.description}
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="relative">
                <img
                  src="/module.png"
                  alt="Activity Thumbnail"
                  className="w-48 h-32 object-cover rounded-lg"
                />

                <Button
                  className={`absolute inset-0 flex items-center justify-center ${
                    isCompleted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  } text-white transition`}
                  size="lg"
                  onClick={() =>
                    !isCompleted &&
                    router.push(
                      `/activities/overview/play?activityId=${activity.id}`
                    )
                  }
                  disabled={isCompleted}
                >
                  {isCompleted ? (
                    "Completed"
                  ) : (
                    <>
                      <PlayCircle size={32} className="mr-2" /> Start
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Learners Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Students</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.StudentActivity?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No Students Taken The Activity Yet
                    </TableCell>
                  </TableRow>
                ) : (
                  activity.StudentActivity?.map((learner) => (
                    <TableRow key={learner.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                            {learner.student.firstName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {learner.student.firstName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {learner.student.role}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-700">
                          {learner.score} points
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </Body>
  );
}

// ✅ Wrap the component in Suspense to fix `useSearchParams()` hydration error
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ActivityOverview />
    </Suspense>
  );
}
