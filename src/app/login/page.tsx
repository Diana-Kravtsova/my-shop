"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LoginCredentials } from "@/lib/api";

type LoginFormInputs = LoginCredentials;

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(data.username, data.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-4 pt-8 text-center">
          <div className="flex justify-center">
            <Link href="/" className="from-primary to-primary/60 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-xl transition-transform hover:scale-110">
              <User className="h-7 w-7 text-white" />
            </Link>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-zinc-500">
              Login to your account
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive rounded-lg border border-destructive/20 p-3 text-center text-sm font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="emilys"
                className={cn(errors.username && "border-destructive")}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p className="text-destructive text-xs">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={cn(errors.password && "border-destructive")}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-4 pb-8">
            <Button type="submit" className="w-full gap-2 py-6 text-lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              Sign In
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Don't have an account?{" "}
              <Link href="/" className="text-primary hover:underline font-semibold">
                Start browsing
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
