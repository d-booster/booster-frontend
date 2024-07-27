import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import dynamic from "next/dynamic";
import React from "react";
import { useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import Split from "react-split";

const DynamicReactPlayer = dynamic(
  () => import("react-player"),
  { ssr: false }, // SSRを無効化
);

const ReactPlayerMemo = React.memo(function ReactPlayer({
  handleProgress,
}: {
  handleProgress: (state: {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
  }) => void;
}) {
  const playerRef = useRef(null);

  return (
    <DynamicReactPlayer
      ref={playerRef}
      url="assets/sample.mp4"
      width="100%"
      height="100%"
      style={{ position: "absolute", top: 0, left: 0 }}
      onProgress={handleProgress}
      controls={true}
      onError={(e) => console.error("ReactPlayer error:", e)}
      onReady={() => console.log("ReactPlayer is ready")}
      config={{ file: { attributes: { crossOrigin: "anonymous" } } }}
    />
  );
});

const Video: React.FC = () => {
  type RectangleType = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  const [selectedAreaList, setSelectedAreaList] = useState<RectangleType[]>([]);
  // ドラック中に描画されている矩形
  const [newSelectedArea, setNewSelectedArea] = useState<
    RectangleType | undefined
  >(undefined);
  const stageRef = useRef<StageType>(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };
    setNewSelectedArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = () => {
    if (!isDrawing.current || !newSelectedArea) return;
    const stage = stageRef.current;
    if (!stage) return;

    const position = stage.getPointerPosition();
    // 描画中にpositionがnullになった場合、描画を中止する
    if (position === null) {
      setNewSelectedArea(undefined);
      isDrawing.current = false;
      return;
    }

    const { x: currentX, y: currentY } = position;
    // 描画をスタートした時点の最初の座標
    const startingPointX = newSelectedArea.x;
    const startingPointY = newSelectedArea.y;

    setNewSelectedArea({
      x: startingPointX,
      y: startingPointY,
      width: currentX - startingPointX,
      height: currentY - startingPointY,
    });
  };

  const handleMouseUp = () => {
    if (newSelectedArea) {
      setSelectedAreaList([...selectedAreaList, newSelectedArea]);
    }
    setNewSelectedArea(undefined);
    isDrawing.current = false;
  };

  const leftRef = useRef<HTMLDivElement>(null);
  const stageHeight = window.innerHeight;

  return (
    <Split className="flex" sizes={[75, 25]} minSize={1400}>
      <div
        style={{ backgroundColor: "red", position: "relative" }}
        ref={leftRef}
      >
        <>
          <ReactPlayerMemo handleProgress={() => console.log("")} />
          <Stage
            width={leftRef.current?.offsetWidth}
            height={stageHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              {selectedAreaList.map((selectedArea, i) => (
                <Rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  x={selectedArea.x}
                  y={selectedArea.y}
                  width={selectedArea.width}
                  height={selectedArea.height}
                  stroke="black"
                />
              ))}
              {newSelectedArea && (
                <Rect
                  x={newSelectedArea.x}
                  y={newSelectedArea.y}
                  width={newSelectedArea.width}
                  height={newSelectedArea.height}
                  stroke="blue"
                />
              )}
            </Layer>
          </Stage>
        </>
      </div>
      <div style={{ backgroundColor: "blue" }}>
        <h1>右側のコンテンツ</h1>
      </div>
    </Split>
  );
};

export default Video;
