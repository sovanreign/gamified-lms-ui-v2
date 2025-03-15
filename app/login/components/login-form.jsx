"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const decoded = jwtDecode(data.access_token);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", decoded.id);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);

      router.push("/home");
    },
    onError: () => {
      reset();
      setError("username", {
        type: "manual",
        message: "Incorrect username or password",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, data);

      const decoded = jwtDecode(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("id", decoded.id);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);

      router.push("/home");
    } catch (error) {
      console.log(error);

      reset(); // Reset form fields

      setError("username", {
        type: "manual",
        message: "Incorrect username or password",
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Please login to your account to continue
            </p>
          </div>

          <div className="grid gap-6">
            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
