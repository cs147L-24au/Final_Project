import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./home";
import Journal from "./journal";
import Profile from "./profile";
import Workout from "./workout";

// Commented out the custom fonts for now
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

const Tab = createBottomTabNavigator();

export default function Layout() {
  // Placeholder for the fonts logic, commented out for now
  /*
  const [fontsLoaded] = useFonts({
    "Sniglet-ExtraBold": require("../../assets/fonts/Sniglet-ExtraBold.ttf"),
    "Sniglet-Regular": require("../../assets/fonts/Sniglet-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  */

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Journal") iconName = "book";
          else if (route.name === "Profile") iconName = "person";
          else if (route.name === "Workouts") iconName = "fitness";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Hides default header
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Workouts" component={Workout} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
