import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'

import {
  Button, CheckBox, Icon
} from 'react-native-elements'

import TextField from '../components/TextField'
import PasswordField from '../components/PasswordField'

import Bibliothecary from '../assets/images/Bibliothecary.jpg'

const LoginForm = () => {

  const [title, setTitle] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [check1, setCheck1] = useState(false)

  return (
    <ImageBackground 
        style={styles.imageBackground}
        source={Bibliothecary}
        resizeMode="cover"
    >
    <View style={styles.container} >
      
      <Text
        style={styles.text}
      >{(title ? 'Iniciar sesión' : 'Sesión iniciada')}</Text>
      <TextField
        name='Correo electrónico'
        setValue={setEmail}
      />
      <PasswordField
        name='Contraseña'
        setValue={setPassword}
      />
      <CheckBox
         center
         title="Recordar datos de acceso"
         checked={check1}
         onPress={() => setCheck1(!check1)}
         containerStyle={styles.checkbox}
         textStyle={styles.checkboxText}
      />

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
      <Text
        style={styles.text}
      >
        <Button
          title='¿Has olvidado tu contraseña?'
          type='clear'
          containerStyle={styles.buttonRecover}
          titleStyle={{
            fontSize: 16
          }}
        />
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
  },

  text:{
    color: 'white'
  },
  checkbox:{
    backgroundColor: 'transparent',
    width: '95%',
    borderColor: 'transparent'
  },
  checkboxText:{
    color: 'white'
  },
  buttonRecover: {
    height: 35,
    width: '100%',
    margin: 0,
    padding: 0
  }
})

export default LoginForm