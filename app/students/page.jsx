"use client";

import { useEffect, useState } from "react";
import Body from "@/components/body";
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
import Lottie from "lottie-react";
import notFound from "../../public/not-found.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users?role=Student`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        setStudents(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDeleteClick = (student) => {
    setSelectedUser(student);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`${API_URL}/api/users/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(students.filter((s) => s.id !== selectedUser.id));
    } catch (err) {
      alert("Failed to delete student. Please try again.");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Students</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-4">
          {/* Top Search and Actions */}
          <div className="flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search Students..."
              className="w-64"
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

          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading students...</span>
            </div>
          )}

          {!loading && students.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Lottie animationData={notFound} className="w-64" />
              <p className="text-center text-gray-500">No students found.</p>
            </div>
          )}

          {/* Table */}
          {!loading && students.length > 0 && (
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
                              onClick={() => handleDeleteClick(student)}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {selectedUser?.firstName} {selectedUser?.lastName}
            </strong>
            ?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Body>
  );
}
