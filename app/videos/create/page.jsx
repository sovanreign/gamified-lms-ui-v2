"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Body = dynamic(() => import("@/components/body"), { ssr: false });
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { createVideo } from "@/lib/api/videos"; // ✅ API function for creating a video
import dynamic from "next/dynamic";

// Extract YouTube Video ID
const getYouTubeId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [videoId, setVideoId] = useState(null);

  // Watch YouTube Link
  const youtubeLink = watch("link");

  // Update YouTube Thumbnail
  const handleLinkChange = (e) => {
    const link = e.target.value;
    setValue("link", link);
    setVideoId(getYouTubeId(link));
  };

  // ✅ React Query Mutation for Creating Video
  const mutation = useMutation({
    mutationFn: createVideo,
    onSuccess: () => {
      toast.success("Video added successfully.");
      router.push("/videos");
    },
    onError: () => {
      toast.error("Failed to add video.");
    },
  });

  const onSubmit = (data) => {
    if (!videoId) {
      toast.error("Invalid YouTube link.");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Videos", href: "/videos" },
          { label: "Create" },
        ]}
      />

      {/* Video Upload Form */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Video Name */}
          <div>
            <Label htmlFor="name">Video Name</Label>
            <Input
              id="name"
              placeholder="Enter video name"
              {...register("name", { required: "Video name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Video Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* YouTube Link */}
          <div>
            <Label htmlFor="link">YouTube Link</Label>
            <Input
              id="link"
              placeholder="Enter YouTube video link"
              {...register("link", {
                required: "YouTube link is required",
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                  message: "Enter a valid YouTube link",
                },
              })}
              onChange={handleLinkChange}
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link.message}</p>
            )}
          </div>

          {/* Video Thumbnail Preview */}
          {videoId && (
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="YouTube Thumbnail"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Video"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
