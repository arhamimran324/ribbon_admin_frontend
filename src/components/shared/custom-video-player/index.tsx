import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

import Iconify from "../iconify";
import { Typography } from "../typography";

const CustomVideoPlayer = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(
    "https://www.youtube.com/watch?v=mFdV09ieqSs",
  );

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-center text-center">
        <button className="cursor-pointer flex items-center gap-2">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex items-center gap-1"
          >
            <Iconify icon="mingcute:edit-2-fill" className="text-blue" />
            <Typography size="lg" className=" text-blue font-semibold">
              Edit
            </Typography>
          </label>
        </button>
      </div>
      {
        <div className="relative rounded-xl overflow-hidden">
          {videoUrl ? (
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              progressInterval={100}
              width="100%"
              height="auto"
              style={{
                objectFit: "cover",
              }}
              controls
            />
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex items-center justify-center w-[90%] h-[380px] rounded-lg border border-light-gray text-gray">
                No video
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default CustomVideoPlayer;
