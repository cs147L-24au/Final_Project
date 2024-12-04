import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import db from "../../database/db";
import WorkoutComponent from "../../components/WorkoutComponent";
import { useNavigation } from "expo-router";
const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]); // State to store workout data
  const [loading, setLoading] = useState(true); // State for loading status
  const navigation = useNavigation(); // Move this inside the component

  // Function to fetch data from Supabase
  const fetchData = async () => {
    try {
      console.log("Fetching workout data...");
      const { data, error } = await db
        .from("WorkoutEntry")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching workouts from Supabase:", error);
        setWorkouts([]);
      } else {
        console.log("Workout data fetched successfully:", data);
        setWorkouts(data); // Update state with fetched data
      }
    } catch (err) {
      console.error("Unexpected error fetching workouts:", err);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Log the `workouts` state before rendering
  // console.log("Workouts state:", workouts);

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Your Physical Wellness Journey</Text>

      {/* Subtitle or Instructions */}
      <Text style={styles.subtitle}>
        Document your workouts to see your journey unfold
      </Text>

      {/* FlatList to display workout entries */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => {
          //   console.log("KeyExtractor for item:", item.id); // Log item ID
          return item.id.toString();
        }}
        renderItem={({ item }) => {
          //   console.log("Rendering item in FlatList:", item); // Log each item passed to renderItem
          return (
            <WorkoutComponent
              exercise={item.exercise}
              calories={item.calories}
              duration={item.duration}
              notes={item.notes}
              timestamp={item.created_at}
            />
          );
        }}
        ListEmptyComponent={
          !loading && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                No workouts logged yet.
              </Text>
            </View>
          )
        }
      />

      {/* Floating "+" Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEntryModal")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { // app background
    flex: 1,
    backgroundColor: "#F4A261",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
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
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default WorkoutPage;
