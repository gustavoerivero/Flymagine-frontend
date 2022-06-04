import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Login Pages
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Login/RegisterPage'
import PasswordRecoveryRequestPage from '../pages/Login/PasswordRecorveryRequestPage'

// Post pages
import PostEditPage from '../pages/Post/PostEditPage'
import CommentPage from '../pages/Post/CommentPage'
import CommentReviewPage from '../pages/Post/CommentReviewPage'
import ModifyCommentPage from '../pages/Post/ModifyCommentPage'

// User Pages
import UserProfilePage from '../pages/User/UserProfilePage'
import EditProfile from '../pages/User/EditProfile'
import Follows from '../pages/User/Follows'
import Followers from '../pages/User/Followers'
import BooksPage from '../pages/User/BooksPage'

// Book Pages
import MyBook from '../pages/Book/MyBook'
import BookProfilePage from '../pages/Book/BookProfilePage'
import RegisterBook from '../pages/Book/RegisterBook'
import Book from '../pages/Book/Book'
import EditBook from '../pages/Book/EditBook'

import BottomNavigation from './BottomNavigation'
import useAuthContext from '../hooks/useAuthContext'
import COLORS from '../components/styled-components/Colors'
import CommentReviewEditPage from '../pages/Post/CommentReviewEditPage'

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
    name: 'EditPost',
    component: PostEditPage,
    requireAuth: true,
    options: {
      title: 'Edita tu experiencia',
    }
  },
  {
    name: 'CommentPage',
    component: CommentPage,
    requireAuth: true,
    options: {
      title: '¿Qué están pensando?',
    }
  },
  {
    name: 'CommentReviewPage',
    component: CommentReviewPage,
    requireAuth: true,
    options: {
      title: '¿Qué están pensando?',
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
    name: 'CommentReviewEditPage',
    component: CommentReviewEditPage,
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
    name: 'BooksPage',
    component: BooksPage,
    requireAuth: true,
    options: {
      title: 'Libros',
    }
  },
  {
    name: 'BookProfilePage',
    component: BookProfilePage,
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