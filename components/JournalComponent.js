import { Text, View, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function JournalComponent({ timestamp, entryText, moodEmoji }) {
  console.log("Testing if data is being passed", timestamp, entryText, moodEmoji);

  return (
    <View style={styles.outerBox}>
      {/* Timestamp Section */}
      <View style={styles.timeStampOuter}>
        <Text style={styles.timeStampText}>
          {"📝 " + new Date(timestamp).toLocaleDateString()}
        </Text>
      </View>

      {/* Journal Entry Section */}
      <View style={styles.entryRow}>
        {moodEmoji && (
          <Text style={styles.emojiText}>{moodEmoji}</Text> // Emoji on the same row
        )}
        <Text style={styles.journalText} numberOfLines={1}>
          {entryText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: "#f9f9f9",
    flexDirection: "column",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timeStampOuter: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  timeStampText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "MontserratMedium",
  },
  entryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 24,
    marginRight: 8,
  },
  journalText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "normal",
    fontFamily: "MontserratRegular",
    flexShrink: 1
  },
});
