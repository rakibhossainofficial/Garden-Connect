import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
// import { useNavigate } from "react-router";

export default function FeaturedGardenersSection() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/active-users`)
      .then((res) => res.json())
      .then((data) => {
        setGardeners(data);
        setLoading(false);
      })
      .catch(() => {
        setGardeners([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner w-[50vh]"></span>
      </div>
    );

  if (!gardeners.length)
    return (
      <div className="flex justify-center items-center min-h-[180px] text-lg font-semibold text-gray-500">
        No featured gardeners found.
      </div>
    );

  return (
    <section className="bg-white rounded shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2 justify-center">
        <FaUserFriends className="text-green-600" /> Featured Gardeners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id || gardener.id || gardener.email}
            className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={
                gardener.image ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(gardener.name || "Gardener")
              }
              alt={gardener.name}
              className="w-20 h-20 object-cover rounded-full border-2 border-green-400 mb-2"
            />
            <div className="font-semibold text-gray-800 text-lg">
              {gardener.name}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {gardener.location}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="badge badge-info">{gardener.gender}</span>
              <span className="badge badge-success">{gardener.status}</span>
              <span className="badge badge-ghost">{gardener.age} yrs</span>
            </div>
            {gardener.experiences && (
              <div className="text-sm text-gray-600 mb-1 text-center">
                <span className="font-semibold">Experience:</span>{" "}
                {gardener.experiences}
              </div>
            )}
            {gardener.specialty && (
              <div className="text-sm text-gray-600 mb-1 text-center">
                <span className="font-semibold">Specialty:</span>{" "}
                {gardener.specialty}
              </div>
            )}
            <div className="text-green-700 font-semibold mb-1">
              Shared Tips: {gardener.totalSharedTips}
            </div>
            {/* Optional: Add a button to view more details */}
            {/* <button
              className="btn btn-xs btn-info"
              onClick={() => navigate(`/gardeners/${gardener._id || gardener.id}`)}
              type="button"
            >
              View Profile
            </button> */}
          </div>
        ))}
      </div>
    </section>
  );
}
