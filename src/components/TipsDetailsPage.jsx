import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaRegThumbsUp, FaArrowLeft } from "react-icons/fa";

export default function TipDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // const found = data.find((t) => String(t.id) === String(id));
        // setTip(found || null);
        setTip(data || null);
        setLoading(false);
      })
      .catch(() => {
        setTip(null);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    if (liked) return;
    setTip((prev) => ({
      ...prev,
      totalLiked: (prev?.totalLiked || 0) + 1,
    }));
    setLiked(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!tip)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Tip Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-4 border border-gray-200">
        <button
          className="btn btn-ghost mb-6 text-gray-700 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            {tip.imageUrl ? (
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-64 h-64 object-cover rounded border border-gray-300"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900">
                {tip.title}
              </h2>
              <div className="mb-3 flex flex-wrap gap-3">
                <span className="badge badge-success">{tip.category}</span>
                <span className="badge badge-info">{tip.difficulty}</span>
                <span
                  className={`badge ${
                    tip.availability === "Public"
                      ? "badge-primary"
                      : "badge-secondary"
                  }`}
                >
                  {tip.availability}
                </span>
              </div>
              <p className="mb-5 text-gray-700">{tip.description}</p>
              <div className="mb-3">
                <span className="font-semibold text-gray-800">
                  Plant Type/Topic:
                </span>{" "}
                <span className="text-gray-900">{tip.plantType}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-800">Shared by:</span>{" "}
                <span className="text-gray-900">{tip.userName}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({tip.userEmail})
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                className={`btn btn-ghost btn-sm flex items-center gap-2 ${
                  liked ? "text-primary" : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={handleLike}
                disabled={liked}
                aria-label="Like this tip"
                type="button"
              >
                <FaRegThumbsUp />
                <span>{tip.totalLiked || 0}</span>
              </button>
              <span className="text-gray-600 text-sm">
                {liked ? "You liked this tip" : "Like this tip"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
