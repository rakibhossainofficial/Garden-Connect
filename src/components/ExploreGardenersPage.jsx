import React, { useEffect, useState } from "react";

export default function ExploreGardenersPage() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
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
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">
        No gardeners found.
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        Explore Gardeners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id || gardener.email}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <img
              src={
                gardener.image ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(gardener.name || "Gardener")
              }
              alt={gardener.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-green-400 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {gardener.name}
            </h3>
            <p className="text-gray-500 mb-2">{gardener.location}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="badge badge-info">{gardener.gender}</span>
              <span className="badge badge-success">{gardener.status}</span>
              <span className="badge badge-ghost">{gardener.age} yrs</span>
            </div>
            <p className="text-sm text-gray-600 mb-1 text-center">
              <span className="font-semibold">Experience:</span>{" "}
              {gardener.experiences}
            </p>
            <p className="text-sm text-gray-600 mb-1 text-center">
              <span className="font-semibold">Specialty:</span>{" "}
              {gardener.specialty}
            </p>
            <p className="text-green-700 font-semibold mb-1">
              Shared Tips: {gardener.totalSharedTips}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
