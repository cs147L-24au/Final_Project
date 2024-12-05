import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import db from "../../database/db"; // Supabase client
windowWidth = Dimensions.get("window").width;
windowHeight = Dimensions.get("window").height;
const AddEntryModal = ({ navigation }) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  // Function to insert a new workout into the database
  const insertWorkout = async (entryData) => {
    try {
      const { data, error } = await db.from("WorkoutEntry").insert([entryData]);
      if (error) {
        console.error("Error inserting workout:", error);
        return null;
      }
      console.log("Workout added successfully:", data);
      return data;
    } catch (err) {
      console.error("Unexpected error inserting workout:", err);
      return null;
    }
  };

  // Handle submission of the form
  const handleAddWorkout = async () => {
    if (!exercise || !duration || !calories) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    const entryData = {
      exercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
      notes,
      user_id: "123", // Replace with dynamic user ID when available
    };

    const result = await insertWorkout(entryData);
    if (result) {
      Alert.alert("Success", "Workout added successfully!");
      navigation.goBack(); // Close the modal
    } else {
      Alert.alert("Error", "Failed to add workout. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Workout Entry</Text>
      <TextInput
        placeholder="Exercise Name"
        style={styles.input}
        value={exercise}
        onChangeText={setExercise}
      />
      <TextInput
        placeholder="Duration (mins)"
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Calories Burned"
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Notes (optional)"
        style={[styles.input, styles.notesInput]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: .20 * windowHeight,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  notesInput: {
    height: 80,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "tomato",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: windowHeight * 0.1,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddEntryModal;
