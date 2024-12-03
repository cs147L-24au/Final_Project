import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, [NAME]</Text>
      </View>

      {/* Weekly Overview Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Week at a Glance</Text>

        <View style={styles.overview}>
          {/* Journal Streak */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Journal Entries</Text>
            <Text style={styles.streak}>3/7 Days</Text>
            <Text style={styles.reflection}>
              Reflection from 2 days ago: [PREV_JOURNAL_ENTRY]
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
            <Text style={styles.streak}>4/7 Days</Text>
            <Text style={styles.reflection}>Burned [X] Calories 🔥</Text>
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
