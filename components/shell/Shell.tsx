// Shell.jsx
import React from "react";
import Footer from "./Footer/Footer";
import Dashboard from "../dashboard";


export default function Shell() {
  return (
    <>
      <div className="h-screen md:grid grid-cols-custom-sidenav-layout">
        <main>
          <Dashboard />
        </main>
        <Footer />
       
      </div>
    </>
  );
}
