import React, { useContext, useState, useRef, useEffect, SFC } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";

import NumberContainer from "~/components/molecules/NumberContainer";
import Card from "~/components/atoms/Card";

import SelectedNumber from "~/contexts/SelectedNumber";
import Guesses from "~/contexts/Guesses";
import theme from "~/theme";

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  const rndNum =
    Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

interface GameScreenProps {
  setGuessRounds: (rounds: number) => void;
  onEndGame: () => void;
}
const GameScreen: SFC<GameScreenProps> = ({ setGuessRounds, onEndGame }) => {
  const selectedNumber = useContext(SelectedNumber);
  const currentRounds = useContext(Guesses);

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, selectedNumber)
  );
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    if (currentGuess === selectedNumber) {
      onEndGame();
    }
  }, [currentGuess, selectedNumber]);

  const nextGuessHandler = (direction: "lower" | "higher") => {
    if (
      (direction === "lower" && currentGuess < selectedNumber) ||
      (direction === "higher" && currentGuess > selectedNumber)
    ) {
      Alert.alert("Don't lie! ;)", "You know that is wrong...", [
        {
          text: "Sorry!",
          style: "cancel"
        }
      ]);
    } else {
      if (direction === "lower") {
        currentMax.current = currentGuess;
      } else {
        currentMin.current = currentGuess;
      }
      const nextNumber = generateRandomBetween(
        currentMin.current,
        currentMax.current,
        currentGuess
      );
      setGuessRounds(currentRounds + 1);
      setCurrentGuess(nextNumber);
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer color={theme.primary}>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="HIGHER" onPress={() => nextGuessHandler("higher")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
