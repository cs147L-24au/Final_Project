import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";

const WorkoutComponent = ({
  exercise,
  calories,
  duration,
  notes,
  timestamp,
}) => {
  const [loaded] = Font.useFonts({
    MontserratMedium: require("../assets/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
    MontserratRegular: require("../assets/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
  });

  if (!loaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise}</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>🔥 Calories Burned: </Text>
        {calories}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>⏱️ Duration: </Text>
        {duration} mins
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>💭 Notes: </Text>
        {notes || "No notes provided"}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(timestamp).toLocaleDateString()}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: "#555",
    marginBottom: 4,
  },
  label: {
    fontFamily: "MontserratMedium",
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    fontFamily: "MontserratRegular",
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default WorkoutComponent;
