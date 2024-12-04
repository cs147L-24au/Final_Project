import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const mockWorkouts = [
  {
    id: 1,
    exercise: "Running",
    calories: 300,
    mood: "Happy",
    created_at: new Date().toISOString(), // Current date
  },
  {
    id: 2,
    exercise: "Yoga",
    calories: 150,
    mood: "Relaxed",
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday's date
  },
  {
    id: 3,
    exercise: "Cycling",
    calories: 400,
    mood: "Energetic",
    created_at: new Date(Date.now() - 172800000).toISOString(), // Two days ago
  },
];

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);

  // Simulate fetching workouts on mount
  useEffect(() => {
    // Replace this with `fetchWorkouts(userId)` when backend is ready
    setTimeout(() => {
      setWorkouts(mockWorkouts); // Load mock data
    }, 1000); // Simulate a slight delay for fetching
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Your Physical Wellness Journey</Text>

      {/* Subtitle or Instructions */}
      <Text style={styles.subtitle}>
        Log your workouts and see your progress!
      </Text>

      {/* Workout List */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()} // Ensure each workout has a unique ID
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.exercise}</Text>
            <Text style={styles.calories}>Calories Burned: {item.calories}</Text>
            <Text style={styles.mood}>Mood: {item.mood}</Text>
            <Text style={styles.date}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No workouts logged yet.</Text>
          </View>
        }
      />

      {/* Floating "+" Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Add Workout")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  workoutItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 16,
    color: "#555",
  },
  mood: {
    fontSize: 16,
    color: "#777",
  },
  date: {
    fontSize: 14,
    color: "#999",
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
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "tomato",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default WorkoutPage;
