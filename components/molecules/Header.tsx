import React, { SFC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface HeaderProps {
  color: string;
  title: string;
}
const Header: SFC<HeaderProps> = ({ color, title }) => {
  const dynamicStyles = StyleSheet.create({
    header: {
      backgroundColor: color
    }
  });
  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "black",
    fontSize: 18
  }
});

export default Header;
