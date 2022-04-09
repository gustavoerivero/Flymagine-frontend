import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native'

import {
  Button,
  Text
} from 'react-native-elements'
import EmailField from '../../components/LoginComponents/EmailField'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'
import Dialog from '../../components/Dialog'

const PasswordRecovery = () => {

  const [email, setEmail] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

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
      <View style={styles.container} />
      <EmailField
        name='Correo electrónico'
        value={email}
        setValues={setEmail}
        setIsValid={(value) => setValid(value)}
      />
      <View
        style={styles.buttonContainer}
      >
        <Dialog
          visible={modalVisible}
          setVisible={setModalVisible}
          setChoice={setChoiceSelected}
          content={message}
          toNavigate={
            valid ? 'PasswordRecovery2' : null
          }
        />
        <Button
          title='Recuperar contraseña'
          buttonStyle={styles.button}
          onPress={() => {
            if (valid) {
              setMessage('Se ha enviado un correo electrónico a la dirección proporcionada con las instrucciones para recuperar su contraseña.')
              setModalVisible(true)
            } else {
              setMessage('Por favor, ingrese una dirección de correo electrónico válida.')
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
})

export default PasswordRecovery