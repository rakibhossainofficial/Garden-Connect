import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function GoogleLoginButton() {
  const { googleLogin, authLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // 1. Google sign-in
      const userCredential = await googleLogin();
      const user = userCredential?.user || userCredential;

      // 2. Prepare user data for backend
      const userPayload = {
        name: user.displayName || "",
        email: user.email,
        imageUrl: user.photoURL || "",
        role: "user",
        createdAt: new Date().toISOString(),
      };

      // 3. Save user to backend database
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      toast.success("Logged in successfully with Google!");
      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center my-6">
      <button
        type="button"
        className="btn btn-outline btn-primary w-full flex items-center gap-2"
        onClick={handleGoogleLogin}
        disabled={authLoading}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 48 48"
          aria-hidden="true"
          focusable="false"
        >
          <g>
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.86-6.86C36.64 2.13 30.7 0 24 0 14.82 0 6.73 5.06 2.69 12.44l8.06 6.26C13.13 13.13 18.18 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.02h12.44c-.54 2.9-2.18 5.36-4.64 7.02l7.18 5.6C43.93 37.13 46.1 31.3 46.1 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.75 28.7a14.5 14.5 0 010-9.4l-8.06-6.26A24.02 24.02 0 000 24c0 3.8.9 7.4 2.69 10.56l8.06-6.26z"
            />
            <path
              fill="#EA4335"
              d="M24 48c6.7 0 12.64-2.13 16.86-5.87l-7.18-5.6c-2.02 1.36-4.6 2.17-7.68 2.17-5.82 0-10.87-3.63-13.25-8.7l-8.06 6.26C6.73 42.94 14.82 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </g>
        </svg>
        {authLoading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}
