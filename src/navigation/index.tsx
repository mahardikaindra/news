
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesPage from '../screens/categoriespage';
import SearchPage from '../screens/searchpage';
import ProfilePage from '../screens/profilepage';
import NotificationPage from '../screens/notificationpage';
import HomePage from '../screens/homepage';
import CategoryNewsPage from '../screens/categorynewspage';
import NewsDetailPage from '../screens/newsdetailpage';
import { Ionicons } from '@react-native-vector-icons/ionicons';
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarIcon = (
  route: string,
  focused: boolean,
  color: string,
  size: number
): React.ReactElement => {
  let iconName: 'home' | 'home-outline' | 'list' | 'list-outline' | 'search' | 'search-outline' | 'notifications' | 'notifications-outline' | 'person' | 'person-outline' | 'ellipse-outline';

  if (route === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route === 'Categories') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (route === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route === 'Notifications') {
    iconName = focused ? 'notifications' : 'notifications-outline';
  } else if (route === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else {
    iconName = 'ellipse-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      //headerShown: false,
      tabBarIcon: ({ focused, color, size }) => tabBarIcon(route.name, focused, color, size),
      tabBarActiveTintColor: '#007bff',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomePage} options={{ title: 'Top Headline' }}/>
      <Tab.Screen name="Categories" component={CategoriesPage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Notifications" component={NotificationPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryNews"
            component={CategoryNewsPage}
            options={({ route }) => ({ title: `Top News in ${(route.params as { category: string })?.category}` || 'Category News' })}
          />
          <Stack.Screen name="NewsDetail" component={NewsDetailPage} options={{ title: 'News Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
