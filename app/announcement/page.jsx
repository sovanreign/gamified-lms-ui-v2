"use client";

import dynamic from "next/dynamic";

const Body = dynamic(() => import("@/components/body"), { ssr: false });
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import notFound from "../../public/not-found.json";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddAnnouncementDialog from "./components/add-announcement";
import UpdateAnnouncementDialog from "./components/update-announcement";
import DeleteConfirmationDialog from "./components/delete-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncement,
  fetchAllAnnouncements,
} from "@/lib/api/announcements";
import EmptyState from "@/components/empty-state";
import { useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnnouncementPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const {
    data: announcements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAllAnnouncements,
  });

  const handleDeleteAnnouncement = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Body>
      {/* Header Section */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Announcements</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Announcements List */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Top Search and Actions */}
        {role !== "Student" && (
          <div className="flex items-center justify-end py-6">
            <div className="flex gap-2">
              <Button
                className="bg-primary text-white"
                onClick={() => setDialogOpen(true)}
              >
                Add Announcement
              </Button>
            </div>
          </div>
        )}

        {isLoading && <p className="text-center text-gray-600">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load announcements.
          </p>
        )}
        {!isLoading && announcements.length === 0 && (
          <EmptyState
            animation={notFound}
            message="No Announcement Posted Yet."
          />
        )}

        {!isLoading && announcements.length > 0 && (
          <>
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-4 relative">
                <CardContent className="flex flex-col gap-2">
                  {/* Announcement Title */}
                  <h3 className="text-lg font-semibold">
                    {announcement.title}
                  </h3>

                  {/* Announcement Message */}
                  <p className="text-md text-gray-700">
                    {announcement.message}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    {/* Author Info */}
                    <div className="flex items-center gap-2">
                      {announcement.author.profileUrl === null ? (
                        <Avatar>
                          <AvatarImage
                            src="/user.png"
                            alt={announcement.author}
                          />
                          <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarImage
                            src={`${API_URL}/uploads${announcement.author.profileUrl}`}
                            alt={announcement.author}
                          />
                          <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                      )}

                      <p className="font-medium">
                        {announcement.author.firstName}{" "}
                        {announcement.author.lastName}
                      </p>
                    </div>

                    {/* Time Ago */}
                    <p>
                      {formatDistanceToNow(new Date(announcement.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </CardContent>

                {/* More Options Dropdown Menu */}
                {announcement.author.id === id && (
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAnnouncement(announcement);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAnnouncement(announcement);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </Card>
            ))}
          </>
        )}
      </div>

      <AddAnnouncementDialog open={dialogOpen} setOpen={setDialogOpen} />
      <UpdateAnnouncementDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        announcement={selectedAnnouncement}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onDelete={handleDeleteAnnouncement}
        announcement={selectedAnnouncement}
      />
    </Body>
  );
}
