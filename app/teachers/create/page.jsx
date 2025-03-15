"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createTeacher } from "@/lib/api/teachers";
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

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success("Teacher created successfully.");
      router.push("/teachers");
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.error("Error", {
          description: "Some field already exists!",
        });
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age, 10),
      role: "Teacher",
    };

    mutation.mutate(formattedData);
  };

  return (
    <Body>
      <Header
        breadcrumbs={[
          { label: "Teachers", href: "/teachers" },
          { label: "Create" },
        ]}
      />

      <div className="flex flex-1 flex-col items-center p-6">
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
                {...register("gender", { required: "Gender is required" })}
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
                <p className="text-red-500 text-xs">{errors.gender?.message}</p>
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

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Teacher"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Body>
  );
}
