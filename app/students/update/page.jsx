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
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const studentData = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
  age: "",
  gender: "",
  address: "",
  uniqueId: "",
  teacherId: "",
};

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: studentData,
  });

  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");

  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;

      try {
        const response = await axios.get(`${API_URL}/api/users/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { password, ...studentData } = response.data; // Exclude password
        Object.keys(studentData).forEach((key) =>
          setValue(key, studentData[key])
        );

        // Set teacherId explicitly if it exists
        if (studentData.teacherId) {
          setValue("teacherId", String(studentData.teacherId), {
            shouldValidate: true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudent();
  }, [studentId, setValue]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users?role=Teacher`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachers(response.data);
      } catch (err) {
        console.log("Failed to fetch teachers", err);
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const onSubmit = async (data) => {
    let updatedData = { ...data };

    // Remove password if empty
    if (!data.password) {
      const { password, ...filteredData } = data;
      updatedData = filteredData;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/users/${studentId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/students"); // Redirect after successful update
      }
    } catch (error) {
      alert("Failed to update student. Please try again.");
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
              <BreadcrumbLink href="/students">Students</BreadcrumbLink>
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

          <div className="space-y-1">
            <Label>Assign Teacher</Label>
            <Select
              value={watch("teacherId") || ""} // Ensure default value is properly set
              {...register("teacherId", {})}
              onValueChange={(value) =>
                setValue("teacherId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingTeachers ? "Loading teachers..." : "Select a teacher"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.teacherId && (
              <p className="text-red-500 text-sm">Teacher is required</p>
            )}
          </div>

          {/* Student ID */}
          <div className="space-y-1">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="Enter student ID"
              {...register("uniqueId", { required: true })}
            />
            {errors.uniqueId && (
              <p className="text-red-500 text-sm">Student ID is required</p>
            )}
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => reset(studentData)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Update Student
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
