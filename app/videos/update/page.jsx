"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Function to extract YouTube video ID
const getYouTubeId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};

// Dummy Existing Video Data
const existingVideo = {
  name: "Mastering UI/UX Design",
  description: "A deep dive into UI design principles and best practices.",
  link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  status: "unlocked", // "locked" or "unlocked"
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: existingVideo, // Prefill form with existing data
  });

  const [videoId, setVideoId] = useState(getYouTubeId(existingVideo.link));

  // Watch for YouTube link changes
  const youtubeLink = watch("link");

  useEffect(() => {
    const id = getYouTubeId(youtubeLink);
    setVideoId(id);
  }, [youtubeLink]);

  const onSubmit = (data) => {
    console.log("Updated Video Data:", data);
    alert("Video material updated successfully!");
  };

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/videos">Videos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Video Update Form */}
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
              className="w-full h-52 object-cover rounded-t-lg"
            />
          )}

          {/* Lock/Unlock Video */}
          <div>
            <Label className="mb-4">Video Status</Label>
            <RadioGroup defaultValue={existingVideo.status}>
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-primary text-white">
              Update Video
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
