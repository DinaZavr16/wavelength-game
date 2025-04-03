import React, { useState } from "react";
import "./PlayerSetup.css";

const PlayerSetup = ({ onStartGame }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!player1.trim() || !player2.trim()) {
      setError("Please enter names for both players");
      return;
    }
    if (player1.trim() === player2.trim()) {
      setError("Player names must be different");
      return;
    }
    onStartGame(player1.trim(), player2.trim());
  };

  return (
    <div className="setup-container">
      <h1 className="title">Wavelength</h1>
      <form onSubmit={handleSubmit} className="setup-form">
        <div className="input-group">
          <label htmlFor="player1">Player 1 Name:</label>
          <input
            type="text"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            placeholder="Enter Player 1 name"
            maxLength={20}
          />
        </div>
        <div className="input-group">
          <label htmlFor="player2">Player 2 Name:</label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Enter Player 2 name"
            maxLength={20}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="start-button">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSetup;
