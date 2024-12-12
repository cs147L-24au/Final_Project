import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import db from "@/database/db";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function JournalDetails({ route }) {
  const navigation = useNavigation();
  const { entryText, timestamp, postId, mood } = route.params;
  const [loaded] = Font.useFonts({
    MontserratMedium: require("../../assets/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
    MontserratRegular: require("../../assets/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
  });

  const [text, setText] = useState(entryText);
  const [selectedMood, setSelectedMood] = useState(mood || null);
  const [isSaving, setIsSaving] = useState(false);

  if (!loaded) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (!postId) {
        Alert.alert("Error", "Cannot update entry without a valid post ID.");
        return;
      }

      const { data, error } = await db
        .from("JournalEntry")
        .update({ text, mood: selectedMood })
        .eq("post_id", postId);

      if (error) {
        console.error("Error updating journal entry:", error);
        Alert.alert("Error", "Failed to save changes. Please try again.");
      } else {
        Alert.alert("Success", "Your entry has been updated!");
        navigation.goBack();
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>Edit Journal Entry</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              value={text}
              onChangeText={(value) => setText(value)}
              placeholder="Edit your journal entry here..."
            />
          </View>

          <View style={styles.moodContainer}>
            {["😊", "😢", "😡", "😴", "😃", "🤔"].map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emojiBox,
                  selectedMood === emoji && styles.selectedEmojiBox,
                ]}
                onPress={() => setSelectedMood(emoji)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.saveInButton, isSaving && styles.disabledButton]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8AB17D",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  textInput: {
    fontFamily: "MontserratRegular",
    backgroundColor: "white",
    fontSize: 16,
    height: windowHeight * 0.45,
    textAlignVertical: "top",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DFF6DD",
    borderRadius: 10,
    padding: 10,
    width: windowWidth * 0.8,
    marginBottom: 20,
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
  saveInButton: {
    backgroundColor: "#264653",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    borderColor: "white",
    width: windowWidth * 0.4,
    height: windowHeight * 0.07,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "MontserratMedium",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7",
  },
});
