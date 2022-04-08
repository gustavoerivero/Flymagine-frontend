import React, { useState } from 'react'
import { handleChange } from '../../utils/functions'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native'

import { Button } from 'react-native-elements'

import { Card } from '@rneui/themed'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextField from '../../components/TextField'
import PhoneField from '../../components/PhoneField'
import DateField from '../../components/DateField'
import EmailField from '../../components/EmailField'
import PasswordField from '../../components/PasswordField'
import Dialog from '../../components/Dialog'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const RegisterForm = () => {

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    birthDate: '',
    email: '',
    passwordHash: '',
    repeatPassword: '',
    type: null
  })

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)
  
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
      <ScrollView>
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
            <PhoneField
              name='Teléfono'
              value={userData.phone}
              setValues={(text) => _handleChange("phone", text)}
            />
            <TextField
              name='Dirección'
              setText={(text) => _handleChange("address", text)}
            />
            <DateField
              name='Fecha de nacimiento'
              value={userData.birthDate}
              setValues={(text) => _handleChange("birthDate", text)}
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
            <PasswordField
              name='Repite la contraseña'
              setValues={(text) => _handleChange("repeatPassword", text)}
              value={userData.repeatPassword}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal: 20,
                backgroundColor: 'rgba(255, 255, 255, .5)',
                height: '30%',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  color: 'rgba(0, 0, 0, .75)',
                }}
              >
                ¿Lector o escritor?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                }}
              >

              <Card
                containerStyle={{
                  width: '45%',
                  height: 200,
                  borderRadius: 10,
                }}
              >
                <Card.Title >
                  Lector
                </Card.Title>
                <Card.Divider />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '75%',
                  }}
                >
                  <Text 
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    ¿Quieres ser un lector?
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: 'center',                      
                    }}
                  >
                    ¡Comparte y disfruta de la lectura con tus amigos!
                  </Text>
                  <Button
                    title='¡A leer!'
                    onPress={() => _handleChange("type", "reader")}
                    buttonStyle={{
                      backgroundColor: 'rgba(187, 103, 220, .75)',
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                    titleStyle={{
                      color: 'white'
                    }}
                  />
                </View>
              </Card>
              <Card
                containerStyle={{
                  width: '45%',
                  height: 200,
                  borderRadius: 10,
                }}
              >
                <Card.Title >
                  Escritor
                </Card.Title>
                <Card.Divider />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '75%',
                  }}
                >
                  <Text 
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    ¿Quieres ser un escritor?
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: 'center',
                    }}
                  >
                    ¡Comienza tu carrera como escritor subiendo tus propios libros!
                  </Text>
                  <Button
                    title='¡A escribir!'
                    onPress={() => _handleChange("type", "writer")}
                    buttonStyle={{
                      backgroundColor: 'rgba(127, 153, 220, .75)',
                      borderRadius: 5,
                      marginBottom: 10
                    }}
                    titleStyle={{
                      color: 'white'
                    }}
                  />
                </View>
              </Card>
              </View>
              
            </View>
            <View
              style={styles.buttonContainer}
            >
              <Dialog
                visible={modalVisible}
                setVisible={setModalVisible}
                setChoice={setChoiceSelected}
                content='¡Ya tienes tu cuenta personal en Flymagine! ¡Inicia sesión para continuar!'
                toNavigate='Login'
              />
              <Button
                title='Regístrate'
                buttonStyle={styles.button}
                containerStyle={{
                  marginBottom: 50,
                }}
                onPress={() => {
                  setModalVisible(true)
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView >
    </ImageBackground >
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
