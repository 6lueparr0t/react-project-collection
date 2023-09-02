import { Text, View, Pressable } from "react-native";

import { StyleSheet } from "react-native";

const GoalItem: React.FC<{ id: string, text: string, onDeleteItem:(id:string)=>void }> = (props) => {
  return (
    <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

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
