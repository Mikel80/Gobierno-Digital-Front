import React from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      {children}
      <Footer />
    </div>
  );
}
