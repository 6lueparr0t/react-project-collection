import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from "react-native";

export default function App() {
  const goalInputRef = useRef<TextInput>(null);
  const [enteredGoalText, setEneteredGoalText] = useState<string>("");
  const [courseGoals, setCourseGoals] = useState<string[]>([]);

  function goalInputHandler(enteredText: string): void {
    setEneteredGoalText(enteredText);
  }

  function addGoalHandler(): void {
    // console.log(enteredGoalText);
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    goalInputRef.current?.clear();
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          ref={goalInputRef}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* <Text>List of goals...</Text> */}
        <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal, i) => (
            <View style={styles.goalItem} key={i}>
              <Text style={styles.goalText}>
                {goal}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 4,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#2240d7",
  },
  goalText: {
    color: "#ffffff",
  }
});
