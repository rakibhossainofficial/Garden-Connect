import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex flex-col items-center">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          About Gardening Community & Resource Hub
        </h1>
        <p className="text-gray-700 mb-6 text-lg text-center">
          Welcome to the Gardening Community & Resource Hub — your digital home
          for everything green! Our mission is to connect gardeners of all
          experience levels, share practical knowledge, and inspire a love for
          plants, sustainability, and community.
        </p>
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          What We Offer
        </h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
          <li>
            <strong>Share & Discover Tips:</strong> Post your own gardening tips
            or browse advice from fellow enthusiasts.
          </li>
          <li>
            <strong>Explore Gardeners:</strong> Connect with local and global
            gardeners, view their profiles, and learn from their experiences.
          </li>
          <li>
            <strong>Ask & Answer Questions:</strong> Get help with plant care,
            composting, hydroponics, and more.
          </li>
          <li>
            <strong>Events & Activities:</strong> Find or host gardening events,
            workshops, and meetups.
          </li>
          <li>
            <strong>Trending & Featured:</strong> See the top trending tips and
            featured active gardeners on the home page.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          Our Vision
        </h2>
        <p className="text-gray-700 mb-6">
          We believe gardening is for everyone. Whether you have a sprawling
          backyard or a small balcony, our platform is here to help you grow,
          learn, and connect. We encourage sustainable practices, knowledge
          sharing, and building a supportive, inclusive gardening community.
        </p>
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          Meet the Team
        </h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
          <li>
            <strong>Developers & Contributors:</strong> This project is built by
            passionate gardeners and developers who love technology and nature.
          </li>
          <li>
            <strong>Community Moderators:</strong> Our moderators help keep the
            platform friendly, informative, and safe for all.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          Contact & Feedback
        </h2>
        <p className="text-gray-700 mb-4">
          Have questions, suggestions, or want to get involved? Reach out to us
          via the contact form, email, or social links in the footer. Your
          feedback helps us grow!
        </p>
        <div className="text-center mt-8">
          <span className="text-green-700 font-semibold">
            Happy Gardening! 🌱
          </span>
        </div>
      </div>
    </div>
  );
}
