import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import db from "@/database/db";

const HomePage = ({ navigation }) => {
  const [journalStreak, setJournalStreak] = useState(0); // Journal streak
  const [randomJournal, setRandomJournal] = useState(""); // Random journal reflection
  const [workoutStreak, setWorkoutStreak] = useState(0); // Workout streak
  const [caloriesBurned, setCaloriesBurned] = useState(0); // Calories burned
  const [userName, setUserName] = useState("User"); // Placeholder for user name

  const fetchData = async () => {
    try {
      // Fetch journal entries
      const { data: journalData, error: journalError } = await db
        .from("JournalEntry") // Replace with your Supabase table name
        .select("*")
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        ); // Last 7 days

      if (journalError) {
        console.error("Error fetching journal data:", journalError);
      } else if (journalData) {
        setJournalStreak(journalData.length); // Number of journal entries in the last 7 days
        if (journalData.length > 0) {
          const randomIndex = Math.floor(Math.random() * journalData.length);
          setRandomJournal(
            journalData[randomIndex]?.text || "No reflection found."
          );
        }
      }

      // Fetch workout entries
      const { data: workoutData, error: workoutError } = await db
        .from("WorkoutEntry") // Replace with your Supabase table name
        .select("calories, created_at")
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        ); // Last 7 days

      if (workoutError) {
        console.error("Error fetching workout data:", workoutError);
        setWorkoutStreak(0);
        setCaloriesBurned(0);
      } else if (workoutData) {
        setWorkoutStreak(workoutData.length); // Number of workout entries in the last 7 days
        const totalCalories = workoutData.reduce(
          (sum, workout) => sum + (workout.calories || 0),
          0
        );
        setCaloriesBurned(totalCalories); // Total calories burned
      }

      // Fetch user name
      const { data: userData, error: userError } = await db
        .from("Users") // Replace with your Supabase user table name
        .select("name")
        .single();

      if (userError) {
        console.error("Error fetching user name:", userError);
      } else if (userData) {
        setUserName(userData.name || "User");
      }

      console.log("Fetched data successfully!");
    } catch (err) {
      console.error("Unexpected error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, there!</Text>
      </View>

      {/* Weekly Overview Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Week at a Glance</Text>

        <View style={styles.overview}>
          {/* Journal Streak */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Journal Entries</Text>
            <Text style={styles.streak}>{journalStreak}/7 Days</Text>
            <Text style={styles.reflection}>
              Reflection from 2 days ago: {randomJournal}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Journal")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>How do you feel now?</Text>
            </TouchableOpacity>
          </View>

          {/* Workout Streak */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Workout Streak</Text>
            <Text style={styles.streak}>{workoutStreak}/7 Days</Text>
            <Text style={styles.reflection}>
              Burned {caloriesBurned} Calories 🔥
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Workouts")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Keep it up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quote of the Day Section */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>"Consistency is the key to progress."</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold", // Placeholder for custom font
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold", // Placeholder for custom font
    marginBottom: 24,
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  box: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold", // Placeholder for custom font
    marginBottom: 8,
  },
  streak: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  reflection: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  quoteContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginTop: 24,
  },
  quote: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 16,
  },
});

export default HomePage;
