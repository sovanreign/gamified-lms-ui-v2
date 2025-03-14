"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
import { MoreHorizontal, Loader2 } from "lucide-react"; // Icons
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import notFound from "../../public/not-found.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const router = useRouter();
  const token = localStorage.getItem("token");

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users?role=Teacher`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Bearer
          },
        });
        setTeachers(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Handle Delete
  const handleDeleteClick = (teacher) => {
    setSelectedUser(teacher);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`${API_URL}/api/users/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer
        },
      });
      setTeachers(teachers.filter((t) => t.id !== selectedUser.id));
    } catch (err) {
      alert("Failed to delete teacher. Please try again.");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Teachers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-4">
          {/* Search & Add Button */}
          <div className="flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search Teachers..."
              className="w-64"
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
          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading teachers...</span>
            </div>
          )}

          {/* No Teachers Message */}
          {!loading && teachers.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Lottie animationData={notFound} className="w-64" />
              <p className="text-center text-gray-500">No teachers found.</p>
            </div>
          )}

          {/* Teachers Table */}
          {!loading && teachers.length > 0 && (
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
