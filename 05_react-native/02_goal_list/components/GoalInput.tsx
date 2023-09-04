import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  Modal,
  Button,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";

const GoalInput: React.FC<{
  visible: boolean;
  onAddGoal: (enteredGoalText: string) => void;
  onCancel: () => void;
}> = (props) => {
  const [enteredGoalText, setEneteredGoalText] = useState<string>("");
  const goalInputRef = useRef<TextInput>(null);

  function goalInputHandler(enteredText: string): void {
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
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/images/goal.png')} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          ref={goalInputRef}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#E53935"/>
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#9eb5d9"/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3F2FD",
    backgroundColor: "#2559aa"
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    // flex: 1,
    color: "#0D47A1",
    borderWidth: 1,
    borderColor: "#E3F2FD",
    backgroundColor: "#E3F2FD",
    borderRadius: 6,
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
