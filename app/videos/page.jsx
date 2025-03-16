"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Body = dynamic(() => import("@/components/body"), { ssr: false });

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
import { Lock } from "lucide-react";

import { Settings2, PlayCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import notFound from "../../public/not-found.json";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteVideo, fetchVideos } from "@/lib/api/videos";
import Header from "@/components/header";
import ConfirmDialog from "@/components/confirm-dialog";
import { toast } from "sonner";

export default function Page() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500); // ✅ Prevent excessive requests
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const {
    data: videos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos", debouncedSearch],
    queryFn: fetchVideos,
    keepPreviousData: true, // ✅ Keeps old data until new data loads
  });

  const mutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Video deleted successfully.");
      setIsDeleteDialogOpen(false);
    },
    onError: () => toast.error("Failed to delete video."),
  });

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  const handleWatchClick = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <Body>
      <Header breadcrumbs={[{ label: "Video Materials" }]} />

      {/* Video Lessons Grid */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Top Search and Actions */}
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search Video Materials..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {role !== "Student" && (
              <Button
                className="bg-primary text-white"
                onClick={() => {
                  router.push("/videos/create");
                }}
              >
                Add Video Material
              </Button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading videos...</span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-10">
            <p className="text-red-500">
              Failed to load videos. Try again later.
            </p>
          </div>
        )}

        {!isLoading && videos.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Lottie animationData={notFound} className="w-64" />
            <p className="text-center text-gray-500">No videos found.</p>
          </div>
        )}

        {!isLoading && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const videoId = extractYouTubeID(video.link);

              return (
                <Card
                  key={video.id}
                  className={`shadow-sm border rounded-lg p-0 m-0 relative ${
                    !video.isOpen ? "opacity-50" : ""
                  }`}
                >
                  {/* YouTube Thumbnail */}
                  <CardHeader className="relative p-0">
                    <button
                      onClick={() => video.isOpen && handleWatchClick(video)}
                      disabled={!video.isOpen}
                      className="w-full h-44 relative"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-full h-44 object-cover rounded-t-lg"
                      />
                      {!video.isOpen && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Lock className="text-white h-10 w-10" />
                        </div>
                      )}
                    </button>
                  </CardHeader>

                  {/* Video Details */}
                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold">{video.name}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>

                    {/* Actions */}
                    <div className="flex justify-between mt-4">
                      {/* Watch Button (Disabled if Locked) */}
                      <Button
                        className="bg-primary flex items-center gap-2"
                        onClick={() => video.isOpen && handleWatchClick(video)}
                        disabled={!video.isOpen}
                      >
                        <PlayCircle size={18} /> Watch
                      </Button>

                      {/* Edit & Delete Actions (Always Enabled) */}
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
                                router.push(
                                  `/videos/update?videoId=${video.id}`
                                )
                              }
                            >
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
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false); // ✅ Close modal instantly
          mutation.mutate(selectedVideo.id);
        }}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${selectedVideo?.name}"?`}
        confirmText="Delete"
        destructive
      />

      {/* Video Playback Modal */}
      <Dialog
        open={isVideoModalOpen}
        onOpenChange={setIsVideoModalOpen}
        className="w-1/2"
      >
        <DialogContent className="max-w-3/4 w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {selectedVideo?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full aspect-video">
            {selectedVideo && (
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${extractYouTubeID(
                  selectedVideo.link
                )}`} // ✅ Fix this
                title={selectedVideo?.name}
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
    </Body>
  );
}
