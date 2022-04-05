import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native'

import {
  Button
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import EmailField from '../../components/LoginComponents/EmailField'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const PasswordRecovery = () => {

  const Navegation = useNavigation()

  const [email, setEmail] = useState('')

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

      <EmailField
        name='Correo electrónico'
        value={email}
        setValues={setEmail}
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
              <Text style={styles.modalText}>Contraseña enviada al correo de manera exitosa
              </Text>
              <Button
                title='Aceptar'
                buttonStyle={styles.button}
                onPress={() => Navegation.navigate("PasswordRecovery2")}
              />
            </View>
          </View>
        </Modal>
        <Button
          title='Recuperar contraseña'
          buttonStyle={styles.button}
          onPress={() => setModalVisible(true)}
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
})

export default PasswordRecovery