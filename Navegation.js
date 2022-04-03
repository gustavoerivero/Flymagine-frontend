import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from "./pages/LoginForm"
import RegisterScreen from "./pages/RegisterForm"
import PasswordRecoveryScreen from './pages/PasswordRecorvery'
// import PassRecorvery from "./pages/passwordRecorvery"

const Stack = createNativeStackNavigator();

function MyStack () {
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
            {/* <Stack.Screen 
                name="Recorvery" 
                component={PassRecorvery} 
            /> */}
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
