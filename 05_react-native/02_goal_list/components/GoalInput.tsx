import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  Button,
  GestureResponderEvent
} from "react-native";

import { StyleSheet } from "react-native";

const GoalInput: React.FC<{onAddGoal : (enteredGoalText:string) => void}> = (props) => {
  const [enteredGoalText, setEneteredGoalText] = useState<string>("");
  const goalInputRef = useRef<TextInput>(null);

  function goalInputHandler(enteredText : string): void {
    setEneteredGoalText(enteredText);
  }

  /**
   * 목록에 추가하고 입력 창을 초기화
   */
  function addGoalHandler(event: GestureResponderEvent) {
    // event.preventDefault();
    props.onAddGoal(enteredGoalText);
    setEneteredGoalText("");
    goalInputRef.current?.clear();
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        onChangeText={goalInputHandler}
        ref={goalInputRef}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
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
});
