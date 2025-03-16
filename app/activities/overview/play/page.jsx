"use client";

import { fetchActivityById } from "@/lib/api/activities";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CountTheFruit from "./components/count-the-fruit";
import FindMissingLetter from "./components/find-the-missing-letter";
import NameTheColor from "./components/name-the-color";

export default function Page() {
  const searchParam = useSearchParams();
  const activityId = searchParam.get("activityId");

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activity", activityId], // Ensure uniqueness
    queryFn: () => fetchActivityById(activityId),
    enabled: !!activityId, // Prevents running query if no activityId
  });

  const loadContent = () => {
    switch (activity.content) {
      case "count-the-fruit":
        return <CountTheFruit />;
      case "find-the-missing-letter":
        return <FindMissingLetter />;
      case "name-the-color":
        return <NameTheColor />;
      default:
        return "No Game Displayed";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading activity...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load activity.
      </div>
    );
  }

  return <div className="p-6">{loadContent()}</div>;
}
