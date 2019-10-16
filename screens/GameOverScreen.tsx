import React, { SFC, useContext } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

import Guesses from "~/contexts/Guesses";
import SelectedNumber from "~/contexts/SelectedNumber";
import theme from "~/theme";

interface GameOverScreenProps {
  onGameRestart: () => void;
}
const GameOverScreen: SFC<GameOverScreenProps> = ({ onGameRestart }) => {
  const selectedNumber = useContext(SelectedNumber);
  const roundGuesses = useContext(Guesses);

  return (
    <View style={styles.screen}>
      <Text>Game Over!</Text>
      <Text>The number was: {selectedNumber}.</Text>
      <Text>Number of Guesses: {roundGuesses}.</Text>
      <Button
        color={theme.primary}
        title="Play Again"
        onPress={_ => onGameRestart()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GameOverScreen;
