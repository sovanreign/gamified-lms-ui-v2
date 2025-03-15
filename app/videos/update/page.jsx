"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Body from "@/components/body";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { fetchVideoById, updateVideo } from "@/lib/api/videos";

// ✅ Extract YouTube Video ID
const getYouTubeId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};

export default function UpdateVideoPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");
  const router = useRouter();
  const [youtubeId, setYouTubeId] = useState(null);

  const {
    data: video,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => {
      return fetchVideoById(videoId);
    },
    enabled: !!videoId,
    onError: () => toast.error("Failed to fetch video data."),
  });

  useEffect(() => {
    if (video) {
      reset({
        name: video.name || "",
        description: video.description || "",
        link: video.link || "",
        status: video.isOpen ? "unlocked" : "locked",
      });

      setYouTubeId(getYouTubeId(video.link)); // Extract & update YouTube ID
    }
  }, [video, reset]);

  // ✅ Handle YouTube link change dynamically
  const handleLinkChange = (e) => {
    const link = e.target.value;
    setValue("link", link);
    setYouTubeId(getYouTubeId(link));
  };

  // ✅ React Query Mutation for updating video
  const mutation = useMutation({
    mutationFn: ({ videoId, data }) => updateVideo({ videoId, data }),
    onSuccess: () => {
      toast.success("Video updated successfully.");
      router.push("/videos");
    },
    onError: () => toast.error("Failed to update video."),
  });

  // ✅ Form submission
  const onSubmit = (data) => {
    if (!youtubeId) {
      toast.error("Invalid YouTube link.");
      return;
    }

    const formattedData = {
      name: data.name,
      description: data.description,
      link: data.link,
      isOpen: data.status === "unlocked", // Convert status to boolean
    };

    mutation.mutate({ videoId, data: formattedData });
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Videos", href: "/videos" },
          { label: "Update" },
        ]}
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-600" />
            <p className="ml-2 text-gray-600">Loading video details...</p>
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-sm">Failed to load video details.</p>
        )}

        {!isLoading && !isError && video && (
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

            {/* Lock/Unlock Video */}
            <div>
              <Label className="mb-4">Video Status</Label>
              <RadioGroup
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value, { shouldValidate: true })
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="unlocked"
                    {...register("status")}
                    id="unlocked"
                  />
                  <Label htmlFor="unlocked">Unlocked</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="locked"
                    {...register("status")}
                    id="locked"
                  />
                  <Label htmlFor="locked">Locked</Label>
                </div>
              </RadioGroup>
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
                    value:
                      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
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
            {youtubeId && (
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt="YouTube Thumbnail"
                className="w-full h-52 object-cover rounded-t-lg"
              />
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Video"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Body>
  );
}
