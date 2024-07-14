'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Circle } from 'react-konva';
import type ReactPlayerType from 'react-player';
import dynamic from 'next/dynamic'

interface Comment {
  x: number;
  y: number;
  text: string;
  time: number;
}

const VideoReviewTool: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentTime, setCurrentTime] = useState(5);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 });
  const playerRef = useRef<ReactPlayerType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleAddComment = (e: any) => {
    e.evt.preventDefault();  // イベントのデフォルト動作を防ぐ
    e.evt.stopPropagation();  // イベントの伝播を停止

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newComment: Comment = {
      x: pointerPosition.x,
      y: pointerPosition.y,
      text: `Comment at ${currentTime.toFixed(2)}s`,
      time: currentTime,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };


  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url="assets/Big_Buck_Bunny_360_10s_1MB.mp4"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        controls={true}  // コントロールを表示
        onError={(e) => console.error('ReactPlayer error:', e)}  // エラーをコンソールに出力
        onReady={() => console.log('ReactPlayer is ready')}  // 準備完了時にログを出力
        config={{ file: {
            attributes: { crossOrigin: "anonymous" }  // CORSエラー対策
          }}}
      />
      <Stage
        width={dimensions.width }
        height={dimensions.height - 60}
        style={{ position: 'absolute', top: 0, left: 0 }}
        onClick={handleAddComment}
      >
        <Layer>
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <Circle x={comment.x} y={comment.y} radius={5} fill="red" />
              <Text
                x={comment.x + 10}
                y={comment.y + 10}
                text={comment.text}
                fontSize={12}
                fill="white"
                stroke="black"
                strokeWidth={0.5}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default VideoReviewTool;
