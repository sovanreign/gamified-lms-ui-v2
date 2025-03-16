"use client";

const Body = dynamic(() => import("@/components/body"), { ssr: false });

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Settings2, Loader2, Lock, Gamepad } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchActivities, updateActivity } from "@/lib/api/activities";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";
import notFound from "@/public/not-found.json";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setStudentId(localStorage.getItem("id"));
  }, []);

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  const mutation = useMutation({
    mutationFn: ({ activityId, data }) => updateActivity({ activityId, data }),
    onSuccess: () => {
      toast.success("Activity updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["activities"] }); // Refresh list
    },
    onError: () => toast.error("Failed to update activity."),
  });

  return (
    <Body>
      <Header breadcrumbs={[{ label: "Activities" }]} />

      {/* Activities Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading activities...</span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-10">
            <p className="text-red-500">Failed to load activities.</p>
          </div>
        )}

        {!isLoading && activities.length === 0 && (
          <EmptyState animation={notFound} message="No activities yet." />
        )}

        {!isLoading && activities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const studentActivity = activity?.StudentActivity?.find(
                (sa) => sa.studentId === studentId
              );

              const isCompleted = !!studentActivity;
              const studentScore = studentActivity?.score || 0;

              return (
                <Card
                  key={activity.id}
                  className={`shadow-sm border rounded-lg p-0 m-0 relative ${
                    !activity.isOpen ? "opacity-50" : ""
                  }`}
                >
                  <CardHeader className="relative p-0">
                    <img
                      src={activity.image || "/module.png"}
                      alt={activity.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />

                    {!activity.isOpen && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                        <Lock className="text-white h-10 w-10" />
                      </div>
                    )}

                    <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                      {activity.points} Points
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold">{activity.name}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    {/* <p className="text-xs text-gray-500">
                    Edited {activity.lastEdited}
                  </p> */}

                    {/* Actions */}
                    <div className="flex justify-between mt-4">
                      <Button
                        disabled={!activity.isOpen}
                        className="bg-primary flex items-center gap-2"
                        onClick={() =>
                          router.push(
                            `/activities/overview?activityId=${activity.id}`
                          )
                        }
                      >
                        <Gamepad size={16} /> PLay
                      </Button>
                      {role !== "Student" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Settings2 className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                mutation.mutate({
                                  activityId: activity.id,
                                  data: { isOpen: !activity.isOpen }, // Toggle lock/unlock
                                })
                              }
                            >
                              {activity.isOpen
                                ? "Lock Activity"
                                : "Unlock Activity"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}

                      {/* add the student score here */}
                      {isCompleted && (
                        <div className="text-xs text-yellow-600 flex items-center gap-1">
                          <FaStar size={16} /> Score: {studentScore}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Body>
  );
}
