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

import EmailField from '../../components/LoginComponents/EmailField'
import PasswordField from '../../components/LoginComponents/PasswordField'
import Dialog from '../../components/Dialog'

import { handleChange } from '../../utils/functions'

import Flymagine from '../../assets/adaptive-icon.png'
import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const LoginForm = () => {

  const Navegation = useNavigation()

  const [userData, setUserData] = useState({
    email: '',
    passwordHash: '',
    dataRemember: false
  })

  const [valid, setValid] = useState({
    email: false,
    passwordHash: false
  })

  const [message, setMessage] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)
  const validChange = (item, value) => handleChange(valid, setValid, item, value)

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
          <EmailField
            name='Correo electrónico'
            value={userData.email}
            setValues={(text) => _handleChange("email", text)}
            setIsValid={(value) => validChange("email", value)}
          />
          <PasswordField
            name='Contraseña'
            value={userData.passwordHash}
            setValues={(text) => _handleChange("passwordHash", text)}
            setIsValid={(value) => validChange("passwordHash", value)}
          />
          <CheckBox
            center
            title="Recordar usuario"
            checked={userData.dataRemember}
            onPress={() => _handleChange("dataRemember", !userData.dataRemember)}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
          />

          <View
            style={styles.buttonContainer}
          >
            <Dialog
              visible={modalVisible}
              setVisible={setModalVisible}
              setChoice={setChoiceSelected}
              content={message}
            />
            <Button
              title='Iniciar Sesión'
              buttonStyle={styles.button}
              onPress={() => {
                if (userData.email.length > 0 && userData.passwordHash.length > 0 && valid.email && valid.passwordHash) {
                  Navegation.navigate('SignIn', {
                    email: userData.email,
                  })
                } else if (userData.email.length === 0 || userData.passwordHash.length === 0) {
                  setMessage('Debes ingresar un correo electrónico y una contraseña')
                  setModalVisible(true)
                } else if (!valid.email || !valid.passwordHash) {
                  console.log(JSON.stringify(valid, null, 2))
                  setMessage('Debes ingresar un correo electrónico y/o una contraseña válidos')
                  setModalVisible(true)
                } else {
                  setMessage('Error desconocido')
                  setModalVisible(true)
                }
              }}
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
            onPress={() => Navegation.navigate("PasswordRecovery")}
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