"use client";

import { useState } from "react";
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

// Function to extract YouTube video ID
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

  const [videoId, setVideoId] = useState(null);

  // Watch for changes in the YouTube link field
  const youtubeLink = watch("link");

  // Update preview when link changes
  const handleLinkChange = (e) => {
    const link = e.target.value;
    setValue("link", link);
    const id = getYouTubeId(link);
    setVideoId(id);
  };

  const onSubmit = (data) => {
    console.log("Submitted Video Data:", data);
    alert("Video material added successfully!");
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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Video Upload Form */}
      <div className="flex flex-1 flex-col gap-4 p-6 ">
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
            <Button type="submit" className="bg-primary text-white">
              Add Video
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
