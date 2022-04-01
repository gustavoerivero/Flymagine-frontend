import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native'

import {
  Button, CheckBox, Icon
} from 'react-native-elements'

import TextField from '../components/TextField'
import PasswordField from '../components/PasswordField'

import Flymagine from '../assets/adaptive-icon.png'
import Bibliothecary from '../assets/images/Bibliothecary.jpg'

const RegisterForm = () => {
  
  let userData = {
      firstName: '',
      lastName: '',
      email: '',
      passwordHash: '',
  }

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={Bibliothecary}
      resizeMode="cover"
    >
      <View style={styles.container} >
        <TextField
          name='Nombre'
          setValue={userData.firstName}
        />
        <TextField
          name='Apellido'
          setValue={userData.lastName}
        />
        <TextField
          name='Correo electrónico'
          setValue={userData.email}
        />
        <PasswordField
          name='Contraseña'
          setValue={userData.passwordHash}
        />
        <View
          style={styles.buttonContainer}
        >
          <Button
            title='Regístrate'
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#9681DF'
  },

  text: {
    color: 'white'
  },
  checkbox: {
    backgroundColor: 'transparent',
    width: '95%',
    borderColor: 'transparent'
  },
  checkboxText: {
    color: 'white'
  },
  buttonRecover: {
    height: 35,
    width: '100%',
    margin: 0,
    padding: 0
  }
})

export default RegisterForm
