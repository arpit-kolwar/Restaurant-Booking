"use client";

import Image from "next/image";
import errorImg from "../../icons/error.png";

function Error({ error }: { error: Error }) {
  return (
    <div className=" items-center  flex flex-col h-100 w-100 mt-20 justify-center">
      <h3 className="text-2xl font-bold">An Error Occurred</h3>
      <p className="text-3xl">{error.message}</p>
      <Image src={errorImg} alt="error" />
    </div>
  );
}

export default Error;
