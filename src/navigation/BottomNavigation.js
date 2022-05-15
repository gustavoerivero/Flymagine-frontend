import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'
import COLORS from '../components/styled-components/Colors'
import Icon from 'react-native-vector-icons/Feather'

import HomeView from '../pages/HomeView'
import SearchPage from '../pages/Search'
import PostPage from '../pages/PostPage'
import NotificationsPage from '../pages/NotificationsPage'
import EditReaderUserProfile from '../pages/User/EditReaderUserProfile'
import ProfilePage from '../pages/ProfilePage'
import { View, StyleSheet } from 'react-native'


import ReaderUserProfile from '../pages/User/ReaderUserProfile'


const Tab = createBottomTabNavigator()

const bottomRoutes = [
  {
    name: 'Home',
    component: HomeView,
    requireAuth: true,
    Icon: ({ color, size }) => (
      <FontAwesome
        name='home'
        color={color}
        size={size}
      />
    ),
  },
  {
    name: 'Search',
    component: SearchPage,
    requireAuth: true,
    Icon: ({ color, size }) => (
      <FontAwesome
        name='search'
        color={color}
        size={size}
      />
    ),
  },
  {
    name: 'Post',
    component: PostPage,
    requireAuth: true,
    Icon: ({ color, size }) => (
      <View style={styles.postPage}>
        <Icon
          name='plus'
          color={COLORS.primary}
          size={30}
        />
      </View>
    ),
  },
  {
    name: 'Notifications',
    component: EditReaderUserProfile,
    requireAuth: true,
    Icon: ({ color, size }) => (
      <Ionicons
        name='notifications'
        color={color}
        size={size}
      />
    ),
  },
  {
    name: 'Profile',
    component: ProfilePage,
    requireAuth: true,
    Icon: ({ color, size }) => (
      <Entypo
        name='user'
        color={color}
        size={size}
      />
    ),
  }
]

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secundary,
        tabBarInactiveTintColor: COLORS.gray1,
        tabBarInactiveBackgroundColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: '7%',
        },
      }}
    >
      {bottomRoutes.map(({ name, component, Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: Icon,
            tabBarShowLabel: false,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  postPage: {
    backgroundColor: COLORS.secundary,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: COLORS.gray5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
})

export default BottomNavigation