import React, { useState, useEffect, useRef } from "react";
import "./GameBoard.css";

const GameBoard = ({
  targetAngle,
  isTargetVisible,
  onGuess,
  roundNumber,
  onHideTarget,
  onRevealTarget,
  onNextRound,
}) => {
  const [needleAngle, setNeedleAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [spectrumAngle, setSpectrumAngle] = useState(targetAngle);
  const [lastRound, setLastRound] = useState(roundNumber);
  const [gamePhase, setGamePhase] = useState("START"); // START, SPINNING, HIDE_TARGET, GUESSING, REVEALED
  const needleContainerRef = useRef(null);

  // Reset states when round changes
  useEffect(() => {
    if (roundNumber !== lastRound) {
      setHasSpun(false);
      setIsSpinning(false);
      setNeedleAngle(0);
      setSpectrumAngle(targetAngle);
      setLastRound(roundNumber);
      setGamePhase("START");
    }
  }, [roundNumber, lastRound, targetAngle]);

  useEffect(() => {
    const handleStart = (e) => {
      if (gamePhase === "GUESSING") {
        setIsDragging(true);
        e.preventDefault();
      }
    };

    const handleMove = (e) => {
      if (!isDragging || gamePhase !== "GUESSING") return;
      e.preventDefault();

      const rect = needleContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.bottom;

      let clientX, clientY;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const angle =
        (Math.atan2(clientX - centerX, centerY - clientY) * 180) / Math.PI;
      const clampedAngle = Math.max(-90, Math.min(90, angle));
      setNeedleAngle(clampedAngle);
      onGuess(clampedAngle);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    const needleContainer = needleContainerRef.current;
    if (needleContainer) {
      needleContainer.addEventListener("mousedown", handleStart);
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      needleContainer.addEventListener("touchstart", handleStart);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      if (needleContainer) {
        needleContainer.removeEventListener("mousedown", handleStart);
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        needleContainer.removeEventListener("touchstart", handleStart);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      }
    };
  }, [isDragging, gamePhase, onGuess]);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setGamePhase("SPINNING");

    // Start with current angle and spin multiple times
    let startAngle = spectrumAngle;
    let spins = 0;
    const totalSpins = 3;
    const spinInterval = setInterval(() => {
      startAngle += 20;
      setSpectrumAngle(startAngle);

      if (startAngle >= 360 * (spins + 1)) {
        spins++;
        if (spins >= totalSpins) {
          clearInterval(spinInterval);
          setSpectrumAngle(targetAngle);
          setIsSpinning(false);
          setHasSpun(true);
          setGamePhase("HIDE_TARGET");
        }
      }
    }, 50);
  };

  const handleHideTarget = () => {
    onHideTarget();
    setGamePhase("GUESSING");
  };

  const handleRevealTarget = () => {
    onRevealTarget();
    setGamePhase("REVEALED");
  };

  // Show spectrum based on game phase
  const showSpectrum =
    gamePhase === "SPINNING" ||
    gamePhase === "HIDE_TARGET" ||
    gamePhase === "REVEALED";

  // Show needle during guessing and reveal phases
  const showNeedle = gamePhase === "GUESSING" || gamePhase === "REVEALED";

  return (
    <div className="board-container">
      <div className="board">
        <div
          className="target-area"
          style={{
            display: showSpectrum ? "block" : "none",
            background: `conic-gradient(
              from -90deg at 50% 100%,
              #a4b0be 0deg ${spectrumAngle - 22.5 + 90}deg,
              #ff6b6b ${spectrumAngle - 22.5 + 90}deg ${
              spectrumAngle - 13.5 + 90
            }deg,
              #feca57 ${spectrumAngle - 13.5 + 90}deg ${
              spectrumAngle - 4.5 + 90
            }deg,
              #48dbfb ${spectrumAngle - 4.5 + 90}deg ${
              spectrumAngle + 4.5 + 90
            }deg,
              #feca57 ${spectrumAngle + 4.5 + 90}deg ${
              spectrumAngle + 13.5 + 90
            }deg,
              #ff6b6b ${spectrumAngle + 13.5 + 90}deg ${
              spectrumAngle + 22.5 + 90
            }deg,
              #a4b0be ${spectrumAngle + 22.5 + 90}deg 180deg
            )`,
            transition: isSpinning ? "none" : "background 0.3s ease",
          }}
        />
        <div className="needle-container" ref={needleContainerRef}>
          <div
            className="needle"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              display: showNeedle ? "block" : "none",
            }}
          />
        </div>
      </div>
      <div className="game-controls">
        {gamePhase === "START" && (
          <button className="game-button spin-button" onClick={handleSpin}>
            Spin
          </button>
        )}
        {gamePhase === "HIDE_TARGET" && (
          <button
            className="game-button hide-button"
            onClick={handleHideTarget}
          >
            Hide Target
          </button>
        )}
        {gamePhase === "GUESSING" && (
          <button
            className="game-button reveal-button"
            onClick={handleRevealTarget}
          >
            Reveal
          </button>
        )}
        {gamePhase === "REVEALED" && (
          <button
            className="game-button next-round-button"
            onClick={onNextRound}
          >
            Next Round
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
