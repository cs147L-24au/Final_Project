import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import db from "@/database/db";

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
          <TextInput
            style={styles.input}
            placeholder="Write your entry here..."
            multiline
            value={text}
            onChangeText={setText}
            />
          <TouchableOpacity style={styles.saveInButton} onPress={saveInputText}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "pink",
      padding: 20,
      justifyContent: "center",
    },
    title: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    textInput: {
      backgroundColor: "white",
      fontSize: 16,
      height: 150,
      textAlignVertical: "top",
    },
    saveButton: {
      backgroundColor: "white",
      paddingVertical: 15,
      alignItems: "center",
    },
    saveButtonText: {
      color: "#c05ef4",
      fontSize: 18,
      fontWeight: "bold",
    },
  });