import React, { useContext, useState, SFC } from "react";
import {
  Button,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert
} from "react-native";
import Card from "~/components/atoms/Card";
import Input from "~/components/atoms/Input";
import NumberContainer from "~/components/molecules/NumberContainer";

import SelectedNumber from "~/contexts/SelectedNumber";
import theme from "~/theme";

interface StartGameScreenProps {
  onStartGame: () => void;
  setSelectedNumber: (num: number) => void;
}
const StartGameScreen: SFC<StartGameScreenProps> = ({ onStartGame, setSelectedNumber }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedNumber = useContext(SelectedNumber);

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetButtonHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmButtonHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetButtonHandler }]
      );
    } else {
      setEnteredValue("");
      setSelectedNumber(chosenNumber);
      setConfirmed(true);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            style={styles.input}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={theme.accent}
                title="Reset"
                onPress={resetButtonHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={theme.primary}
                title="Confirm"
                onPress={confirmButtonHandler}
              />
            </View>
          </View>
        </Card>
        {confirmed ? (
          <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer color={theme.primary}>{selectedNumber}</NumberContainer>
            <Button
              color={theme.primary}
              title="START GAME"
              onPress={_ => onStartGame()}
            />
          </Card>
        ) : (
          undefined
        )}
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 20
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
