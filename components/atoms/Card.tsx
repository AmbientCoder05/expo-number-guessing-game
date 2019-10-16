import React, { SFC } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface CardProps {
    style?: StyleProp<ViewStyle>;
}
const Card: SFC<CardProps> = ({ children, style }) => (
    <View style={[styles.card, style]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    }
});

export default Card;
