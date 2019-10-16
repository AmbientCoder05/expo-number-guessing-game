import React, { SFC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface NumberContainerProps {
  color: string;
}
const NumberContainer: SFC<NumberContainerProps> = ({
  children,
  color
}) => {
  const dynamicStyles = StyleSheet.create({
    container: {
      borderColor: color
    },
    number: {
      color
    }
  });

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.number, dynamicStyles.number]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  number: {
    fontSize: 22
  }
});

export default NumberContainer;
