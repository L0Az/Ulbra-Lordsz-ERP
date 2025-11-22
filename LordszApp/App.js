import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_300Light, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TireControlScreen from './src/screens/TireControlScreen';
import MovementScreen from './src/screens/MovementScreen';
import AddVehicleScreen from './src/screens/AddVehicleScreen';
import EditVehicleScreen from './src/screens/EditVehicleScreen';
import AddTireScreen from './src/screens/AddTireScreen';
import TireDetailScreen from './src/screens/TireDetailScreen';
import TireActionsScreen from './src/screens/TireActionsScreen';
import ScanScreen from './src/screens/ScanScreen';
import { VehicleProvider } from './src/context/VehicleContext';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <VehicleProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TireControl" component={TireControlScreen} />
          <Stack.Screen name="Movement" component={MovementScreen} />
          <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
          <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
          <Stack.Screen name="AddTire" component={AddTireScreen} />
          <Stack.Screen name="TireDetail" component={TireDetailScreen} />
          <Stack.Screen name="TireActions" component={TireActionsScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </VehicleProvider>
  );
}
