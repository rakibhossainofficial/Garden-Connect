import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Navlinks() {
  const { user } = useAuth();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Explore Gardeners", to: "/explore-gardeners" },
    { label: "Browse Tips", to: "/browse-tips" },
    {
      label: "Share a Garden Tip (Private)",
      to: "/share-garden-tip",
      isPrivate: true,
    },
    { label: "My Tips (Private)", to: "/my-tips", isPrivate: true },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.to} className={link.isPrivate && !user ? "hidden" : ""}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "btn btn-primary btn-sm" // Replace with your active class (e.g., text-primary, font-bold, underline, etc.)
                : ""
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
}
