import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";
import JournalComponent from "@/components/JournalComponent";
import { useNavigation } from "expo-router";
import * as Font from "expo-font";


export default function Journal() {
  const [loaded] = Font.useFonts({
    MontserratMedium: require("../../assets/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
    MontserratRegular: require("../../assets/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
  });
    
  const navigation = useNavigation();
  
  const router = useRouter(); // to help navigate to another screen
  const [entry, setEntry] = useState(null); // where I will store data
  const fetchData = async () => {
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

  if (!loaded) {
    return null; // Render nothing until fonts are loaded
  }

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
        <View>
          <Text style={styles.subheaderJournalTxt}>oh how you've grown!</Text>
          </View>

        <FlatList
          data={entry} // no need to do entry.data
          renderItem={({ item }) => {
            console.log("here is item", item);
            return (
              <JournalComponent
                entryText={item.text}
                timestamp={item.created_at}
                moodEmoji={item.mood}
              />
            );
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddEntry")} // goes to add journal
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
    backgroundColor: "#8AB17D", //  above header
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  headerContentContainer: {
    //flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#8AB17D",
    alignItems: 'center'
  },
  headerJournalTxt: {
    color: "white",
    fontWeight: "600",
    fontSize: "30",
    fontFamily: "MontserratAlternates"
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
    fontSize: "15",
  },
  entryListContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#8AB17D"
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
