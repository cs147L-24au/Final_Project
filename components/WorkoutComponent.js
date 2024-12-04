import db from '../database/db'; // Import your Supabase client

export async function fetchWorkouts(userId) {
  try {
    const { data, error } = await db
      .from('WorkoutEntry') // The table name in your Supabase database
      .select('*') // Fetch all columns
      .eq('user_id', userId) // Filter by the logged-in user ID
      .order('created_at', { ascending: false }); // Sort by most recent

    if (error) {
      console.error('Error fetching workouts:', error);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching workouts:', error);
    return [];
  }
}

export async function insertWorkout(userId, exercise, mood, calories, duration = null, notes = null) {
  try {
    const { data, error } = await db.from('WorkoutEntry').insert([
      {
        user_id: userId, // The user's ID
        exercise, // The workout name
        mood, // User's mood (e.g., happy, sad, neutral)
        calories, // Calories burned
        duration, // Duration of the workout (optional)
        notes, // Custom notes (optional)
        created_at: new Date().toISOString(), // Timestamp
      },
    ]);

    if (error) {
      console.error('Error inserting workout:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error inserting workout:', error);
    return null;
  }
}

// Delete a workout entry by ID 
export async function deleteWorkout(workoutId) {
  try {
    const { data, error } = await db.from('WorkoutEntry').delete().eq('id', workoutId);

    if (error) {
      console.error('Error deleting workout:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error deleting workout:', error);
    return null;
  }
}
