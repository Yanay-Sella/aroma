import React from "react";

const Page = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center bg-black min-h-screen">
      {children}
    </main>
  );
};

export default Page;
