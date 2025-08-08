import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-18.0625rem)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
