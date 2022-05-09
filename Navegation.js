import React, { useState } from "react";

import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./pages/Login/LoginPage";
import RegisterScreen from "./pages/Login/RegisterPage";
import PasswordRecoveryScreen from "./pages/Login/PasswordRecorveryRequestPage";
import PasswordRecoveryStep2Screen from "./pages/Login/PasswordResetPage";

//Pages
import HomeView from "./pages/HomeView";
import SearchPage from "./pages/SearchPage";
import Search from "./pages/Search";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import CommentPage from "./pages/CommentPage";
import ModifyCommentPage from "./pages/ModifyCommentPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReaderUserProfile from "./pages/ReaderUserProfile";
import EditReaderUserProfile from "./pages/EditReaderUserProfile";
import WritterUserProfile from "./pages/WritterUserProfile";
import MyBook from "./pages/MyBook";
import MyFollower from "./pages/MyFollower";
import MyFollow from "./pages/MyFollow";
import BookProfile from "./pages/BookProfile";
import RegisterBook from "./pages/RegisterBook";
import Book from "./pages/Book";
import EditBook from "./pages/EditBook";

//Colors
import COLORS from "./components/styled-components/Colors";

import Icon from "react-native-vector-icons/Feather";

import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const { user } = route.params;

  const [notifications, setNotifications] = useState(50);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.secundary,
        tabBarInactiveTintColor: COLORS.gray1,
        tabBarInactiveBackgroundColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "7%",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          title: "Buscar",
          headerTitle: "¡Descrubre nuevos mundos!",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: true,
          headerLargeTitle: true,
          headerTintColor: COLORS.secundary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
          title: "Postear",
          /*tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" color={color} size={size} />
          ),*/

          tabBarIcon: ({ tintColor }) => (
            <View
              style={{
                backgroundColor: COLORS.secundary,
                width: 60,
                height: 60,
                borderRadius: 30,
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
                shadowColor: COLORS.gray5,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
            >
              <Icon name="plus" size={30} color={COLORS.primary} />
            </View>
          ),

          
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{
          headerShown: false,
          title: "Notificaciones",
          tabBarBadge: notifications <= 20 ? notifications : "+4",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WritterUserProfile"
        component={WritterUserProfile}
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Registro",
        }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecoveryScreen}
        options={{
          title: "Recuperar contraseña",
        }}
      />
      <Stack.Screen
        name="PasswordRecovery2"
        component={PasswordRecoveryStep2Screen}
        options={{
          title: "Recuperar contraseña",
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditReaderUserProfile"
        component={EditReaderUserProfile}
        options={{
          title: "Editar perfil",
        }}
      />
      <Stack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReaderUserProfile"
        component={ReaderUserProfile}
        options={{
          title: "Perfil",
        }}
      />
      <Stack.Screen
        name="MyBook"
        component={MyBook}
        options={{
          title: "Mis Libros",
        }}
      />
      <Stack.Screen
        name="CreatePostPage"
        component={CreatePostPage}
        options={{
          title: "Post",
        }}
      />
      <Stack.Screen
        name="ModifyCommentPage"
        component={ModifyCommentPage}
        options={{
          title: "Editar comentario",
        }}
      />
      <Stack.Screen
        name="MyFollower"
        component={MyFollower}
        options={{
          title: "Seguidores",
        }}
      />
      <Stack.Screen
        name="MyFollow"
        component={MyFollow}
        options={{
          title: "Seguidos",
        }}
      />
      <Stack.Screen
        name="BookProfile"
        component={BookProfile}
        options={{
          title: "Perfil del libro",
        }}
      />

      <Stack.Screen
        name="RegisterBook"
        component={RegisterBook}
        options={{
          title: "Registrar libro",
        }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{
          title: "Perfil del libro",
        }}
      />
      <Stack.Screen
        name="EditBook"
        component={EditBook}
        options={{
          title: "Modificar libro",
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navegation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
