"use client";

import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import type React from "react";
import { useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

type RectangleType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const Video: React.FC = () => {
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

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
    </div>
  );
};

export default Video;
