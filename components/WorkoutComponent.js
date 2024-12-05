import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WorkoutComponent = ({
  exercise,
  calories,
  duration,
  notes,
  timestamp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise}</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Calories Burned: </Text>
        {calories}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Duration: </Text>
        {duration} mins
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Notes: </Text>
        {notes || "No notes provided"}
      </Text>
      <Text style={styles.timestamp}>
        Logged on: {new Date(timestamp).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default WorkoutComponent;
