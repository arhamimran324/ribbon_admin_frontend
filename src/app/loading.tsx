import Image from "next/image";
import React, { FC } from "react";

const Loading: FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        zIndex: 9999,
      }}
    >
      <div>
        <Image
          src="/assets/gif/loader.gif"
          alt="Loader"
          width="125"
          height="125"
        />
      </div>
    </div>
  );
};
export default Loading;
