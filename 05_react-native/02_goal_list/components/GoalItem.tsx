import {
  Text,
  View,
} from "react-native";

import { StyleSheet } from "react-native";

const GoalItem : React.FC<{text : string}> = (props) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{props.text}</Text>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#2240d7",
  },
  goalText: {
    color: "#ffffff",
  },
});
