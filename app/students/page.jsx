"use client";

import { useState } from "react";
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
import { MoreHorizontal } from "lucide-react"; // Three-dot icon

// Dummy Data: Students List
const students = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    uniqueId: "S-2024-001",
    gender: "Male",
    age: 20,
    teacherName: "Mr. Smith",
    profileUrl: "/profile-m.png",
  },
];

export default function Page() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (student) => {
    setSelectedUser(student);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      console.log("Deleted:", selectedUser);
      alert(`Deleted ${selectedUser.firstName} ${selectedUser.lastName}`);
    }
    setOpenDeleteModal(false);
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
              <Button className="bg-primary text-white">Add Student</Button>
            </div>
          </div>

          {/* Table */}
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
                        src={student.profileUrl}
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
                    <TableCell>{student.teacherName}</TableCell>
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
                            onClick={() => alert("Update Clicked")}
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
