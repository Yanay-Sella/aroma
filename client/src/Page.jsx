import React from "react";

const Page = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-start  bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen pb-5">
      {children}
    </main>
  );
};

export default Page;
