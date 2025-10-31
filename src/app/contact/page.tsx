import React from "react";

import Contact from "@/components/blocks/contact";

const Page = () => {
  return (
    <div className="min-h-screen w-full relative bg-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `radial-gradient(circle at top center, rgba(70, 130, 180, 0.5), transparent 70%)`,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">
        <Contact />
      </div>
    </div>
  );
};

export default Page;
