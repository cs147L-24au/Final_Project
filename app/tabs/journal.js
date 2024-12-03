import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
//import Feed from "@/components/Feed";
import Loading from "@/components/Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";
import JournalComponent from "@/components/JournalComponent";

/*
1) want to pass in data from home to journal.
the data that I am pulling I want to save as a usestate in Home.js
*/
export default function Journal() {
  const [entry, setEntry] = useState(null); // where I will store data
  const fetchData = async () => {
    // fetching the data
    try {
      const data = await db.from("JournalEntry").select("*");
      console.log("Journal Page: Here are all the fetched entries: ", data);
      setEntry(data.data); // grabbing data
    } catch (err) {
      console.error("Error: failed to setPosts: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*  if else statement for rendering */
  if (entry == null) {
    contentDisplayed = <Text style={styles.loadDataText}>Getting Data</Text>;
  } else {
    console.log("changed component", entry); // no need to do entry.data
    contentDisplayed = (
      <SafeAreaView style={styles.entryListContainer}>
        <View style={styles.headerContentContainer}>
          <Text style={styles.headerJournalTxt}>My Journals</Text>
        </View>

        <FlatList
          data={entry} // no need to do entry.data
          renderItem={({ item }) => {
            console.log("here is item", item);
            return (
              <JournalComponent
                entryText={item.text}
                timestamp={item.created_at}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>{contentDisplayed}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c05ef4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerJournalTxt: {
    color: "white",
    fontWeight: "600",
    fontSize: "30",
  },
  loadDataText: {
    color: "white",
    fontWeight: "600",
    fontSize: "15",
  },
  entryListContainer: {
    flex: 1,
    width: "100%",
  },
});
