import React from "react";

const Page = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-950 h-screen">
      {children}
    </main>
  );
};

export default Page;
