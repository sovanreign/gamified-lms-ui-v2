"use client";

import { useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

// Dummy data stored inside the page
const teacherData = {
  username: "johndoe123",
  password: "", // Password is left empty for security reasons
  firstName: "John",
  lastName: "Doe",
  middleName: "Michael",
  age: 35,
  gender: "Male",
  address: "123 Main Street, New York, NY",
  email: "johndoe@example.com",
  teacherId: "TCH-2024-001",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: teacherData,
  });

  const router = useRouter();
  const params = useSearchParams();
  const teacherId = params.get("teacherId");

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!teacherId) return;

      try {
        const response = await axios.get(`${API_URL}/api/users/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const teacherData = response.data;
        Object.keys(teacherData).forEach((key) =>
          setValue(key, teacherData[key])
        );
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      }
    };

    fetchTeacher();
  }, [teacherId, setValue]);

  const onSubmit = async (data) => {
    let { password, ...newData } = data; // Destructure password

    // Remove password from request if it's empty
    if (password) {
      newData = { ...newData, password };
    }
    try {
      const response = await axios.patch(
        `${API_URL}/api/users/${teacherId}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/teachers");
      }
    } catch (error) {
      alert("Failed to update teacher. Please try again.");
      console.log(error);
    }
  };

  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/teachers">Teachers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Username */}
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">Username is required</p>
            )}
          </div>

          {/* Password (Optional) */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password (optional)"
              {...register("password")}
            />
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">First name is required</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">Last name is required</p>
              )}
            </div>
          </div>

          {/* Middle Name */}
          <div className="space-y-1">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              placeholder="Enter middle name"
              {...register("middleName")}
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                {...register("age", { required: true })}
              />
              {errors.age && (
                <p className="text-red-500 text-sm">Age is required</p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Gender</Label>
              <Select
                {...register("gender", { required: "Gender is required" })}
                value={watch("gender")}
                onValueChange={(value) =>
                  setValue("gender", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm">Gender is required</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">Address is required</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Invalid email format</p>
            )}
          </div>

          {/* Teacher ID */}
          <div className="space-y-1">
            <Label htmlFor="teacherId">Teacher ID</Label>
            <Input
              id="teacherId"
              placeholder="Enter teacher ID"
              {...register("uniqueId", { required: true })}
            />
            {errors.uniqueId && (
              <p className="text-red-500 text-sm">Teacher ID is required</p>
            )}
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => reset(teacherData)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Update Teacher
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
