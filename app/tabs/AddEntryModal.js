import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import db from "../../database/db"; // Ensure this import is correct

const NUTRITIONIX_API_URL =
  "https://trackapi.nutritionix.com/v2/natural/exercise";
const APP_ID = "42056e9e"; // Your Application ID
const APP_KEY = "aa1b4ca1bd4fed735f4c8d3979166b4d"; // Your Application Key
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddEntryModal = ({ navigation }) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Load fonts
  const [loaded] = Font.useFonts({
    MontserratMedium: require("../../assets/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
    MontserratRegular: require("../../assets/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
  });

  if (!loaded) {
    return null; // Render nothing until fonts are loaded
  }

  // Function to fetch calories from Nutritionix
  const fetchCalories = async () => {
    if (!exercise || !duration) return;

    setLoading(true); // Start loading indicator
    try {
      const response = await fetch(NUTRITIONIX_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": APP_ID,
          "x-app-key": APP_KEY,
        },
        body: JSON.stringify({
          query: `${exercise} for ${duration} minutes`,
        }),
      });

      const result = await response.json();
      console.log("Nutritionix API response:", result);

      if (result.exercises && result.exercises.length > 0) {
        setCalories(Math.round(result.exercises[0].nf_calories)); // Use the first exercise's calories
      } else {
        Alert.alert("Error", "Could not calculate calories. Try again.");
      }
    } catch (error) {
      console.error("Error fetching calories from Nutritionix API:", error);
      Alert.alert("Error", "Failed to fetch calories. Please try again.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Automatically fetch calories when exercise or duration changes
  useEffect(() => {
    fetchCalories();
  }, [exercise, duration]);

  // Insert workout into the database
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
      <Text style={styles.caloriesText}>
        Calories Burned:{" "}
        {loading ? (
          <ActivityIndicator size="small" color="tomato" />
        ) : (
          calories || "Waiting for exercise input..."
        )}
      </Text>
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
    fontFamily: "MontserratMedium",
    marginBottom: windowHeight * 0.05,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    fontFamily: "MontserratRegular",
  },
  notesInput: {
    height: 80,
    textAlignVertical: "top",
  },
  caloriesText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: "#555",
    marginBottom: 12,
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
    fontFamily: "MontserratMedium",
    fontSize: 16,
  },
});

export default AddEntryModal;
