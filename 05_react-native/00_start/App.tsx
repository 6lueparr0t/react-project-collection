import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.basicText}>Another piece of text!</Text>
      </View>
      <Text style={styles.basicText}>Hello, World!!!</Text>
      <Button title="Tap me!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  basicText: { margin: 16, borderWidth: 2, borderColor: "royalblue", padding: 16 },
});
