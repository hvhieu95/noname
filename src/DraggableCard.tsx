import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
type DraggableCardProps = {
  shape: "square" | "circle" | "triangle";
 
};
const DraggableCard: React.FC<DraggableCardProps> = ({ shape }) => {
  const [cardText, setCardText] = useState<string>("text");
  const [disableDragging, setDisableDragging] = useState<boolean>(false);
  const [currentShape, setCurrentShape] = useState<"square" | "circle" | "triangle">("square");

  const changeShape = (newShape: "square" | "circle" | "triangle") => {
    setCurrentShape(newShape);
  };
  const shapeStyles = {
    square: {},
    circle: {
      borderRadius: "50%",
    },
    triangle: {
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardText(event.target.value);
  };

  const handleStart = () => {
    setDisableDragging(true);
  };

  const handleStop = () => {
    setDisableDragging(false);
  };

  return (
    <div className=" draggable-container">
      <Draggable
        disabled={disableDragging}
        onStart={handleStart}
        onStop={handleStop}
      >
        <ResizableBox
          resizeHandles={["nw", "ne", "sw", "se", "n", "e", "s", "w"]}
          width={200}
          height={150}
          style={{
            ...shapeStyles[shape],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightblue",
            border: "1px solid blue",
          }}
        >
          <textarea
            value={cardText}
            onChange={handleTextChange}
            style={{
              ...shapeStyles[shape],
              backgroundColor: "lightblue",
              resize: "none",
              border: "none",
              outline: "none",
              flex: 1,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
    
        </ResizableBox>
      </Draggable>
    </div>
  );
};

export default DraggableCard;
