"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchStudentById, updateStudent } from "@/lib/api/students";
import { fetchTeachers } from "@/lib/api/teachers";
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

export default function UpdateStudentPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");

  const {
    data: student,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => fetchStudentById(studentId),
    enabled: !!studentId,
    onError: () => toast.error("Failed to fetch student data."),
  });

  const { data: teachers = [], isLoading: loadingTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  useEffect(() => {
    if (student) {
      reset({
        username: student.username || "",
        password: "",
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        middleName: student.middleName || "",
        age: student.age ? String(student.age) : "",
        gender: student.gender || "",
        address: student.address || "",
        uniqueId: student.uniqueId || "",
        teacherId: student.teacherId ? String(student.teacherId) : "",
      });

      setTimeout(() => {
        if (student.gender) {
          setValue("gender", student.gender, { shouldValidate: true });
        }
        if (student.teacherId) {
          setValue("teacherId", String(student.teacherId), {
            shouldValidate: true,
          });
        }
      }, 0);
    }
  }, [student, reset, setValue]);

  const mutation = useMutation({
    mutationFn: ({ studentId, data }) => updateStudent({ studentId, data }),
    onSuccess: () => {
      toast.success("Student updated successfully.");
      router.push("/students");
    },
    onError: () => toast.error("Failed to update student."),
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age, 10),
      role: "Student",
    };

    if (!data.password) delete formattedData.password;

    mutation.mutate({ studentId, data: formattedData });
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Students", href: "/students" },
          { label: "Update" },
        ]}
      />

      <div className="flex flex-1 flex-col items-center p-6">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-600" />
            <p className="ml-2 text-gray-600">Loading student details...</p>
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load student details.
          </p>
        )}

        {!isLoading && !isError && student && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Username & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
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
                  {...register("password")}
                  placeholder="Enter new password (optional)"
                />
              </div>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
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
                <Input id="middleName" {...register("middleName")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
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
                  {...register("age", { required: true })}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs">Age is required</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Gender</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("gender", value, { shouldValidate: true })
                  }
                  value={watch("gender")}
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
              </div>
            </div>

            {/* Address & Teacher Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <Label>Assign Teacher</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("teacherId", value, { shouldValidate: true })
                  }
                  value={watch("teacherId")}
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
                      <SelectItem key={teacher.id} value={String(teacher.id)}>
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update Student"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Body>
  );
}
