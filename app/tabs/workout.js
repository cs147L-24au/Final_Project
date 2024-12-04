import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const WorkoutPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Your Physical Wellness Journey</Text>

      {/* Subtitle or Instructions */}
      <Text style={styles.subtitle}>
        Log your workouts and see your progress!
      </Text>

      {/* Placeholder for Workout List or Features */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No workouts logged yet.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16, // Add padding for a clean layout
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center", // Center-align the title
    marginTop: 24, // Add space from the top
    marginBottom: 16, // Add space below the title
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center", // Center-align the subtitle
    marginBottom: 24, // Add space below the subtitle
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light gray background for placeholder
    borderRadius: 8, // Rounded edges
    padding: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic", // Emphasize placeholder text
  },
});

export default WorkoutPage;
