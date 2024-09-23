"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/global/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const result = await res.json();
        router.push("/login");
      }
    } catch (e) {}
  };

  return (
    <div className="min-h-[100dvh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Register for gamerLink
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={handleChange}
                type="text"
                placeholder="Choose a username"
                name="username"
                value={formData.username}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Create a password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Register
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2023 gamerLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
