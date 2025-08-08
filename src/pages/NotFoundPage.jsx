import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-500">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
      <div className="mt-8">
        {/* Optional: Add a fun illustration or Lottie animation here */}
        <svg
          className="mx-auto w-40 h-40"
          viewBox="0 0 512 512"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="256" cy="256" r="256" fill="#F3F4F6" />
          <ellipse cx="256" cy="350" rx="120" ry="30" fill="#E5E7EB" />
          <rect
            x="176"
            y="180"
            width="160"
            height="100"
            rx="20"
            fill="#A7F3D0"
          />
          <circle cx="216" cy="220" r="10" fill="#059669" />
          <circle cx="296" cy="220" r="10" fill="#059669" />
          <rect x="220" y="250" width="72" height="10" rx="5" fill="#059669" />
        </svg>
      </div>
    </div>
  );
}
