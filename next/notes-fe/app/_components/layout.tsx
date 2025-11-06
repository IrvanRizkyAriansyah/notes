import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-2.5rem)] pt-25 pb-5 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">{children}</div>
    </main>
      <Footer />
    </>
  );
}
