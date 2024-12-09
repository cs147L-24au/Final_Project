import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import db from "@/database/db";
import JournalComponent from "@/components/JournalComponent";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Journal() {
  const navigation = useNavigation();
  const [entry, setEntry] = useState(null); // Where journal entries are stored

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

  /* If else statement for rendering */
  if (entry == null) {
    contentDisplayed = <Text style={styles.loadDataText}>Getting Data...</Text>;
  } else {
    contentDisplayed = (
      <SafeAreaView style={styles.entryListContainer}>
        <View style={styles.headerContentContainer}>
          <Text style={styles.headerJournalTxt}>My Journals</Text>
        </View>

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
          onPress={() => navigation.navigate("popUps/addEntry")} // Goes to add journal
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>{contentDisplayed}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8AB17D",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#8AB17D",
  },
  headerJournalTxt: {
    color: "white",
    fontWeight: 'bold',
    fontSize: "30",
    fontFamily: "MontserratAlternates",
  },
  subheaderJournalTxt: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    color: "white",
  },
  loadDataText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  entryListContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#8AB17D",
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
