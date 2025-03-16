"use client";

import { fetchActivityById } from "@/lib/api/activities";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import game components with SSR disabled
const CountTheFruit = dynamic(() => import("./components/count-the-fruit"), {
  ssr: false,
});
const FindMissingLetter = dynamic(
  () => import("./components/find-the-missing-letter"),
  { ssr: false }
);
const NameTheColor = dynamic(() => import("./components/name-the-color"), {
  ssr: false,
});

function ActivityPageContent() {
  const searchParams = useSearchParams(); // ✅ Inside a Client Component
  const activityId = searchParams.get("activityId");

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => fetchActivityById(activityId),
    enabled: !!activityId,
  });

  const loadContent = () => {
    switch (activity?.content) {
      case "count-the-fruit":
        return <CountTheFruit />;
      case "find-the-missing-letter":
        return <FindMissingLetter />;
      case "name-the-color":
        return <NameTheColor />;
      default:
        return <p>No Game Displayed</p>;
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

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <ActivityPageContent />
    </Suspense>
  );
}
