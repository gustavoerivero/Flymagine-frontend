import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from "./pages/Login/LoginForm"
import RegisterScreen from "./pages/Login/RegisterForm"
import PasswordRecoveryScreen from './pages/Login/PasswordRecorvery'
import HomeView from './pages/HomeView'
import ReaderUserProfileScreen from './pages/ReaderUserProfile'
import EditReaderUserProfileScreen from './pages/EditReaderUserProfile'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'purple'
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeView} 
        options={{
          headerShown: false,
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),          
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ReaderUserProfileScreen} 
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Registro'
        }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecoveryScreen}
        options={{
          title: 'Recuperar contraseña'
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={Tabs}        
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditReaderUserProfile"
        component={EditReaderUserProfileScreen}        
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default function Navegation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
