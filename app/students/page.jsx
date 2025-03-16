"use client";

import { useEffect, useState } from "react";
const Body = dynamic(() => import("@/components/body"), { ssr: false });
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, MoreHorizontal } from "lucide-react"; // Three-dot icon
import axios from "axios";
import { useRouter } from "next/navigation";
import notFound from "../../public/not-found.json";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, fetchStudents } from "@/lib/api/students";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";
import ConfirmDialog from "@/components/confirm-dialog";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";

export default function Page() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: students = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students", debouncedSearch],
    queryFn: fetchStudents,
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setDeleteDialogOpen(false);
      toast.success("Student deleted successfully.");
    },
    onError: () => {
      alert("Failed to delete student. Please try again.");
      setDeleteDialogOpen(false);
    },
  });

  return (
    <Body>
      <Header breadcrumbs={[{ label: "Students" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-4">
          {/* Top Search and Actions */}
          <div className="flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search Students..."
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                className="bg-primary text-white"
                onClick={() => {
                  router.push("/students/create");
                }}
              >
                Add Student
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading students...</span>
            </div>
          )}

          {isError && (
            <div className="flex justify-center py-10">
              <p className="text-red-500">
                Failed to load students. Try again later.
              </p>
            </div>
          )}

          {!isLoading && students.length === 0 && (
            <EmptyState
              animation={notFound}
              message="No students found."
              buttonText="Add Student"
              onButtonClick={() => router.push("/students/create")}
            />
          )}

          {/* Table */}
          {!isLoading && students.length > 0 && (
            <div className="border rounded-md shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Teacher Assigned</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="flex items-center gap-3">
                        <img
                          src={
                            student.profileUrl
                              ? student.profileUrl
                              : student.gender == "Male"
                              ? "/profile-m.png"
                              : "/profile-w.png"
                          }
                          alt={student.firstName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.uniqueId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>
                        {student.teacher?.firstName ||
                          "No Assigned Teacher Yet"}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Dropdown Menu for Actions */}
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
                                  `/students/update?studentId=${student.id}`
                                )
                              }
                            >
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(student);
                                setDeleteDialogOpen(true);
                              }}
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
