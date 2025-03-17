"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/users"; // ✅ API function to fetch leaderboard
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCrown } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const Body = dynamic(() => import("@/components/body"), { ssr: false });

// Medal Colors
const medalColors = [
  "border-yellow-400 text-yellow-400",
  "border-gray-400 text-gray-400",
  "border-orange-400 text-orange-400",
];

export default function LeaderboardPage() {
  // Fetch users from API
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchUsers,
  });

  // Sort users by score (highest first)
  const sortedUsers = users?.sort((a, b) => b.expPoints - a.expPoints) || [];

  // Top 3 users for medals
  const topUsers = sortedUsers.slice(0, 3);

  // Remaining users for the leaderboard table
  const leaderboardTable = sortedUsers.slice(3);

  return (
    <Body>
      {/* Header */}
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Leaderboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Leaderboard Section */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        <h2 className="text-xl font-bold text-center">Leaderboard</h2>

        {/* Loading & Error Handling */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load leaderboard.
          </p>
        )}

        {/* Top 3 Winners */}
        {!isLoading && users && (
          <div className="flex items-end justify-center gap-6 mt-6">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className={`relative flex flex-col items-center p-4 rounded-lg border ${
                  medalColors[index]
                } ${index === 0 ? "scale-110" : "scale-100"}`}
              >
                {/* Crown for the First Place */}
                {index === 0 && (
                  <FaCrown className="absolute -top-6 text-yellow-400 text-3xl" />
                )}

                {/* User Avatar */}
                <img
                  src={user.profileUrl || "/user.png"}
                  alt={user.username}
                  className="w-20 h-20 rounded-full border-4"
                />

                {/* Username & Score */}
                <p className="mt-2 font-semibold text-lg">{user.username}</p>
                <p className="text-xl font-bold">{user.expPoints} XP</p>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Table */}
        {!isLoading && users && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead className="w-1/3">Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardTable.map((user, index) => (
                <TableRow key={user.id}>
                  {/* Rank */}
                  <TableCell className="font-bold">{index + 4}</TableCell>

                  {/* Player Info */}
                  <TableCell className="flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                      {user.username.charAt(0)}
                    </div>
                    <p>{user.username}</p>
                  </TableCell>

                  {/* Score */}
                  <TableCell className="text-right font-bold">
                    {user.expPoints} XP
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Body>
  );
}
