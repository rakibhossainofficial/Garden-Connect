import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth"; // Adjust the import path as needed
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function MyTipsTable() {
  const { user } = useAuth();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(tips);

  useEffect(() => {
    if (!user?.email) {
      setTips([]);
      setLoading(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/tips?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter tips by current user's email
        const myTips = data.filter((tip) => tip.userEmail === user.email);
        setTips(myTips);
        setLoading(false);
      })
      .catch((err) => {
        setTips([]);
        console.log(err);
        setLoading(false);
      });
  }, [user?.email]);

  // Handler for update button
  const handleUpdate = (id, e) => {
    e.stopPropagation();
    navigate(`/update-tip/${id}`);
  };

  // Handler for delete button with react-hot-toast confirm alert
  const handleDelete = (id, e) => {
    e.stopPropagation();
    toast.custom((t) => (
      <div className="bg-white rounded shadow-lg p-4 flex flex-col gap-3 border border-gray-200">
        <span className="text-gray-800">
          Are you sure you want to delete this tip?
        </span>
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-sm btn-error"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_URL}/tips/${id}`,
                  { method: "DELETE" }
                );
                if (!response.ok) {
                  throw new Error("Failed to delete tip");
                }
                setTips((prev) =>
                  prev.filter((tip) => tip.id !== id && tip._id !== id)
                );
                toast.success("Tip deleted!");
              } catch (err) {
                toast.error("Failed to delete tip!");
                console.error(err);
              }
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner w-[50vh]"></span>
      </div>
    );

  if (!tips.length)
    return (
      <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
        You have not shared any garden tips yet.
      </div>
    );

  return (
    <div className="overflow-x-auto p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Garden Tips</h2>
      <table className="table w-full bg-gray-100">
        <thead>
          <tr>
            <th>Title</th>
            <th>Plant Type</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Image</th>
            <th>Availability</th>
            <th>Likes</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip, idx) => (
            <tr
              key={tip?._id || idx}
              className="cursor-pointer hover:bg-green-100 transition"
              onClick={() => navigate(`/tips-details/${tip._id}`)}
            >
              <td>{tip.title}</td>
              <td>{tip.plantType}</td>
              <td>{tip.difficulty}</td>
              <td>{tip.category}</td>
              <td>
                {tip.imageUrl ? (
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td>{tip.availability}</td>
              <td className="flex items-center gap-1">
                <FaRegThumbsUp />
                <span>{tip.totalLiked || 0}</span>
              </td>
              <td
                onClick={(e) => handleUpdate(tip._id, e)}
                className="text-blue-600 hover:text-blue-800"
              >
                <button
                  className="btn btn-ghost btn-xs flex items-center gap-1"
                  type="button"
                  title="Update"
                >
                  <FaEdit />
                  <span className="hidden md:inline">Update</span>
                </button>
              </td>
              <td
                onClick={(e) => handleDelete(tip._id, e)}
                className="text-red-600 hover:text-red-800"
              >
                <button
                  className="btn btn-ghost btn-xs flex items-center gap-1"
                  type="button"
                  title="Delete"
                >
                  <FaTrash />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
