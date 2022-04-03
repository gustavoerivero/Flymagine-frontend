import React, { useState } from 'react'
import { handleChange } from '../../utils/functions'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native'

import { Button } from 'react-native-elements'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextField from '../../components/TextField'
import EmailField from '../../components/EmailField'
import PasswordField from '../../components/PasswordField'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const RegisterForm = () => {

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: ''
  })

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)

  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{
        opacity: .75,
        backgroundColor: 'rgba(187, 103, 220, .75)',
      }}
      source={Bibliothecary}
      resizeMode='cover'
    >
      <KeyboardAwareScrollView>
        <View style={styles.container} >
          <TextField
            name='Nombre'
            setText={(text) => _handleChange("firstName", text)}
          />
          <TextField
            name='Apellido'
            setText={(text) => _handleChange("lastName", text)}
          />
          <EmailField
            name='Correo electrónico'
            setValues={(text) => _handleChange("email", text)}
            value={userData.email}
          />
          <PasswordField
            name='Contraseña'
            setValues={(text) => _handleChange("passwordHash", text)}
            value={userData.passwordHash}
          />
          <Text style={styles.text}>
            {JSON.stringify(userData, null, 2)}
          </Text>
          <View
            style={styles.buttonContainer}
          >
            <Button
              title='Regístrate'
              buttonStyle={styles.button}
              onPress={() => alert('Registro exitoso')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '85%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  imageBackground: {
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
