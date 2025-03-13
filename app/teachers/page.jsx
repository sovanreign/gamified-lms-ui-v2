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

const learners = [
  {
    id: 1,
    firstName: "Ivan",
    lastName: "Ramos",
    uniqueId: "24-0228",
    gender: "Male",
    age: 23,
    email: "iramos@ncf.edu.ph",
    profileUrl: "/profile-m.png",
  },
];

export default function Page() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
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
                <BreadcrumbPage>Teachers</BreadcrumbPage>
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
              placeholder="Search Teachers..."
              className="w-64"
            />
            <div className="flex gap-2">
              <Button className="bg-primary text-white">Add Teacher</Button>
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
                  <TableHead>Email</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learners.map((learner) => (
                  <TableRow key={learner.id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={learner.profileUrl}
                        alt={learner.firstName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">
                          {learner.firstName} {learner.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {learner.uniqueId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{learner.gender}</TableCell>
                    <TableCell>{learner.age}</TableCell>
                    <TableCell>{learner.email}</TableCell>
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
                            onClick={() => handleDeleteClick(learner)}
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
