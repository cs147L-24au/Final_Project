import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from "react-native";import { useRouter } from "expo-router";
import db from "@/database/db";
import * as Font from "expo-font";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default function AddEntry() {
const [loaded] = Font.useFonts({
  MontserratMedium: require("../../assets/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
  MontserratRegular: require("../../assets/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
});
  
if (!loaded) {
  return null; // Render nothing until fonts are loaded
}

// adding a comment for testing
  const router = useRouter();
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState(null); // State to track selected mood
  const emojis = ["😊", "😢", "😡", "😴", "😃", "🤔"];

  const saveInputText = async () => {
      if (!text.trim()) {
          alert("Please write something!");
          return;
        }
      try {
          await db.from("JournalEntry").insert([{ text, mood: selectedMood, created_at: new Date(), user_id: 12345 }]);
          alert("Entry saved!");
          router.back(); // Go back to Journal page
        } catch (err) {
          console.error("Error saving entry: ", err);
          alert("Failed to save entry.");
        }
      };

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Add Journal Entry</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="💭 Write your entry here..."
              multiline
              value={text}
              onChangeText={setText}
              />
          </View>
          {/* ADDING CODE FOR MOOD METER */}
          <View style={styles.moodContainer}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMood(emoji)} // Update selected mood
                style={[
                  styles.emojiBox,
                  selectedMood === emoji && styles.selectedEmojiBox, // Highlight if selected
                ]}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveInButton} onPress={saveInputText}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
        
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#8AB17D",
      padding: 20,
      justifyContent: "center",
      alignItems: 'center',

    },
    title: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      position: 'relative',
      top: -50,
      fontFamily: "MontserratMedium",
    },
    textInputContainer: {
      backgroundColor: "white",
      padding: 20,
      justifyContent: "center",
      height: windowHeight * 0.5,
      width: windowWidth * 0.8,
      borderRadius: 10,
      borderColor: "#ddd",
      borderWidth: 1,
      position: 'relative',
      top: -40
    },
    textInput: {
      fontFamily: "MontserratRegular",
      backgroundColor: "white",
      fontSize: 16,
      height: windowHeight * 0.45,
      textAlignVertical: "top",
    },
    saveInButton: {
      backgroundColor: "#264653",
      paddingVertical: 15,
      alignItems: "center",
      borderRadius: 8,
      borderColor:  "white",
      width: windowWidth * 0.4,
      height: windowHeight * 0.07,
      position: 'relative',
      top: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    saveButtonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "MontserratMedium"
    },
    moodContainer: {
      top: -25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#DFF6DD",
      borderRadius: 10,
      padding: 10,
      width: windowWidth * 0.8,
      marginVertical: 20,
    },
    emojiBox: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
    },
    selectedEmojiBox: {
      backgroundColor: "#8AB17D",
    },
    emoji: {
      fontSize: 24,
    },

  });