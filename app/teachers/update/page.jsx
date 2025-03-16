"use client";

import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchTeacherById, updateTeacher } from "@/lib/api/teachers";
const Body = dynamic(() => import("@/components/body"), { ssr: false });
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
import dynamic from "next/dynamic";

function TeacherUpdatePage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const params = useSearchParams();
  const teacherId = params.get("teacherId");

  const {
    data: teacher,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => fetchTeacherById(teacherId),
    enabled: !!teacherId, // Fetch only if `teacherId` exists
    onError: () => toast.error("Failed to fetch teacher data."),
  });

  useEffect(() => {
    if (teacher) {
      reset({
        ...teacher,
        password: "",
        gender: teacher.gender || "",
      });

      setTimeout(() => {
        if (teacher.gender) {
          setValue("gender", teacher.gender, { shouldValidate: true });
        }
      }, 0); // Delay to ensure state updates
    }
  }, [teacher, reset, setValue]);

  const mutation = useMutation({
    mutationFn: ({ teacherId, data }) => updateTeacher({ teacherId, data }),
    onSuccess: () => {
      toast.success("Teacher updated successfully.");
      router.push("/teachers");
    },
    onError: (error) => {
      toast.error("Failed to update teacher. Please try again."),
        console.log(error);
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age, 10),
      role: "Teacher",
    };

    if (!formattedData.password) {
      delete formattedData.password;
    }

    mutation.mutate({ teacherId, data: formattedData });
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Teachers", href: "/teachers" },
          { label: "Update" },
        ]}
      />

      <div className="flex flex-1 flex-col items-center p-6">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-600" />
            <p className="ml-2 text-gray-600">Loading teacher details...</p>
          </div>
        )}

        {/* Show Error if Fetching Fails */}
        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load teacher details.
          </p>
        )}

        {!isLoading && !isError && teacher && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                  placeholder="Enter new password (optional)"
                  {...register("password")}
                />
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

            {/* Middle Name & Teacher ID */}
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
                <Label htmlFor="teacherId">Teacher ID</Label>
                <Input
                  id="teacherId"
                  placeholder="Enter teacher ID"
                  {...register("uniqueId", {
                    required: "Teacher ID is required",
                  })}
                />
                {errors.uniqueId && (
                  <p className="text-red-500 text-xs">
                    {errors.uniqueId.message}
                  </p>
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
                  value={watch("gender") || ""} // Ensure controlled value updates
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
                  <p className="text-red-500 text-xs">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  <p className="text-red-500 text-xs">Invalid email format</p>
                )}
              </div>
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
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Teacher"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Body>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <TeacherUpdatePage />
    </Suspense>
  );
}
