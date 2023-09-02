import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  GestureResponderEvent,
} from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

interface Goal {
  id: string;
  text: string;
}

export default function App() {
  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);

  function addGoalHandler(enteredGoalText: string): void {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: String(enteredGoalText), id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id : string) {
    // console.log("DELETE");
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal : Goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
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
  goalsContainer: {
    flex: 5,
  },
});
