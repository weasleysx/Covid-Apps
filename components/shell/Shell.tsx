// Shell.jsx
import React from "react";
import Footer from "./Footer/Footer";
import Dashboard from "../dashboard";
type Props = {
  children: JSX.Element;
};

export default function Shell({ children }: Props) {
  return (
    <>
      <div className="hidden h-screen md:grid grid-cols-custom-sidenav-layout">
        {/* <main>{children}</main> */}
        <main>
          <Dashboard />
          </main>
      </div>
      <Footer />
    </>
  );
}
