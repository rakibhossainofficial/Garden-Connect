import Lottie from "lottie-react";
import contactAnimation from "../assets/contact-lottie.json";
export default function ContactSection() {
  return (
    <section className="min-h-[60vh] flex flex-col md:flex-row items-center justify-center bg-base-200 py-10 px-4">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Lottie
          animationData={contactAnimation}
          loop
          autoplay
          style={{ height: 320, width: 320 }}
          aria-label="Contact Animation"
        />
      </div>
      {/* Contact Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Contact Us
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            alert("Thank you for reaching out!");
          }}
        >
          <div>
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="How can we help you?"
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4 text-sm">
          We typically respond within 1-2 business days.
        </div>
      </div>
    </section>
  );
}
