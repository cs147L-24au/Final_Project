import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs Layout */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} />

      {/* AddJournal Screen */}
      <Stack.Screen
        name="AddEntry"
        options={{
          title: "Add Journal Entry", 
          presentation: "modal"
        }}
      />
    </Stack>
  );
}