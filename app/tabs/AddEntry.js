import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Dimensions, View } from "react-native";
import { useRouter } from "expo-router";
import db from "@/database/db";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AddEntry() {

  const router = useRouter();
  const [text, setText] = useState("");

  const saveInputText = async () => {
      if (!text.trim()) {
          alert("Please write something!");
          return;
        }
      try {
          await db.from("JournalEntry").insert([{ text, created_at: new Date(), user_id: 12345 }]);
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
              placeholder="Write your entry here..."
              multiline
              value={text}
              onChangeText={setText}
              />
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
      backgroundColor: "#8AB17D",
      padding: 20,
      justifyContent: "center",
      alignItems: 'center'
      //justifyContent: 'space-between'
    },
    title: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      position: 'relative',
      top: -60
    },
    textInputContainer: {
      backgroundColor: "white",
      padding: 20,
      justifyContent: "center",
      height: windowHeight * 0.5,
      width: windowWidth * 0.8,
      borderRadius: 10,
      borderColor: "grey",
      borderStyle: 'solid',
      borderWidth: 1,
      position: 'relative',
      top: -50
    },
    textInput: {
      backgroundColor: "white",
      fontSize: 16,
      height: windowHeight * 0.45,
      textAlignVertical: "top",
    },
    saveInButton: {
      backgroundColor: "white",
      paddingVertical: 15,
      alignItems: "center",
      borderRadius: 100,
      borderColor:  "white",
      width: windowWidth * 0.5,
      height: windowHeight * 0.07,
      position: 'relative',
      top: 40,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    saveButtonText: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
    },
  });