import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExerciseScreen from '../screens/ExerciseScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Exercise: { lessonId: string };
};

export type TabParamList = {
  Home: undefined;
  Lessons: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#58CC02',
        tabBarInactiveTintColor: '#AFAFAF',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Öğren',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          tabBarLabel: 'Dersler',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>📚</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={HomeTabs} />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{
            headerShown: true,
            headerTitle: 'Egzersiz',
            headerTintColor: '#58CC02',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
