import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native'

import {
  Button,
  CheckBox
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import MakeItRain from 'react-native-make-it-rain'

import TextField from '../components/TextField'
import PasswordField from '../components/PasswordField'

import Flymagine from '../assets/adaptive-icon.png'
import Bibliothecary from '../assets/images/Bibliothecary.jpg'

const LoginForm = () => {

  const Navegation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [check1, setCheck1] = useState(false)

  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{
        opacity: .5,
        backgroundColor: 'rgba(187, 103, 220, .75)',
      }}
      source={Bibliothecary}
      resizeMode='cover'
    >
      <KeyboardAwareScrollView>
        <MakeItRain
          numItems={80}
          itemDimensions={{
            width: 5,
            height: 5,
          }}
          itemTintStrength={0.8}
          fallSpeed={10}
        />
        <View style={styles.container} >
          <Image
            source={Flymagine}
            style={{
              width: '50%',
              height: '40%',
              marginBottom: 50,
              opacity: 0.8,
            }}
            resizeMode="contain"
          />
          <TextField
            name='Correo electrónico'
            setValue={setEmail}
          />
          <PasswordField
            name='Contraseña'
            setValue={setPassword}
            value={password}
          />
          <CheckBox
            center
            title="Recordar usuario"
            checked={check1}
            onPress={() => setCheck1(!check1)}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
          />

          <View
            style={styles.buttonContainer}
          >
            <Button
              title='Iniciar Sesión'
              buttonStyle={styles.button}
            />
            <Button
              title='Regístrate'
              buttonStyle={styles.button}
              onPress={() => Navegation.navigate("Register")}
            />
          </View>
          <Button
            title='¿Has olvidado tu contraseña?'
            type='clear'
            containerStyle={styles.buttonRecover}
            titleStyle={{
              fontSize: 16,
              color: '#25AADB'
            }}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize: 10,
                marginTop: 10
              }
            ]}
          >
            Thoteam ® - 2022
          </Text>

        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '80%',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 40,
    width: '100%',
    margin: 0,
    padding: 0
  }
})

export default LoginForm