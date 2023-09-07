import React, { PropsWithChildren, ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface PrimaryButtonProps extends PropsWithChildren {
  text?: string;
  onPress?: () => void;
}

// const PrimaryButton: React.FC< PropsWithChildren & { onPress?: () => void } > = (props) => {
const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { children, onPress }: PrimaryButtonProps = props;

  // function pressHandler() {
  //   console.log("Pressed!");
  // }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
    width: "100%",
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
