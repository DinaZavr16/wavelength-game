import React from "react";
import "./SpectrumArc.css";

const SpectrumArc = ({
  targetPosition,
  guessPosition,
  isTargetVisible,
  onGuess,
}) => {
  const colors = [
    "#FF6B6B",
    "#FF8E53",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#073B4C",
    "#EF476F",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
  ];

  const handleClick = (e) => {
    if (!isTargetVisible && onGuess) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const angle = Math.atan2(y - rect.height, x - rect.width / 2);
      const normalizedAngle = (angle + Math.PI / 2) / Math.PI;
      onGuess(Math.max(0, Math.min(1, normalizedAngle)));
    }
  };

  const getWedgeStyle = (index) => {
    const totalWedges = colors.length;
    const angle = Math.PI / totalWedges;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;

    return {
      clipPath: `path('M 50 100 L ${50 + 50 * Math.cos(startAngle)} ${
        100 - 50 * Math.sin(startAngle)
      } A 50 50 0 0 1 ${50 + 50 * Math.cos(endAngle)} ${
        100 - 50 * Math.sin(endAngle)
      } Z')`,
      transform: `translate(-50%, -50%)`,
    };
  };

  return (
    <div className="spectrum-container">
      <div className="spectrum-arc" onClick={handleClick}>
        {colors.map((color, index) => {
          const isTarget =
            isTargetVisible &&
            targetPosition >= index / colors.length &&
            targetPosition < (index + 1) / colors.length;
          const isGuess =
            !isTargetVisible &&
            guessPosition >= index / colors.length &&
            guessPosition < (index + 1) / colors.length;

          return (
            <div
              key={index}
              className={`wedge ${isTarget ? "target" : ""} ${
                isGuess ? "guess" : ""
              }`}
              style={{
                ...getWedgeStyle(index),
                backgroundColor: isTargetVisible ? color : "#f0f0f0",
              }}
            />
          );
        })}
        {!isTargetVisible && (
          <div
            className="guess-arrow"
            style={{
              transform: `rotate(${guessPosition * Math.PI}rad)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SpectrumArc;
