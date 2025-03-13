"use client";

import { useState } from "react";
import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings2, Trash2, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy Data for Video Lessons
const videoLessons = [
  {
    id: 1,
    title: "Mastering UI Design for Impactful Solutions",
    description: "A deep dive into UI design principles and best practices.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: 2,
    title: "Understanding Color Theory in UI/UX",
    description: "Learn how color impacts user perception and usability.",
    youtubeId: "3JZ_D3ELwOQ", // Replace with actual YouTube video ID
  },
];

export default function Page() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  };

  const handleWatchClick = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedVideo) {
      console.log("Deleted Video:", selectedVideo);
      alert(`Deleted video: ${selectedVideo.title}`);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Video Materials</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Video Lessons Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Top Search and Actions */}
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search Video Materials..."
            className="w-64"
          />
          <div className="flex gap-2">
            <Button className="bg-primary text-white">
              Add Video Material
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoLessons.map((video) => (
            <Card
              key={video.id}
              className="shadow-sm border rounded-lg p-0 m-0"
            >
              {/* YouTube Thumbnail */}
              <CardHeader className="relative p-0">
                <button onClick={() => handleWatchClick(video)}>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                </button>
              </CardHeader>

              {/* Video Details */}
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>

                {/* Actions */}
                <div className="flex justify-between mt-4">
                  <Button
                    className="bg-primary flex items-center gap-2"
                    onClick={() => handleWatchClick(video)}
                  >
                    <PlayCircle size={18} /> Watch
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings2 className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => alert("Edit Video")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDeleteClick(video)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Playback Modal */}
      <Dialog
        open={isVideoModalOpen}
        onOpenChange={setIsVideoModalOpen}
        className="w-1/2"
      >
        <DialogContent className="max-w-3/4 w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full aspect-video">
            {selectedVideo && (
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title="YouTube video"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsVideoModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedVideo?.title}</strong>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Body>
  );
}
