import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  GestureResponderEvent
} from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);

  function addGoalHandler(enteredGoalText:string): void {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: String(enteredGoalText), id: Math.random().toString() },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler}/>
      <View style={styles.goalsContainer}>
        {/* <Text>List of goals...</Text> */}
        {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal, i) => (
            <View style={styles.goalItem} key={i}>
              <Text style={styles.goalText}>
                {goal}
              </Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          alwaysBounceVertical={false}
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} />;
          }}
          keyExtractor={(item, index) => {
            return item.id
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
