import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

export function UpcomingEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual events API endpoint
    fetch(`${import.meta.env.VITE_API_URL}/events?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[120px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!events.length)
    return (
      <div className="flex justify-center items-center min-h-[120px] text-lg font-semibold text-gray-500">
        No upcoming events found.
      </div>
    );

  return (
    <section className="bg-white rounded shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700 flex items-center justify-center gap-2">
        <FaCalendarAlt className="text-purple-600" /> Upcoming Gardening Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event._id || event.id}
            className="bg-gray-50 rounded-lg p-4 hover:shadow transition"
          >
            <div className="font-semibold text-gray-800 mb-1">
              {event.title}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {event.date
                ? new Date(event.date).toLocaleDateString()
                : "Date TBA"}{" "}
              • {event.location || "Online"}
            </div>
            <div className="text-sm text-gray-600 line-clamp-2 mb-2">
              {event.description}
            </div>
            <a
              href={"#"}
              className="btn btn-xs btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
