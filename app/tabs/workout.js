import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "expo-router";
import * as Font from "expo-font";
import db from "../../database/db";
import WorkoutComponent from "../../components/WorkoutComponent";

const WorkoutPage = () => {
  // Load fonts
  const [fontsLoaded] = Font.useFonts({
    MontserratAlternates: require("../../assets/Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf"),
  });

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const { data, error } = await db
        .from("WorkoutEntry")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setWorkouts([]);
      } else {
        setWorkouts(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Ensure fonts are loaded before rendering
  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Title with the custom font */}
      <Text style={[styles.title, { fontFamily: "MontserratAlternates" }]}>
        Your Physical Wellness Journey
      </Text>

      <Text style={styles.subtitle}>
        Document your workouts to see your journey unfold
      </Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutComponent
            exercise={item.exercise}
            calories={item.calories}
            duration={item.duration}
            notes={item.notes}
            timestamp={item.created_at}
          />
        )}
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
  container: {
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
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    color: "white",
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
    color: "white",
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
