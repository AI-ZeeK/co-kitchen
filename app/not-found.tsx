import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="border-black border-2 p-8 flex flex-col gap-8 justify-center items-center max-w-[40rem]">
        <h2 className="sm:text-8xl text-6xl">404</h2>
        <h4 className="text-2xl sm:text-5xl">Page Not Found</h4>
        <p className="text-center">
          The page you are looking for doesn't exist or has been moved
        </p>
        <Link
          href="/"
          className="p-4 w-full transition-all bg-black hover:bg-white text-white hover:text-black flex justify-center items-center border-2 cursor-pointer border-black"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
