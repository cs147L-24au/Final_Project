import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import db from "@/database/db";
import { useNavigation } from "expo-router";
import * as Font from "expo-font";
import axios from "axios";

const HomePage = () => {
  const [fontsLoaded] = Font.useFonts({
    MontserratAlternates: require("../../assets/Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf"),
  });

  const [journalStreak, setJournalStreak] = useState(0);
  const [randomJournal, setRandomJournal] = useState("");
  const [randomPostId, setRandomPostId] = useState(null);
  const [randomTimestamp, setRandomTimestamp] = useState("");
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      // Fetch journal entries
      const { data: journalData, error: journalError } = await db
        .from("JournalEntry")
        .select("*")
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        ); // Last 7 days

      if (journalError) {
        console.error("Error fetching journal data:", journalError);
      } else if (journalData) {
        setJournalStreak(journalData.length);
        if (journalData.length > 0) {
          const randomIndex = Math.floor(Math.random() * journalData.length);
          const randomEntry = journalData[randomIndex];
          setRandomJournal(randomEntry.text || "No reflection found.");
          setRandomPostId(randomEntry.post_id);
          setRandomTimestamp(randomEntry.created_at);
        } else {
          setRandomJournal("No entries available.");
          setRandomPostId(null);
          setRandomTimestamp("");
        }
      }

      // Fetch workout entries
      const { data: workoutData, error: workoutError } = await db
        .from("WorkoutEntry")
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
        setWorkoutStreak(workoutData.length);
        const totalCalories = workoutData.reduce(
          (sum, workout) => sum + (workout.calories || 0),
          0
        );
        setCaloriesBurned(totalCalories);
      }
    } catch (err) {
      console.error("Unexpected error in fetchData:", err);
    }
  };

  const fetchQuote = async () => {
    try {
      const category = "inspirational";
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "X-Api-Key": "+Vn15D29q6nYruzh1zGK7Q==ymMZbR3C1CwVyY0M",
        },
      });

      if (response.status === 200) {
        const quote = response.data[0].quote;
        const author = response.data[0].author;
        setQuoteText(quote);
        setQuoteAuthor(author);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchQuote();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <Text style={[styles.title, { fontFamily: "MontserratAlternates" }]}>
          Hello, there!
        </Text>
        <Text style={styles.subtitle}>Your Week at a Glance</Text>

        {/* Overview Section */}
        <View style={styles.overview}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Journal Entries</Text>
            <Text style={styles.streak}>{journalStreak}/7 Days</Text>
            <Text style={styles.reflection}>
              Reflection from 2 days ago: {randomJournal}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (randomPostId && randomTimestamp) {
                  navigation.navigate("JournalDetails", {
                    postId: randomPostId,
                    entryText: randomJournal,
                    timestamp: randomTimestamp,
                  });
                }
              }}
            >
              <Text style={styles.buttonText}>How do you feel now?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Workout Streak</Text>
            <Text style={styles.streak}>{workoutStreak}/7 Days</Text>
            <Text style={styles.reflection}>
              Burned {caloriesBurned} Calories 🔥
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Workouts")}
            >
              <Text style={styles.buttonText}>Keep it up!</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quote Section */}

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quoteText}</Text>
          <Text style={styles.quoteAuthor}>- {quoteAuthor}</Text>
          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={fetchQuote}
          >
            <Text style={styles.regenerateButtonText}>Regenerate Quote</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9C46A",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
    color: "white",
    fontFamily: "MontserratAlternates",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "MontserratAlternates",
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  box: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold", // Keep titles bold
    marginBottom: 8,
    fontFamily: "MontserratAlternates",
  },
  streak: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "MontserratRegular", // Use regular font for content
  },
  reflection: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "MontserratRegular", // Use regular font for content
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "MontserratAlternates",
  },
  quoteContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quote: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "MontserratRegular", // Use regular font for content
  },
  quoteAuthor: {
    textAlign: "right",
    fontStyle: "italic",
    marginTop: 8,
    fontFamily: "MontserratRegular", // Use regular font for content
  },
  regenerateButtonText: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: "MontserratRegular",
  },
});

export default HomePage;
