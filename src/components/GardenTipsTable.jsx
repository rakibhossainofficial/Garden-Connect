import React, { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function GardenTipsTable() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tips?excludeEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        setTips([]);
        console.error("Failed to fetch garden tips:", err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleLike = async (e, id) => {
    e.stopPropagation();
    setTips((prevTips) =>
      prevTips.map((tip) =>
        tip._id === id ? { ...tip, totalLiked: (tip.totalLiked || 0) + 1 } : tip
      )
    );
    setLiked((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/like/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ increment: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update like");
      }
      const data = await response.json();
      setTips((prevTips) =>
        prevTips.map((tip) =>
          tip._id === id ? { ...tip, totalLiked: data.totalLiked } : tip
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Filter tips based on selected difficulty
  const filteredTips =
    difficultyFilter === "All"
      ? tips
      : tips.filter((tip) => tip.difficulty === difficultyFilter);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner w-[50vh]"></span>
      </div>
    );

  if (!filteredTips.length)
    return (
      <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
        No garden tips found.
      </div>
    );

  return (
    <div className="overflow-x-auto p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">All Garden Tips</h2>
        <select
          className="select select-bordered select-sm"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>
      <table className="table w-full bg-gray-100">
        <thead>
          <tr>
            <th>Title</th>
            <th>Plant Type</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Image</th>
            <th>User</th>
            <th>Availability</th>
            <th>Like</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredTips.map((tip, idx) => (
            <tr
              key={idx}
              className="cursor-pointer hover:bg-green-100 transition"
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
              <td>
                <div>
                  <div className="font-semibold">{tip.userName}</div>
                  <div className="text-xs text-gray-500">{tip.userEmail}</div>
                </div>
              </td>
              <td>{tip.availability}</td>
              <td>
                <button
                  className={`btn btn-ghost btn-xs flex items-center gap-1 ${
                    liked[tip._id] ? "text-primary" : ""
                  }`}
                  onClick={(e) => handleLike(e, tip._id)}
                  aria-label="Like this tip"
                  type="button"
                  disabled={liked[tip._id]}
                >
                  <FaRegThumbsUp />
                  <span>{tip.totalLiked || 0}</span>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-info btn-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tips-details/${tip._id}`);
                  }}
                  type="button"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
