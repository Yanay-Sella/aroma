import React from "react";

const Page = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center  bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen">
      {children}
    </main>
  );
};

export default Page;
