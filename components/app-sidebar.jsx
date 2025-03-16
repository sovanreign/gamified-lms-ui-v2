"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  FaHome,
  FaChalkboardTeacher,
  FaChild,
  FaBook,
  FaVideo,
  FaGamepad,
} from "react-icons/fa";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Home",
      url: "/home",
      icon: FaHome,
    },
    {
      name: "Teachers",
      url: "/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      name: "Students",
      url: "/students",
      icon: FaChild,
    },
    {
      name: "Lessons",
      url: "/modules",
      icon: FaBook,
    },
    {
      name: "Videos",
      url: "/videos",
      icon: FaVideo,
    },
    {
      name: "Activities",
      url: "/activities",
      icon: FaGamepad,
    },
  ],
};

const sidebarItemsByRole = {
  Admin: [
    { name: "Home", url: "/home", icon: FaHome },
    { name: "Teachers", url: "/teachers", icon: FaChalkboardTeacher },
    { name: "Students", url: "/students", icon: FaChild },
    { name: "Lessons", url: "/modules", icon: FaBook },
    { name: "Videos", url: "/videos", icon: FaVideo },
    { name: "Activities", url: "/activities", icon: FaGamepad },
  ],
  Teacher: [
    { name: "Home", url: "/home", icon: FaHome },
    { name: "Lessons", url: "/modules", icon: FaBook },
    { name: "Videos", url: "/videos", icon: FaVideo },
    { name: "Activities", url: "/activities", icon: FaGamepad },
  ],
  Student: [
    { name: "Home", url: "/home", icon: FaHome },
    { name: "Lessons", url: "/modules", icon: FaBook },
    { name: "Videos", url: "/videos", icon: FaVideo },
    { name: "Activities", url: "/activities", icon: FaGamepad },
  ],
};

export function AppSidebar({ ...props }) {
  const role = localStorage.getItem("role") || "Student"; // Default to "Student"
  const sidebarItems = sidebarItemsByRole[role] || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Image src="/logo.png" width={32} height={32} alt="logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Malasiqui Adventist School
                  </span>
                  <span className="truncate text-xs">
                    Learning Management System
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
