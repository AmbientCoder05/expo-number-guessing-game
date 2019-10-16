import React, { SFC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "~/components/molecules/Header";

import AppProvider from "./AppProvider";
import StartGameScreen from "~/screens/StartGameScreen";
import GameScreen from "~/screens/GameScreen";
import GameOverScreen from "~/screens/GameOverScreen";
import theme from "~/theme";

const App: SFC = () => {
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [guessRounds, setGuessRounds] = useState(1);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const restartGameHandler = () => {
    setGameStarted(false);
    setGameEnded(false);
    setSelectedNumber(undefined);
    setGuessRounds(1);
  };

  const startGameHandler = () => {
    setGameStarted(true);
    setGameEnded(false);
  };

  const endGameHandler = () => {
    setGameStarted(false);
    setGameEnded(true);
  };

  return (
    <View style={styles.screen}>
      <AppProvider selectedNumber={selectedNumber} guesses={guessRounds}>
        <Header color={theme.primary} title="Guess a Number" />
        {gameStarted ? (
          <GameScreen
            setGuessRounds={setGuessRounds}
            onEndGame={endGameHandler}
          />
        ) : gameEnded ? (
          <GameOverScreen onGameRestart={restartGameHandler} />
        ) : (
          <StartGameScreen
            setSelectedNumber={setSelectedNumber}
            onStartGame={startGameHandler}
          />
        )}
      </AppProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
