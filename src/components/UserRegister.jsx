import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLoginButton from "./GoogleLogin";
import { Link } from "react-router";

// Zod schema for validation
const registrationSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    imageUrl: z
      .string()
      .url({ message: "Invalid image URL" })
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function UserRegister() {
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, password, imageUrl } = data;
    try {
      // Create user in authentication system (e.g., Firebase)
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: imageUrl });

      // Save user to backend database
      const userPayload = {
        name,
        email,
        imageUrl,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });
      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      toast.success("Account created successfully!");
      reset();
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Image URL (optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className={`input input-bordered w-full ${
                errors.imageUrl ? "input-error" : ""
              }`}
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-error text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`input input-bordered w-full ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
        <GoogleLoginButton />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
