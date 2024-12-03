import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
//import Feed from "@/components/Feed";
import Loading from "@/components/Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";

/*
1) want to pass in data from home to journal.
the data that I am pulling I want to save as a usestate in Home.js

2)
for now, display data in journal. but once I have that figured out, we need to 
display the data in an outer most layer so that it is accessible from both homepage 
and tabs since we are trying to get to journal page in two ways.
*/
export default function Journal() {
  const [entry, setEntry] = useState(null); // where I will store data

  const fetchData = async () => { // fetching the data
    try {
      const data = await db.from('JournalEntry').select('*');
      console.log("Here are all the fetched entries: ", data);
      setEntry(data);
    } catch (err) {
      console.error("Error: failed to setPosts: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>journal Page</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  postTitle: {
    padding: 12,
  },
  userContainer: {
    width: "100%",
    marginTop: 12,
    paddingHorizontal: 12,
  },
  userTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "bold",
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
    paddingLeft: 8,
  },
  buttonText: {
    fontWeight: "bold",
    color: Theme.colors.textHighlighted,
    fontSize: Theme.sizes.textMedium,
  },
});
