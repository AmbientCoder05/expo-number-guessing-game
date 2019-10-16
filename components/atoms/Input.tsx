import React, { SFC } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const Input: SFC<TextInputProps> = ({ style, ...props }) => (
    <TextInput {...props} style={[styles.input, style]} />
);

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;
