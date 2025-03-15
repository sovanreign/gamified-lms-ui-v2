"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchTeachers } from "@/lib/api/teachers";
import { createStudent } from "@/lib/api/students";
import Body from "@/components/body";
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
import { Loader2 } from "lucide-react";
import Header from "@/components/header";
import { toast } from "sonner";

export default function CreateStudentPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { data: teachers = [], isLoading: loadingTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      toast.success("Student added successfully!");
      router.push("/students");
    },
    onError: (error) => {
      toast.error("Failed to add student. Please try again.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      age: parseInt(data.age, 10),
      role: "Student",
    });
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Students", href: "/students" },
          { label: "Create" },
        ]}
      />

      <div className="flex flex-1 flex-col items-center p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full ">
          {/* Username & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs">Username is required</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
            </div>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">First name is required</p>
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
                <p className="text-red-500 text-xs">Last name is required</p>
              )}
            </div>
          </div>

          {/* Middle Name & Student ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                placeholder="Enter middle name"
                {...register("middleName")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter student ID"
                {...register("uniqueId", { required: true })}
              />
              {errors.uniqueId && (
                <p className="text-red-500 text-xs">Student ID is required</p>
              )}
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                {...register("age", { required: true })}
              />
              {errors.age && (
                <p className="text-red-500 text-xs">Age is required</p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Gender</Label>
              <Select
                {...register("gender", { required: true })}
                onValueChange={(value) =>
                  setValue("gender", value, { shouldValidate: true })
                }
                defaultValue={watch("gender")}
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
                <p className="text-red-500 text-xs">Gender is required</p>
              )}
            </div>
          </div>

          {/* Address & Teacher Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">Address is required</p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Assign Teacher</Label>
              <Select
                {...register("teacherId", { required: true })}
                onValueChange={(value) =>
                  setValue("teacherId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingTeachers
                        ? "Loading teachers..."
                        : "Select a teacher"
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
                <p className="text-red-500 text-xs">Teacher is required</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Student"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
