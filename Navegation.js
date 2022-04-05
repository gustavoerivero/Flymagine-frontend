import React, { useState } from 'react'
import { 
  NavigationContainer,
  useScrollToTop
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './pages/Login/LoginForm'
import RegisterScreen from './pages/Login/RegisterForm'
import PasswordRecoveryScreen from './pages/Login/PasswordRecorvery'

import HomeView from './pages/HomeView'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import NotificationsPage from './pages/NotificationsPage'
import ReaderUserProfileScreen from './pages/ReaderUserProfile'
import EditReaderUserProfileScreen from './pages/EditReaderUserProfile'

import { 
  Entypo,
  FontAwesome,
  Ionicons
} from '@expo/vector-icons';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {

  const [notifications, setNotifications] = useState(50)

  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeView} 
        options={{
          headerShown: false,
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),          
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchPage} 
        options={{
          headerShown: false,
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),          
        }}
      />
      <Tab.Screen 
        name="Post" 
        component={PostPage} 
        options={{
          headerShown: false,
          title: 'Postear',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" color={color} size={size} />
          ),          
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsPage} 
        options={{
          headerShown: false,
          title: 'Notificaciones',              
          tabBarBadge: notifications <= 20 ? notifications : '+20',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
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
