import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth"; // Adjust the import path as needed
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define categories (customize as needed)
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
});

export default function UpdateTipPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      title: "",
      plantType: "",
      difficulty: "",
      description: "",
      imageUrl: "",
      category: "",
      availability: "",
    },
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTip(data);
        setValue("title", data.title || "");
        setValue("plantType", data.plantType || "");
        setValue("difficulty", data.difficulty || "");
        setValue("description", data.description || "");
        setValue("imageUrl", data.imageUrl || "");
        setValue("category", data.category || "");
        setValue("availability", data.availability || "");

        setLoading(false);
      })
      .catch(() => {
        setTip(null);
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tips/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update tip");
      }
      // Optionally, you can get the updated tip from response:
      // const updatedTip = await response.json();
      toast.success("Tip updated successfully!");
      navigate("/my-tips");
    } catch (err) {
      toast.error("Failed to update tip!");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner w-[50vh]"></span>
      </div>
    );

  if (!tip)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Tip Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 py-8">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-800 flex-1">
            Update Garden Tip
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-gray-700">Title</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">Plant Type/Topic</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">Difficulty Level</span>
            </label>
            <select
              className={`select select-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">Description</span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">
                Image URL (optional)
              </span>
            </label>
            <input
              type="url"
              className={`input input-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">Category</span>
            </label>
            <select
              className={`select select-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
              <span className="label-text text-gray-700">Availability</span>
            </label>
            <select
              className={`select select-bordered w-full bg-gray-50 border-gray-300 text-gray-900 ${
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
                <span className="label-text text-gray-700">User Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 border-gray-300 text-gray-900"
                value={user?.displayName || ""}
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-gray-700">User Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-gray-100 border-gray-300 text-gray-900"
                value={user?.email || ""}
                readOnly
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting || updating}
          >
            {isSubmitting || updating ? "Updating..." : "Update Tip"}
          </button>
        </form>
      </div>
    </div>
  );
}
