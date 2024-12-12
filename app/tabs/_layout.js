import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "./home";
import Journal from "./journal";
import Workout from "./workout";
import AddEntryModal from "./AddEntryModal"; // Import the Add Entry modal component
import AddEntry from "./AddEntry"; // lowercase might be error??

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Stack for including modals

// Define the Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Journal") iconName = "book";
          else if (route.name === "Workouts") iconName = "fitness";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Hides default header for tabs
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Workouts" component={Workout} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <Stack.Navigator>
      {/* Main Tab Navigator */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Hide header for tabs
      />

      {/* Modal Screen for Adding Entries */}
      <Stack.Screen
        name="AddEntryModal"
        component={AddEntryModal}
        options={{
          presentation: "modal", // Makes it a modal
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddEntry"
        component={AddEntry}
        options={{
          presentation: "modal", // Makes it a modal
          headerShown: false, // Show a header for the modal
        }}
      />

      <Stack.Screen
        name="JournalDetails"
        component={require("./journalDetails").default} // Dynamically load the screen
        options={{
          title: "Journal Details", // Set a title for the header
          presentation: "modal", // Makes it consistent with other modals
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
