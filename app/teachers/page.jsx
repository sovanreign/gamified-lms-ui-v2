"use client";

import { useState } from "react";
import Body from "@/components/body";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import notFound from "../../public/not-found.json";
import ConfirmDialog from "@/components/confirm-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher, fetchTeachers } from "@/lib/api/teachers";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";
import { useDebounce } from "use-debounce";

export default function Page() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: teachers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teachers", debouncedSearch], // Include search query in key
    queryFn: fetchTeachers,
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      setDeleteDialogOpen(false);
    },
    onError: () => {
      alert("Failed to delete teacher. Please try again.");
      setDeleteDialogOpen(false);
    },
  });

  const handleDeleteClick = (teacher) => {
    setSelectedUser(teacher);
    setDeleteDialogOpen(true);
  };

  return (
    <Body>
      <Header breadcrumbs={[{ label: "Teachers" }]} />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-4">
          {/* Search & Add Button */}
          <div className="flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search Teachers..."
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search state
            />
            <Button
              className="bg-primary text-white"
              onClick={() => {
                router.push("/teachers/create");
              }}
            >
              Add Teacher
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading teachers...</span>
            </div>
          )}

          {isError && (
            <div className="flex justify-center py-10">
              <p className="text-red-500">
                Failed to load teachers. Try again later.
              </p>
            </div>
          )}

          {/* No Teachers Message */}
          {!isLoading && teachers.length === 0 && (
            <EmptyState
              animation={notFound}
              message="No teachers found."
              buttonText="Add Teacher"
              onButtonClick={() => router.push("/teachers/create")}
            />
          )}

          {/* Teachers Table */}
          {!isLoading && teachers.length > 0 && (
            <div className="border rounded-md shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="flex items-center gap-3">
                        <img
                          src={
                            teacher.profileUrl
                              ? teacher.profileUrl
                              : teacher.gender == "Male"
                              ? "/profile-m.png"
                              : "/profile-w.png"
                          }
                          alt={teacher.firstName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {teacher.uniqueId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.gender}</TableCell>
                      <TableCell>{teacher.age}</TableCell>
                      <TableCell>
                        {teacher.email || "No email provided"}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Dropdown Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/teachers/update?teacherId=${teacher.id}`
                                )
                              }
                            >
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(teacher)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => mutation.mutate(selectedUser.id)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
        confirmText="Delete"
        destructive
      />
    </Body>
  );
}
