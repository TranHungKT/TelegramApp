import React from 'react';
import { useColorScheme } from 'react-native';

import { linking } from '@Configs/index';
import { LoginScreen, HomeScreen } from '@Screens/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainTabBar } from '../components/MainTabBar/MainTabBar';
import { navigationRef, useBackButtonHandler } from './NavigationUtilities';

export type MainNavigatorParamList = {
  AllMessageScreen: undefined;
  ImportantMessageScreen: undefined;
  UnreadMessageScreen: undefined;
  ReadMessageScreen: undefined;
};

const MainBottomTabStack = createBottomTabNavigator<MainNavigatorParamList>();

const MainBottomTab = () => {
  return (
    <MainBottomTabStack.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <MainBottomTabStack.Screen
        name="AllMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'All',
          tabBarIcon: () => <></>,
        }}
      />
      <MainBottomTabStack.Screen
        name="ImportantMessageScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Important',
          tabBarIcon: () => <></>,
        }}
      />
      <MainBottomTabStack.Screen
        name="UnreadMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Unread',
          tabBarIcon: () => <></>,
        }}
      />
      <MainBottomTabStack.Screen
        name="ReadMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Read',
          tabBarIcon: () => <></>,
        }}
      />
    </MainBottomTabStack.Navigator>
  );
};

export type NavigatorParamList = {
  LoginScreen: undefined;
  MainBottomTab: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainBottomTab"
    >
      <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      linking={linking}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['welcome'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
