import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'

import {
  Button
} from 'react-native-elements'

import TextField from '../components/TextField'
import PasswordField from '../components/PasswordField'

import Bibliothecary from '../assets/images/Bibliothecary.jpg'

const LoginForm = () => {

  const [title, setTitle] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ImageBackground 
        style={styles.imageBackground}
        source={Bibliothecary}
        resizeMode="cover"
    >
    <View style={styles.container} >
      
      <Text>{(title ? 'Iniciar sesión' : 'Sesión iniciada')}</Text>
      <TextField
        name='Correo electrónico'
        setValue={setEmail}
      />
      <PasswordField
        name='Contraseña'
        setValue={setPassword}
      />
      <Text>Recordar datos de acceso</Text>
      <View
        style={styles.buttonContainer}
      >
        <Button
          title={(title ? 'Iniciar sesión' : 'Cerrar Sesión')}
          buttonStyle={styles.button}
          onPress={() => setTitle(!title)}
        />
        <Button
          title='Regístrate'          
          buttonStyle={styles.button}
        />
      </View>
      <Text>
        ¿Se te han olvidado tus datos para iniciar sesión? No esperes más y
        <Button
          title='recupera tus datos de acceso'
          type='clear'
          containerStyle={{
            height: 35,
            width: '100%',
            margin: 0,
            padding: 0
          }}
          titleStyle={{
            fontSize: 16
          }}
        />
        .
      </Text>

    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 170,
    marginHorizontal: 2,
  }
})

export default LoginForm