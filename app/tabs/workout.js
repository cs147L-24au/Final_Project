import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WorkoutPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Page</Text>
      <Text style={styles.subtitle}>Track your workouts and progress here!</Text>
      {/* Add  workout components or features  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default WorkoutPage;
