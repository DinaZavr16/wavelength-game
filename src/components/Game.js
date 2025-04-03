import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import CluesDisplay from "./CluesDisplay";
import "./Game.css";

const clues = [
  ["Bad Company", "Good Company"],
  ["Terrible Movie", "Great Movie"],
  ["Forgettable Person", "Memorable Person"],
  ["Culturally Insignificant", "Culturally Significant"],
  ["Dry Food", "Wet Food"],
  ["Easy to Do", "Hard to Do"],
  ["Feels Bad", "Feels Good"],
  ["Hairless", "Hairy"],
  ["Hard to Remember", "Easy to Remember"],
  ["Cold", "Hot"],
  ["Inflexible", "Flexible"],
  ["Clean Food", "Messy Food"],
  ["Proper Utensil Food", "Finger Food"],
  ["Want", "Need"],
  ["Weird Thing to Own", "Normal Thing to Own"],
  ["Poorly Made", "Well Made"],
  ["Quiet Place", "Loud Place"],
  ["Common", "Rare"],
  ["Bad Influence", "Role Model"],
  ["Pointy Animal", "Round Animal"],
  ["Hard", "Soft"],
  ["Ugly", "Beautiful"],
  ["Underpaid Job", "Overpaid Job"],
  ["Underrated Skill", "Overrated Skill"],
  ["Unsexy Emoji", "Sexy Emoji"],
  ["Useless", "Useful"],
  ["Villain", "Hero"],
  ["Worst Day Ever", "Best Day Ever"],
  ["Boring Hobby", "Exciting Hobby"],
  ["Useless Superpower", "Awesome Superpower"],
  ["Lame Party Trick", "Cool Party Trick"],
  ["Terrible First Date Spot", "Perfect First Date Spot"],
  ["Awkward Conversation Topic", "Engaging Conversation Topic"],
  ["Worst Pizza Topping", "Best Pizza Topping"],
  ["Annoying Sound", "Satisfying Sound"],
  ["Uncomfortable Clothing", "Comfy Clothing"],
  ["Worst Smell", "Best Smell"],
  ["Boring Class Subject", "Fascinating Class Subject"],
  ["Terrible Gift", "Thoughtful Gift"],
  ["Unhealthy Habit", "Healthy Habit"],
  ["Worst Chore", "Most Satisfying Chore"],
  ["Forgettable Song", "Catchy Song"],
  ["Useless App", "Must-Have App"],
  ["Terrible Supervillain Name", "Awesome Superhero Name"],
  ["Worst Flavor", "Best Flavor"],
  ["Boring Museum Exhibit", "Mind-Blowing Museum Exhibit"],
  ["Terrible Band Name", "Awesome Band Name"],
  ["Worst Yearbook Quote", "Best Yearbook Quote"],
  ["Lame Excuse", "Believable Excuse"],
  ["Terrible Mascot", "Lovable Mascot"],
  ["Worst Invention", "Life-Changing Invention"],
  ["Annoying Commercial", "Memorable Commercial"],
  ["Terrible Pickup Line", "Smooth Pickup Line"],
  ["Worst Sandwich Filling", "Best Sandwich Filling"],
  ["Boring Screensaver", "Hypnotic Screensaver"],
  ["Useless Life Hack", "Game-Changing Life Hack"],
  ["Terrible Sitcom Premise", "Hilarious Sitcom Premise"],
  ["Worst Karaoke Song", "Crowd-Pleasing Karaoke Song"],
  ["Annoying Social Media Trend", "Fun Social Media Trend"],
  ["Terrible Stage Name", "Unforgettable Stage Name"],
  ["Worst Tongue Twister", "Most Challenging Tongue Twister"],
  ["Boring Screensaver", "Mesmerizing Screensaver"],
  ["Terrible Tattoo", "Meaningful Tattoo"],
  ["Worst Bumper Sticker", "Clever Bumper Sticker"],
  ["Annoying Catchphrase", "Iconic Catchphrase"],
  ["Terrible Team Name", "Intimidating Team Name"],
  ["Worst Flavor Combination", "Unexpectedly Delicious Flavor Combination"],
  ["Useless College Course", "Life-Changing College Course"],
  ["Terrible Podcast Topic", "Binge-Worthy Podcast Topic"],
  ["Worst Theme Park Ride", "Thrilling Theme Park Ride"],
  ["Annoying Pet Trick", "Impressive Pet Trick"],
  ["Terrible Workout", "Effective Workout"],
  ["Worst Board Game", "Addictive Board Game"],
  ["Annoying Habit", "Endearing Quirk"],
  ["Terrible Prank", "Harmless Prank"],
  ["Worst Cereal Mascot", "Beloved Cereal Mascot"],
  ["Annoying Alarm Sound", "Gentle Wake-Up Alarm"],
  ["Terrible Vacation Spot", "Dream Vacation Destination"],
  ["Worst Toy", "Must-Have Toy"],
  ["Annoying TV Character", "Fan-Favorite TV Character"],
  ["Terrible Superpower Side Effect", "Awesome Superpower Perk"],
  ["Worst Ice Cream Flavor", "Innovative Ice Cream Flavor"],
  ["Annoying Text Abbreviation", "Useful Text Abbreviation"],
  ["Terrible Costume Idea", "Creative Costume Idea"],
  ["Worst Cooking Mistake", "Game-Changing Cooking Tip"],
  ["Annoying Exercise", "Fun Exercise"],
  ["Terrible Breakup Method", "Respectful Breakup Method"],
  ["Worst Motivational Poster", "Actually Motivating Poster"],
  ["Annoying Car Feature", "Useful Car Feature"],
  ["Terrible Hiding Spot", "Clever Hiding Spot"],
  ["Worst Trend from Your Parents' Era", "Cool Retro Trend"],
  ["Annoying Tourist Behavior", "Respectful Tourist Behavior"],
  ["Terrible Roommate Habit", "Ideal Roommate Quality"],
  ["Worst Reason to Call in Sick", "Legitimate Reason to Call in Sick"],
  ["Annoying Phone Notification", "Important Phone Notification"],
  ["Terrible Boat Name", "Clever Boat Name"],
  ["Worst Reason to Break Up", "Valid Reason to Break Up"],
  ["Annoying Gym Behavior", "Proper Gym Etiquette"],
  ["Terrible Airline", "Top-Rated Airline"],
  ["Worst Bathroom Graffiti", "Profound Bathroom Graffiti"],
  ["Annoying Concert Behavior", "Considerate Concert Behavior"],
  ["Terrible Hogwarts House", "Best Hogwarts House"],
  ["Worst Reason to Get a Pet", "Great Reason to Get a Pet"],
  ["Annoying Email Subject Line", "Attention-Grabbing Email Subject Line"],
  ["Terrible Wifi Network Name", "Clever Wifi Network Name"],
];

