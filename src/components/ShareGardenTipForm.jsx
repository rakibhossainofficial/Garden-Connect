import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// Example categories (customize as needed)
const categories = [
  "Composting",
  "Plant Care",
  "Vertical Gardening",
  "Hydroponics",
  "Balcony Gardening",
  "Other",
];

// Zod schema for validation
const tipSchema = z.object({
  title: z.string().min(5, { message: "Title is required (min 5 chars)" }),
  plantType: z.string().min(2, { message: "Plant type/topic is required" }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    message: "Select difficulty",
  }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  imageUrl: z
    .string()
    .url({ message: "Invalid image URL" })
    .optional()
    .or(z.literal("")),
  category: z.enum(categories, { message: "Select a category" }),
  availability: z.enum(["Public", "Hidden"], {
    message: "Select availability",
  }),
  userName: z.string(),
  userEmail: z.string().email(),
});

export default function ShareGardenTipForm() {
  const { user } = useAuth(); // Assuming you have a useAuth hook to get user info
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      userName: user?.displayName || "",
      userEmail: user?.email || "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.imageUrl) delete data.imageUrl;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, totalLiked: 0 }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit tip");
      }
      // Optionally show a toast or success message here
      toast.success("Tip shared successfully!");
      navigate("/my-tips");
      reset();
    } catch (err) {
      // Optionally show an error toast/message here
      console.error(err);
      toast.error("Failed to share tip.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 py-8">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Share a Garden Tip
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g., How I Grow Tomatoes Indoors"
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Plant Type/Topic</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Tomatoes"
              className={`input input-bordered w-full ${
                errors.plantType ? "input-error" : ""
              }`}
              {...register("plantType")}
            />
            {errors.plantType && (
              <p className="text-error text-sm mt-1">
                {errors.plantType.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Difficulty Level</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.difficulty ? "select-error" : ""
              }`}
              {...register("difficulty")}
            >
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="text-error text-sm mt-1">
                {errors.difficulty.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Describe your tip in detail..."
              className={`textarea textarea-bordered w-full ${
                errors.description ? "textarea-error" : ""
              }`}
              rows={4}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
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
              <span className="label-text">Category</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.category ? "select-error" : ""
              }`}
              {...register("category")}
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-error text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Availability</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.availability ? "select-error" : ""
              }`}
              {...register("availability")}
            >
              <option value="">Select</option>
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
            {errors.availability && (
              <p className="text-error text-sm mt-1">
                {errors.availability.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                {...register("userName")}
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-gray-100"
                {...register("userEmail")}
                readOnly
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Share Tip"}
          </button>
        </form>
      </div>
    </div>
  );
}
