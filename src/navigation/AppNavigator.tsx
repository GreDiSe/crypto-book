import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import TabBar from '../components/TabBar';
import HomeScreen, { screenOptions as HomeOptions } from '../screens/Home';
import NewsScreen, { screenOptions as NewsOptions } from '../screens/News';
import PortfolioScreen from '../screens/Portfolio';
import PricesScreen from '../screens/Prices';
import SettingsScreen from '../screens/Settings';
import { StartScreen, Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen} from "../screens/auth";

export type RootStackParamList = {
  HomeScreen: undefined;
  News: undefined;
  Auth: undefined;
  AuthStack: undefined;
  TabStack: undefined;
    Dashboard: undefined;
    RegisterScreen: undefined;
    LoginScreen: undefined;
    StartScreen: undefined;
    ResetPasswordScreen: undefined;
};

const HomeStackNavigator = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={NewsOptions}>
      <HomeStackNavigator.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={HomeOptions}
      />
      <HomeStackNavigator.Screen name='News' component={NewsScreen} />
    </HomeStackNavigator.Navigator>
  );
};

const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={(props) => <TabBar {...props} />}>
      <TabBarNavigator.Screen name='Home' component={HomeNavigator} />
      <TabBarNavigator.Screen name='Portfolio' component={PortfolioScreen} />
      <TabBarNavigator.Screen name='Prices' component={PricesScreen} />
      <TabBarNavigator.Screen name='Settings' component={SettingsScreen} />
    </TabBarNavigator.Navigator>
  );
};

const AuthStackNavigator = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <AuthStackNavigator.Screen name="StartScreen" component={StartScreen} />
            <AuthStackNavigator.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStackNavigator.Screen name="RegisterScreen" component={RegisterScreen} />
            <AuthStackNavigator.Screen name="Dashboard" component={Dashboard} />
            <AuthStackNavigator.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
            />
        </AuthStackNavigator.Navigator>
    );
};

const MainStackNavigator = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <MainStackNavigator.Screen
                name="AuthStack"
                component={AuthNavigator}
            />
            <MainStackNavigator.Screen
                name="TabStack"
                component={TabNavigator}
            />
        </MainStackNavigator.Navigator>
    );
};


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
