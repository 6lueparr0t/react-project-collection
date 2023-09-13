import React, { PropsWithChildren } from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.title,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.title,
    padding: 12,
  },
});
