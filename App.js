import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import Medicine from './components/Medicine';
import Calendar from './components/Calendar';

//const HOST = "http://localhost:5000";
//const HOST = "https://blue-violet-centipede-sock.cyclic.app";
//const HOST = "https://medicine-keeper-server.onrender.com";
const HOST = "https://medicine-keeper-server-production.up.railway.app";

export {HOST};

const UserStack = createNativeStackNavigator();

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="User" component={User} />
      <UserStack.Screen name="Login" component={Login} />
      <UserStack.Screen name="Register" component={Register} />
    </UserStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'User') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Hẹn theo thứ') {
              iconName = focused ? 'calendar' : 'calendar';
            } else if (route.name === 'Đơn thuốc') {
              iconName = focused ? 'list' : 'list';
            }

            return <Entypo name={iconName} size={20} color={color} />;
          },
          tabBarActiveTintColor: '#F0A04B',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={Home} initialParams={{day: "Mỗi ngày", color: "#F0A04B"}} />
        <Tab.Screen name="Hẹn theo thứ" component={Calendar} />
        <Tab.Screen name="Đơn thuốc" component={Medicine} />
        <Tab.Screen name="User" component={UserStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
