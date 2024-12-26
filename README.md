# MyJourney

## Overview

**MyJourney** is a mobile application designed to help users track and improve their physical and mental wellness. With features like workout tracking, journaling, and daily inspirational quotes, the app provides a holistic view of the user’s wellness journey while encouraging consistency.

This app integrates modern software technologies, including **React Native**, **Supabase**, and external APIs like **Nutritionix** and **API Ninjas Quotes**, showcasing a practical and scalable implementation of full-stack engineering principles.

---

## Features

### 1. **Home Page**
- **Overview of Wellness Progress**: Displays weekly streaks for journal entries and workouts, along with total calories burned.
- **Motivational Quotes**: Fetches and displays inspirational quotes from the [API Ninjas Quotes API](https://www.api-ninjas.com/api/quotes) based on a selected category (e.g., inspirational). Users can press a button to generate a new quote.

### 2. **Workout Tracking**
- **Record Workouts**: Users can log workouts with fields such as exercise name, duration, calories burned, and optional notes.
- **Automatic Calories Calculation**: The app integrates with the [Nutritionix API](https://www.nutritionix.com/) to automatically estimate calories burned based on the workout input.
- **Workout History**: A dedicated page lists all past workouts, allowing users to view their progress and accomplishments.

### 3. **Journal Entries**
- **Daily Reflections**: Users can write journal entries to track their mental well-being.
- **Mood Tracking**: Each journal entry can include a mood emoji for quick emotional logging.
- **Weekly Journal Summary**: Highlights a random reflection from the week, providing users with a reminder of their progress.

### 4. **Integration with Supabase**
- **Database Management**: Supabase is used to store and manage data for workouts and journal entries as separate tables.
- **Real-Time Data Syncing**: Data is fetched and displayed dynamically, ensuring up-to-date tracking across sessions.

---

## Technical Highlights

- **Frontend**: Built with React Native for cross-platform compatibility (iOS and Android).
- **Backend**: Supabase for database management and real-time updates.
- **APIs**:
  - **Nutritionix**: For automatic calorie estimation in workout tracking.
  - **API Ninjas Quotes**: For fetching daily motivational quotes.
- **Custom Fonts**: Integrated Google Fonts for a polished and cohesive design.
- **State Management**: Utilized `useState`, `useEffect`, and `useFocusEffect` hooks to manage data and navigation efficiently.
