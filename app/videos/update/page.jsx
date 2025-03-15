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
import { useSearchParams } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  } = useForm({});

  // Watch for YouTube link changes
  const youtubeLink = watch("link");

  const [videoId, setVideoId] = useState();

  const searchParams = useSearchParams();
  const id = searchParams.get("videoId");

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${API_URL}/api/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const videoData = response.data;
        console.log(videoData);

        // Map backend fields to frontend form
        setValue("name", videoData.name);
        setValue("description", videoData.description);
        setValue("link", videoData.link);
        setValue("status", videoData.isOpen ? "unlocked" : "locked"); // Map isOpen to status

        // Extract & update YouTube video ID
        setVideoId(getYouTubeId(videoData.link));
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, setValue]);

  const onSubmit = async (data) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      link: data.link,
      isOpen: data.status === "unlocked", // Convert "unlocked" to true, "locked" to false
    };

    try {
      const response = await axios.patch(
        `${API_URL}/api/videos/${videoId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Video updated successfully!");
        router.push("/videos"); // Redirect after update
      }
    } catch (error) {
      console.error("Failed to update video:", error);
      alert("Failed to update video. Please try again.");
    }
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
            <RadioGroup>
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
