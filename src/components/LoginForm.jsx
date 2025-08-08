import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLoginButton from "./GoogleLogin";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/, {
      message:
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a special character",
    }),
});
export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Successfully logged in!");
      navigate("/"); // Redirect to dashboard after successful login
    } catch (error) {
      // Handle login error
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
      // You can show an error message to the user here
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <GoogleLoginButton />
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
