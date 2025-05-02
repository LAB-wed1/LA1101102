import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

// Placeholder components for screens
const LoginScreen = () => <View><Text>Login Screen</Text></View>;
const RegisterScreen = () => <View><Text>Register Screen</Text></View>;
const ForgotScreen = () => <View><Text>Forgot Screen</Text></View>;
const HomeScreen = () => <View><Text>Home Screen</Text></View>;
const CartScreen = () => <View><Text>Cart Screen</Text></View>;
const ProfileScreen = () => <View><Text>Profile Screen</Text></View>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Main section
const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App Navigator
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

// กำหนดสไตล์ของ App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6e9',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 15,
    paddingTop: 10,
  },
});

export default App;