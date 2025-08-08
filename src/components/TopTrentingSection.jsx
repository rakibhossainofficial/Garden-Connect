import React, { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function TopTrendingSection() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/limit/tips`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch(() => {
        setTips([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[180px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!tips.length)
    return (
      <div className="flex justify-center items-center min-h-[180px] text-lg font-semibold text-gray-500">
        No trending tips found.
      </div>
    );

  return (
    <section className="py-10 px-4 bg-base-200 rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Top Trending Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tips.map((tip) => (
          <div
            key={tip._id || tip.id}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={
                tip.imageUrl ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(tip.title || "Tip")
              }
              alt={tip.title}
              className="w-28 h-28 object-cover rounded mb-4 border border-green-300"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              {tip.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="badge badge-success">{tip.category}</span>
              <span className="badge badge-info">{tip.difficulty}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2 text-center">
              {tip.description}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <FaRegThumbsUp className="text-green-600" />
              <span className="font-semibold text-green-700">
                {tip.totalLiked || 0}
              </span>
            </div>
            <button
              className="btn btn-sm btn-info mt-auto"
              onClick={() => navigate(`/tips-details/${tip._id || tip.id}`)}
              type="button"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
