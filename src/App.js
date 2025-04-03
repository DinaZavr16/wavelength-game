import React, { useState } from "react";
import Game from "./components/Game";
import PlayerSetup from "./components/PlayerSetup";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState({ player1: "", player2: "" });

  const handleStartGame = (player1, player2) => {
    setPlayers({ player1, player2 });
    setGameStarted(true);
  };

  const handleReturnHome = () => {
    setGameStarted(false);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <PlayerSetup onStartGame={handleStartGame} />
      ) : (
        <Game
          player1={players.player1}
          player2={players.player2}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}

export default App;
