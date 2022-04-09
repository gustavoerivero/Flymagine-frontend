import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native'

import {
  Button, CheckBox
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import PasswordField from '../../components/LoginComponents/PasswordField'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

import { handleChange } from '../../utils/functions'

const PasswordRecoveryStep2 = () => {

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)
  const _handlePassword = (item, value) => handleChange(valid, setValid, item, value)

  const Navegation = useNavigation()

  const [userData, setUserData] = useState({
    passwordHash: '',
    passwordHash2: '',
    check: false
  })

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState({
    passwordHash: false,
    passwordHash2: false,
  })

  const [modalVisible, setModalVisible] = useState(false);

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
      <View style={styles.container}
      />
      <PasswordField
        name='Nueva Contraseña'
        value={userData.passwordHash}
        setValues={(text) => _handleChange("passwordHash", text)}
        setIsValid={(value) => _handlePassword("passwordHash", value)}
      />
      <PasswordField
        name='Repetir Nueva Contraseña'
        value={userData.passwordHash2}
        setValues={(text) => _handleChange("passwordHash2", text)}
        setIsValid={(value) => _handlePassword("passwordHash2", value)}
      />
      <CheckBox
        center
        title="Captcha"
        containerStyle={styles.checkbox}
        textStyle={styles.checkboxText}
        checked={userData.check}
        onPress={() => _handleChange("check", !userData.check)}
      />
      <View
        style={styles.buttonContainer}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {message}
              </Text>
              <Button
                title='Aceptar'
                buttonStyle={styles.button}
                onPress={() => {
                  if (userData.passwordHash === userData.passwordHash2 && userData.check && valid.passwordHash && valid.passwordHash2) {
                    Navegation.navigate('Login')
                  } else {
                    setModalVisible(!modalVisible)
                  }
                }}
              />
            </View>
          </View>
        </Modal>
        <Button
          title='Cambiar contraseña'
          buttonStyle={styles.button}
          onPress={() => {
            if (userData.passwordHash === userData.passwordHash2 && userData.check && valid.passwordHash && valid.passwordHash2) {
              setMessage("Nueva contraseña guardada con éxito")
              setModalVisible(true)
            } else {  
              setMessage('Por favor, verifique que la contraseña sea la correcta y que haya aceptado el captcha')
              setModalVisible(true)
            }
          }}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '35%',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  button: {
    width: 170,
    marginHorizontal: 2,
    backgroundColor: '#9681DF'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  checkbox: {
    backgroundColor: '#E5E5E5',
    width: 170,
    borderColor: 'transparent',
  },
  checkboxText: {
    color: 'black',
    fontSize: 17
  },
})

export default PasswordRecoveryStep2