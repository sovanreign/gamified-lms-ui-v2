"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchModules, updateModule } from "@/lib/api/modules";
import Body from "@/components/body";
import Header from "@/components/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Lock, MoreHorizontal, Settings2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const role = localStorage.getItem("role");

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  const mutation = useMutation({
    mutationFn: ({ moduleId, data }) => updateModule({ moduleId, data }),
    onMutate: async ({ moduleId, data }) => {
      await queryClient.cancelQueries(["modules"]); // Cancel any ongoing queries

      const previousModules = queryClient.getQueryData(["modules"]); // Snapshot current data

      // Optimistic UI Update: Update the UI before waiting for API response
      queryClient.setQueryData(["modules"], (old) =>
        old.map((mod) => (mod.id === moduleId ? { ...mod, ...data } : mod))
      );

      return { previousModules };
    },
    onSuccess: () => {
      toast.success("Module updated successfully.");
      queryClient.invalidateQueries(["modules"]); // Re-fetch updated data
    },
    onError: (err, _, context) => {
      toast.error("Failed to update module.");
      queryClient.setQueryData(["modules"], context.previousModules); // Rollback UI on error
    },
  });

  return (
    <Body>
      <Header breadcrumbs={[{ label: "Modules" }]} />

      {/* Lessons Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading modules...</span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-center py-10">
            <p className="text-red-500">
              Failed to load modules. Try again later.
            </p>
          </div>
        )}

        {/* Modules Grid */}
        {!isLoading && lessons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`shadow-sm border rounded-lg p-0 m-0 relative ${
                  !lesson.isOpen ? "opacity-50" : ""
                }`}
              >
                {/* Module Thumbnail */}
                <CardHeader className="relative p-0 m-0">
                  <img
                    src={"/module.png"}
                    alt={lesson.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />

                  {/* Lock Overlay */}
                  {!lesson.isOpen && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <Lock className="text-white h-10 w-10" />
                    </div>
                  )}

                  {/* Lesson Count Badge */}
                  <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                    {lesson.lessons.length} Lessons
                  </Badge>
                </CardHeader>

                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold">{lesson.name}</h3>
                  <p className="text-sm text-gray-600">{lesson.description}</p>

                  {/* Actions */}
                  <div className="flex justify-between mt-8">
                    {/* View Button (Disabled if not Open) */}
                    <Button
                      className="bg-primary"
                      disabled={!lesson.isOpen}
                      onClick={() =>
                        router.push(`/modules/lessons?moduleId=${lesson.id}`)
                      }
                    >
                      Explore
                    </Button>

                    {/* Lock/Unlock Dropdown */}
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
                                moduleId: lesson.id,
                                data: { isOpen: !lesson.isOpen },
                              })
                            }
                          >
                            {lesson.isOpen ? "Lock Module" : "Unlock Module"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Modules Found */}
        {!isLoading && lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-500">No modules found.</p>
          </div>
        )}
      </div>
    </Body>
  );
}
