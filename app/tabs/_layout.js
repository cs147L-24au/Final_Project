import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import theme from '@/assets/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'white', headerShown:false, tabBarStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      }
      }}> 

      {/*
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => 
            <MaterialCommunityIcons size={size} name="beehive-outline" color={color} />,
        }}
       
      />
       */}
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ size, color }) => 
            <FontAwesome size={size} name="user" color={color} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}>My Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
    
    
  );

}