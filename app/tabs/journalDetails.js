import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function JournalDetails({ route }) {
  const { entryText, timestamp } = route.params; // Access passed data

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entryContainer}>
        <Text style={styles.date}>{new Date(timestamp).toDateString()}</Text>
        <Text style={styles.entryText}>{entryText}</Text>
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
});
