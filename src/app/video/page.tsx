"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";

const VideoComponent = dynamic(() => import("./Video"), {
  ssr: false,
});

const VideoPage: FC = () => {
  return <VideoComponent />;
};

export default VideoPage;
