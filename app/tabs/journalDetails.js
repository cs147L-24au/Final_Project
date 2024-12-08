import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import db from "@/database/db";
import { useNavigation } from "@react-navigation/native";

export default function JournalDetails({ route }) {
  const navigation = useNavigation();
  const { entryText, timestamp, postId } = route.params; // Ensure `postId` is included in params
  const [text, setText] = useState(entryText); // Editable text state
  const [isSaving, setIsSaving] = useState(false); // Save state

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (!postId) {
        Alert.alert("Error", "Cannot update entry without a valid post ID.");
        return;
      }

      const { data, error } = await db
        .from("JournalEntry")
        .update({ text }) // Update the text column
        .eq("post_id", postId); // Match the row by `post_id`

      if (error) {
        console.error("Error updating journal entry:", error);
        Alert.alert("Error", "Failed to save changes. Please try again.");
      } else {
        Alert.alert("Success", "Your entry has been updated!");
        navigation.goBack(); // Go back to the previous screen
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entryContainer}>
        {/* Display timestamp */}
        <Text style={styles.date}>{new Date(timestamp).toDateString()}</Text>

        {/* Editable TextInput */}
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={(value) => setText(value)}
          placeholder="Edit your journal entry here..."
        />

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSaving} // Disable button while saving
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    padding: 16,
  },
  entryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  entryText: {
    fontSize: 16,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50", // Green color for save button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7", // Lighter green when disabled
  },
});
