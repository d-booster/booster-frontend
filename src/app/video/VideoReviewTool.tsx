'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Circle, Line, Group } from 'react-konva';
import ReactPlayer from 'react-player';
import { Modal, Input } from 'antd';
import Konva from 'konva';
import dynamic from 'next/dynamic';
const DynamicReactPlayer = dynamic(
  () => import('react-player'),
  { ssr: false }, // SSRを無効化
);

const ReactPlayerMemo = React.memo(
  ({
    handleProgress,
  }: {
    handleProgress: (state: {
      playedSeconds: number;
      played: number;
      loadedSeconds: number;
      loaded: number;
    }) => void;
  }) => {
    const playerRef = useRef(null);

    return (
      <DynamicReactPlayer
        ref={playerRef}
        url="assets/Big_Buck_Bunny_360_10s_1MB.mp4"
        width="100%"
        height="100%"
        onProgress={handleProgress}
        style={{ position: 'absolute', top: 0, left: 0 }}
        controls={true}
        onError={(e) => console.error('ReactPlayer error:', e)}
        onReady={() => console.log('ReactPlayer is ready')}
        config={{ file: { attributes: { crossOrigin: 'anonymous' } } }}
      />
    );
  },
);

const VideoReviewTool: React.FC = () => {
  type Comment = {
    x: number;
    y: number;
    text: string;
    time: number;
    videoWidth: number;
    videoHeight: number;
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 });
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

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

    if (typeof window !== 'undefined') {
      // windowオブジェクトが存在する場合のみイベントリスナーを追加
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false); // モーダルの表示状態
  const [inputComment, setInputComment] = useState(''); // モーダル内で入力されたコメント

  const handleAddComment = (e: any) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();
    const stage = stageRef.current!.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newComment: Comment = {
      x: pointerPosition!.x / dimensions.width,
      y: pointerPosition!.y / dimensions.height,
      text: '',
      time: currentTime,
      videoWidth: dimensions.width,
      videoHeight: dimensions.height,
    };

    setComments((prevComments) => [...prevComments, newComment]);
    setIsModalVisible(true); // モーダルを表示
  };

  const handleOk = () => {
    if (stageRef.current) {
      // stageRef.currentがnullでないことを確認
      const newComments = comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return { ...comment, text: inputComment };
        }
        return comment;
      });
      setComments(newComments);
      setIsModalVisible(false); // モーダルを非表示
      setInputComment(''); // 入力フィールドをリセット
    }
  };

  const handleCancel = () => {
    // コメント消去
    const newComments = comments.filter(
      (_, index) => index !== comments.length - 1,
    );
    setComments(newComments);
    setIsModalVisible(false); // モーダルを非表示
  };
  const handleProgress = (state: {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
  }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleTimestampClick = (time: number) => {
    const player = document.querySelector('video') as HTMLVideoElement;
    player.currentTime = time;
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '56.25%',
        }}
      >
        <ReactPlayerMemo handleProgress={handleProgress} />
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height - 60}
          style={{ position: 'relative', top: 0, left: 0 }}
          onClick={handleAddComment}
        >
          <Layer>
            {comments
              .filter((comment) => Math.abs(comment.time - currentTime) <= 0.5)
              .map((comment, index) => (
                <React.Fragment key={index}>
                  <Group key={index}>
                    <Circle
                      x={comment.x * dimensions.width}
                      y={comment.y * dimensions.height}
                      radius={10}
                      fill="red"
                    />
                    <Line
                      points={[
                        comment.x * dimensions.width,
                        comment.y * dimensions.height,
                        comment.x * dimensions.width + 10,
                        comment.y * dimensions.height + 10,
                        comment.x * dimensions.width + 110,
                        comment.y * dimensions.height + 10,
                        comment.x * dimensions.width + 110,
                        comment.y * dimensions.height + 60,
                        comment.x * dimensions.width - 10,
                        comment.y * dimensions.height + 60,
                        comment.x * dimensions.width - 10,
                        comment.y * dimensions.height + 10,
                        comment.x * dimensions.width,
                        comment.y * dimensions.height,
                      ]}
                      closed
                      fill="white"
                      stroke="black"
                      strokeWidth={2}
                    />
                    <Text
                      x={comment.x * dimensions.width + 15}
                      y={comment.y * dimensions.height + 15}
                      text={comment.text}
                      fontSize={12}
                      fill="black"
                      width={90}
                      padding={5}
                      align="center"
                    />
                  </Group>
                </React.Fragment>
              ))}
          </Layer>
        </Stage>
        <Modal
          title="Add Comment"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />
        </Modal>
      </div>
      <div className="pt-8 mt-8 space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="text-gray-800">{comment.text}</p>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleTimestampClick(comment.time)}
            >
              {comment.time.toFixed(2)}s
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoReviewTool;
