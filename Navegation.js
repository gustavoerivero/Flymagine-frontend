import React, { useState } from 'react'
import {
  NavigationContainer
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './pages/Login/LoginForm'
import RegisterScreen from './pages/Login/RegisterForm'
import PasswordRecoveryScreen from './pages/Login/PasswordRecorvery'
import PasswordRecoveryStep2Screen from './pages/Login/PasswordRecoveryStep2'

import HomeView from './pages/HomeView'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import CreatePostPage from './pages/CreatePostPage'
import CommentPage from './pages/CommentPage'
import ModifyCommentPage from './pages/ModifyCommentPage'
import NotificationsPage from './pages/NotificationsPage'
import ReaderUserProfile from './pages/ReaderUserProfile'
import EditReaderUserProfile from './pages/EditReaderUserProfile'

import {
  Entypo,
  FontAwesome,
  Ionicons
} from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = ({ route }) => {

  const { user } = route.params.email

  const [notifications, setNotifications] = useState(50)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
          title: 'Inicio',
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
        component={ReaderUserProfile}
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
        name="PasswordRecovery2"
        component={PasswordRecoveryStep2Screen}
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
        component={EditReaderUserProfile}
        options={{
          title: 'Editar perfil'
        }}
      />
      <Stack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CreatePostPage"
        component={CreatePostPage}
        options={{
          title: 'Post'
        }}
      />
      <Stack.Screen
        name="ModifyCommentPage"
        component={ModifyCommentPage}
        options={{
          title: 'Editar comentario'
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