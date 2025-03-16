"use client";

const Body = dynamic(() => import("@/components/body"), { ssr: false });
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Settings2, UnlockIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import { fetchLessons, updateLesson } from "@/lib/api/lessons";
import EmptyState from "@/components/empty-state";
import notFound from "../../../public/not-found.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

function LessonPage() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("id"));
      setRole(localStorage.getItem("role"));
    }
  }, []);
  const searchParams = useSearchParams();
  const [moduleId, setModuleId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("moduleId");
    setModuleId(id);
  }, [searchParams]);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessons", moduleId], // Include moduleId in queryKey
    queryFn: fetchLessons,
    enabled: !!moduleId, // Only fetch if moduleId exists
  });

  const mutation = useMutation({
    mutationFn: ({ lessonId, data }) => updateLesson({ lessonId, data }),

    onMutate: async ({ lessonId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["lessons", moduleId] });

      const previousLessons = queryClient.getQueryData(["lessons", moduleId]);

      queryClient.setQueryData(["lessons", moduleId], (oldData) => {
        return oldData.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, ...data } : lesson
        );
      });

      return { previousLessons };
    },

    onError: (err, _, context) => {
      toast.error("Failed to update lesson.");
      if (context?.previousLessons) {
        queryClient.setQueryData(
          ["lessons", moduleId],
          context.previousLessons
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", moduleId] });
    },

    onSuccess: () => {
      toast.success("Lesson updated successfully!");
    },
  });

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Modules", href: "/modules" },
          { label: "Lessons" },
        ]}
      />

      {/* Lessons List */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading lessons...</span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-10">
            <p className="text-red-500">
              Failed to load lessons. Try again later.
            </p>
          </div>
        )}

        {!isLoading && lessons.length === 0 && (
          <EmptyState animation={notFound} message="No lessons yet." />
        )}

        {!isLoading && lessons.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-lg">
                  {lessons[0].module.name}
                </TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow
                  key={lesson.id}
                  className={`relative ${!lesson.isOpen ? "opacity-50" : ""}`}
                >
                  {/* Lesson Title with Image */}
                  <TableCell className="flex items-center gap-4">
                    <img
                      src="/module.png"
                      alt={lesson.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{lesson.name}</p>
                      <p className="text-sm text-gray-600">
                        {lesson.description.length > 50
                          ? `${lesson.description.substring(0, 50)}...`
                          : lesson.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Completion Progress */}
                  <TableCell>
                    {lesson.isOpen ? <UnlockIcon /> : <Lock />}
                  </TableCell>

                  {/* Action Button */}
                  <TableCell>
                    {lesson.StudentLesson.some(
                      (sl) => sl.studentId === userId
                    ) ? (
                      <Button disabled={true} variant="secondary">
                        Completed
                      </Button>
                    ) : (
                      <Button
                        disabled={!lesson.isOpen}
                        onClick={() =>
                          router.push(
                            `/modules/lessons/learn?lessonId=${lesson.id}`
                          )
                        }
                        variant="default"
                      >
                        Start
                      </Button>
                    )}
                  </TableCell>

                  {role !== "Student" && (
                    <TableCell>
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
                                lessonId: lesson.id,
                                data: { isOpen: !lesson.isOpen },
                              })
                            }
                          >
                            {lesson.isOpen ? "Lock Lesson" : "Unlock Lesson"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Body>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <LessonPage />
    </Suspense>
  );
}
