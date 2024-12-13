import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import db from "@/database/db";
import JournalComponent from "@/components/JournalComponent";
import { useNavigation } from "expo-router";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

const Journal = () => {
  const navigation = useNavigation();
  const [entry, setEntry] = useState(null); // Where journal entries are stored
  const [fontsLoaded] = Font.useFonts({
    MontserratAlternates: require("../../assets/Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf"),
  });

  const fetchData = async () => {
    try {
      const { data, error } = await db.from("JournalEntry").select("*");
      if (error) {
        console.error("Error fetching journal data:", error);
      } else {
        console.log("Fetched entries: ", data); // Log fetched data
        setEntry(data); // Update state
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Re-fetch data when navigating back to the screen
  useFocusEffect(
    useCallback(() => {
      console.log("Fetching data on focus...");
      fetchData();
    }, [])
  );

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  /* If else statement for rendering */
  let contentDisplayed;
  if (entry == null) {
    contentDisplayed = <Text style={styles.loadDataText}>Getting Data...</Text>;
  } else {
    contentDisplayed = (
      <SafeAreaView style={styles.entryListContainer}>
        {/* Title and Subtitle */}
        <Text style={[styles.title, { fontFamily: "MontserratAlternates" }]}>
          Your Mental Wellness Journey
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "MontserratRegular" }]}>
          Document your reflections and track your progress
        </Text>

        <FlatList
          data={entry}
          keyExtractor={(item) => item.post_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("JournalDetails", {
                  postId: item.post_id,
                  entryText: item.text,
                  timestamp: item.created_at,
                  mood: item.mood, // Pass mood to details page
                })
              }
            >
              <JournalComponent
                entryText={item.text.substring(0, 100) + "..."}
                timestamp={item.created_at}
                moodEmoji={item.mood} // Pass mood to component
              />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddEntry")} // Goes to add journal
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>{contentDisplayed}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8AB17D",
    padding: 16,
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
  loadDataText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  entryListContainer: {
    flex: 1,
    width: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#264653",
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

export default Journal;