const Game = ({ player1, player2, onReturnHome }) => {
  const [targetAngle, setTargetAngle] = useState(0);
  const [currentClues, setCurrentClues] = useState(["", ""]);
  const [isTargetVisible, setIsTargetVisible] = useState(true);
  const [roundScore, setRoundScore] = useState(0);
  const [playerScores, setPlayerScores] = useState({
    [player1]: 0,
    [player2]: 0,
  });
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [round, setRound] = useState(1);
  const [isClueGiver, setIsClueGiver] = useState(true);

  const getGuessingPlayer = () => {
    return currentPlayer === player1 ? player2 : player1;
  };

  const setRandomClues = () => {
    const randomIndex = Math.floor(Math.random() * clues.length);
    setCurrentClues(clues[randomIndex]);
  };

  const calculateScore = (guessAngle) => {
    const diff = Math.abs(guessAngle - targetAngle);
    if (diff <= 4.5) return 5;
    if (diff <= 13.5) return 3;
    if (diff <= 22.5) return 1;
    return 0;
  };

  const handleGuess = (angle) => {
    setCurrentGuess(angle);
  };

  const handleToggleTarget = () => {
    if (isTargetVisible) {
      setIsTargetVisible(false);
      setIsClueGiver(false);
    } else {
      const newScore = calculateScore(currentGuess);
      setRoundScore(newScore);
      const guessingPlayer = getGuessingPlayer();
      setPlayerScores((prev) => ({
        ...prev,
        [guessingPlayer]: prev[guessingPlayer] + newScore,
      }));
      setIsTargetVisible(true);
      setIsClueGiver(true);
    }
  };

  const handleNextRound = () => {
    setTargetAngle(Math.random() * 180 - 90);
    setRandomClues();
    setIsTargetVisible(true);
    setRoundScore(0);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    setRound(round + 1);
    setIsClueGiver(true);
  };

  useEffect(() => {
    setTargetAngle(Math.random() * 180 - 90);
    setRandomClues();
  }, []);

  return (
    <div className="game-container">
      <div className="header">
        <h1 className="title">Wavelength</h1>
        <button className="home-button" onClick={onReturnHome}>
          Home
        </button>
      </div>

      <div className="player-info">
        <div className="players-container">
          <div className="current-player">
            {isClueGiver ? (
              <>
                Clue Giver: <span>{currentPlayer}</span>
              </>
            ) : (
              <>
                Guesser: <span>{getGuessingPlayer()}</span>
              </>
            )}
          </div>
          <div className="other-player">
            {isClueGiver ? (
              <>
                Guesser: <span>{getGuessingPlayer()}</span>
              </>
            ) : (
              <>
                Clue Giver: <span>{currentPlayer}</span>
              </>
            )}
          </div>
        </div>
        <div className="round">Round {round}</div>
      </div>

      <div className="game-board-container">
        <GameBoard
          targetAngle={targetAngle}
          isTargetVisible={isTargetVisible}
          onGuess={handleGuess}
          roundNumber={round}
          onHideTarget={handleToggleTarget}
          onRevealTarget={handleToggleTarget}
          onNextRound={handleNextRound}
        />
      </div>

      <div className="clues-container">
        <CluesDisplay leftClue={currentClues[0]} rightClue={currentClues[1]} />
      </div>

      <div className="score-display">
        {roundScore > 0 && (
          <div className="round-score">
            {getGuessingPlayer()} scored: {roundScore} points
          </div>
        )}
        <div className="player-scores">
          <div className="player-score">
            {player1}: {playerScores[player1]} points
          </div>
          <div className="player-score">
            {player2}: {playerScores[player2]} points
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
