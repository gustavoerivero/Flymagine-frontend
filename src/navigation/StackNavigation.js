import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Login Pages
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Login/RegisterPage'
import PasswordRecoveryRequestPage from '../pages/Login/PasswordRecorveryRequestPage'
import PasswordResetPage from '../pages/Login/PasswordResetPage'

// Post pages
import CreatePostPage from '../pages/Post/CreatePostPage'
import CommentPage from '../pages/Post/CommentPage'
import ModifyCommentPage from '../pages/Post/ModifyCommentPage'

// User Pages
import MyFollower from '../pages/User/MyFollower'
import UserProfilePage from '../pages/User/UserProfilePage'
import EditProfile from '../pages/User/EditProfile'
import Follows from '../pages/User/Follows'

// Book Pages
import MyBook from '../pages/Book/MyBook'
import BookProfile from '../pages/Book/BookProfile'
import RegisterBook from '../pages/Book/RegisterBook'
import Book from '../pages/Book/Book'
import EditBook from '../pages/Book/EditBook'

import BottomNavigation from './BottomNavigation'
import useAuthContext from '../hooks/useAuthContext'
import COLORS from '../components/styled-components/Colors'
import Followers from '../pages/User/Followers'

const Stack = createNativeStackNavigator()

const stackRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    requireAuth: false,
    options: {
      headerShown: false,
    }
  },
  {
    name: 'Register',
    component: RegisterPage,
    requireAuth: false,
    options: {
      title: 'Registro',
    }
  },
  {
    name: 'PasswordRecoveryRequest',
    component: PasswordRecoveryRequestPage,
    requireAuth: false,
    options: {
      title: 'Recuperar contraseña',
    }
  },
  {
    name: 'PasswordReset',
    component: PasswordResetPage,
    requireAuth: false,
    options: {
      title: 'Recuperar contraseña',
    }
  },
  {
    name: 'SignIn',
    component: BottomNavigation,
    requireAuth: true,
    options: {
      headerShown: false,
    }
  },  
  {
    name: 'UserProfile',
    component: UserProfilePage,
    requireAuth: true,
    options: {
      title: 'Perfil de Usuario',
    }
  },
  {
    name: 'EditProfile',
    component: EditProfile,
    requireAuth: true,
    options: {
      title: 'Edita tu perfil',
    }
  },
  {
    name: 'CreatePostPage',
    component: CreatePostPage,
    requireAuth: true,
    options: {
      title: 'Crear post',
    }
  },
  {
    name: 'CommentPage',
    component: CommentPage,
    requireAuth: true,
    options: {
      headerShown: false,

    }
  },
  {
    name: 'ModifyCommentPage',
    component: ModifyCommentPage,
    requireAuth: true,
    options: {
      title: 'Editar comentario',
    }
  },
  {
    name: 'MyBook',
    component: MyBook,
    requireAuth: true,
    options: {
      title: 'Mis Libros',
    }
  },
  {
    name: 'MyFollower',
    component: Followers,
    requireAuth: true,
    options: {
      title: 'Seguidores',
    }
  },
  {
    name: 'MyFollow',
    component: Follows,
    requireAuth: true,
    options: {
      title: 'Seguidos',
    },
  },
  {
    name: 'BookProfile',
    component: BookProfile,
    requireAuth: true,
    options: {
      title: 'Perfil del libro',
    }
  },
  {
    name: 'RegisterBook',
    component: RegisterBook,
    requireAuth: true,
    options: {
      title: 'Registrar libro',
    }
  },
  {
    name: 'Book',
    component: Book,
    requireAuth: true,
    options: {
      title: 'Perfil del libro'
    }
  },
  {
    name: 'EditBook',
    component: EditBook,
    requireAuth: true,
    options: {
      title: 'Editar libro'
    }
  }
]

const StackNavigation = () => {
  const {
    state: { isAuthenticated },
  } = useAuthContext()

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.secundary,
      }}
    >
      {stackRoutes
        .filter(({ requireAuth }) => requireAuth === isAuthenticated)
        .map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
    </Stack.Navigator>
  )
}

export default StackNavigation