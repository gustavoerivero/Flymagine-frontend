import React, { useState } from 'react'
import { handleChange } from '../../utils/functions'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { Button } from 'react-native-elements'

import { Card } from '@rneui/themed'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DateDialog from '../DateDialog'
import Dialog from '../../components/Dialog'
import {
  Box,
  Text,
  VStack,
  FormControl,
  Icon,
  WarningOutlineIcon,
  IconButton,
  Link,
  HStack,
  Divider,
} from 'native-base'
import {
  MaterialIcons
} from '@expo/vector-icons'
import StyledField from './StyledField'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  phoneValidator,
  emailValidator,
  passwordValidator,
} from '../../utils/functions'

const RegisterForm = () => {

  const [showDialog, setShowDialog] = useState(false)
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  })

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
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.container} >
          <Box
            alignItems='center'
            rounded='lg'
            bg='rgba(224, 218, 227, 1)'
            opacity={0.8}
            shadow={2}
            borderColor='coolGray.300'
            borderWidth={1}
            p={3}
            py={5}
            m={5}
          >
            <VStack
              alignItems='center'
              space={4}
            >
              <Text
                bold
                fontSize='xl'
                color='purple.800'
              >
                Formulario de Registro
              </Text>

              <Controller
                name='firstName'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                  >
                    <FormControl.Label>Nombre</FormControl.Label>
                    <StyledField
                      placeholder='Nombre'
                      onChangeText={onChange}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                    />
                    {value === '' ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        El nombre es necesario
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='lastName'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                  >
                    <FormControl.Label>Apellido</FormControl.Label>
                    <StyledField
                      placeholder='Nombre'
                      onChangeText={onChange}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                    />
                    {value === '' ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        El apellido es necesario
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='phone'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={!phoneValidator(value)}
                  >
                    <FormControl.Label>Número de teléfono</FormControl.Label>
                    <StyledField
                      placeholder='Número de teléfono'
                      onChangeText={onChange}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='smartphone'
                            />
                          }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                    />
                    {phoneValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        El número de teléfono no es válido
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='address'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                  >
                    <FormControl.Label>Dirección de vivienda</FormControl.Label>
                    <StyledField
                      placeholder='Dirección de vivienda'
                      onChangeText={onChange}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='house'
                            />
                          }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                    />
                  </FormControl>
                )}
              />

              <Controller
                name='birthday'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                  >
                    <FormControl.Label>Fecha de nacimiento</FormControl.Label>
                    <StyledField
                      placeholder='Fecha de nacimiento'
                      onChangeText={onChange}
                      {...field}
                      value={value}
                      disabled
                      InputLeftElement={
                        <IconButton
                          icon={
                            <MaterialIcons
                              name='calendar-today'
                              size={20}
                            />
                          }
                          size={7}
                          ml='3'
                          color='muted.900'
                          onPress={() => setShowDialog(true)}
                        />
                      }
                    />
                    <DateDialog
                      visible={showDialog}
                      setVisible={setShowDialog}
                      values={value}
                      setValues={onChange}
                    />
                  </FormControl>
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !emailValidator(value) && value !== ''
                    }
                  >
                    <FormControl.Label>Correo electrónico</FormControl.Label>
                    <StyledField
                      placeholder='Correo electrónico'
                      onChangeText={onChange}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                    />
                    {emailValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        El correo electrónico no es válido
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !passwordValidator(value) && value !== ''
                    }
                  >
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <StyledField
                      placeholder='Contraseña'
                      {...field}
                      onChangeText={onChange}
                      InputLeftElement={
                        <Icon as={
                          <MaterialIcons
                            name='lock'
                          />
                        }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                      InputRightElement={
                        <Icon as={
                          <MaterialIcons
                            name={show ? 'visibility' : 'visibility-off'}
                          />
                        }
                          size={5}
                          mr='4'
                          color={show ? 'purple.900' : 'muted.900'}
                          onPress={() => setShow(!show)} />
                      }
                      secureTextEntry={!show}
                    />
                    {passwordValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        La contraseña ingresada no es válida
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='passwordRepeat'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !passwordValidator(value) && value !== ''
                    }
                  >
                    <FormControl.Label>Repita la contraseña</FormControl.Label>
                    <StyledField
                      placeholder='Repita la contraseña'
                      {...field}
                      onChangeText={onChange}
                      InputLeftElement={
                        <Icon as={
                          <MaterialIcons
                            name='lock'
                          />
                        }
                          size={5}
                          ml='4'
                          color='muted.900'
                        />
                      }
                      InputRightElement={
                        <Icon as={
                          <MaterialIcons
                            name={show ? 'visibility' : 'visibility-off'}
                          />
                        }
                          size={5}
                          mr='4'
                          color={show ? 'purple.900' : 'muted.900'}
                          onPress={() => setShow(!show)} />
                      }
                      secureTextEntry={!show}
                    />
                    {passwordValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        La contraseña ingresada no es válida
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

            </VStack>

            <VStack
              justifyContent='center'
              alignItems='center'
            >
              <Box
                alignItems='center'
                rounded='lg'
                bg='rgba(224, 224, 227, 1)'
                opacity={0.8}
                shadow={2}
                borderColor='coolGray.300'
                borderWidth={1}
                p={3}
                m={5}
                width={300}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, .75)',
                  }}
                >
                  ¿Lector o escritor?
                </Text>
                <HStack 
                  space={2} 
                  alignContent='flex-start'
                >
                  <Box
                    alignItems='center'
                    rounded='lg'
                    bg='rgba(255, 255, 255, 1)'
                    shadow={2}
                    borderColor='coolGray.300'
                    borderWidth={1}
                    p={3}
                    my={5}
                    width='50%'
                  >
                    <VStack
                      space={2}
                      divider={<Divider />}
                      alignItems='center'
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'rgba(0, 0, 0, .9)',
                        }}
                      >
                        Lector
                      </Text>
                      <Box>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 1)',
                            textAlign: 'center',
                          }}
                        >
                          ¿Te apetece leer?
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'rgba(0, 0, 0, .75)',
                            textAlign: 'center',
                          }}
                        >
                          ¡Comparte y disfruta de la lectura con tus amigos!
                        </Text>
                      </Box>
                      <Button
                        title='¡A leer!'
                        onPress={() => _handleChange("type", "reader")}
                        buttonStyle={{
                          backgroundColor: 'rgba(127, 153, 220, 1)',
                          borderRadius: 5,
                          width: '100%',
                        }}
                        titleStyle={{
                          color: 'white'
                        }}
                      />
                    </VStack>
                  </Box>

                  <Box
                    alignItems='center'
                    rounded='lg'
                    bg='rgba(255, 255, 255, 1)'
                    shadow={2}
                    borderColor='coolGray.300'
                    borderWidth={1}
                    p={3}
                    my={5}
                    width='50%'
                  >
                    <VStack
                      space={2}
                      divider={<Divider />}
                      alignItems='center'
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'rgba(0, 0, 0, .9)',
                        }}
                      >
                        Lector
                      </Text>
                      <Box>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 1)',
                            textAlign: 'center',
                          }}
                        >
                          ¿Gustas escribir?
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'rgba(0, 0, 0, .75)',
                            textAlign: 'center',
                          }}
                        >
                          ¡Adéntrate y explora en el bello mundo de la escritura!
                        </Text>
                      </Box>
                      <Button
                        title='¡A escribir!'
                        onPress={() => _handleChange("type", "writter")}
                        buttonStyle={{
                          backgroundColor: 'rgba(245, 66, 239, .5)',
                          borderRadius: 5,
                          width: '100%',
                        }}
                        titleStyle={{
                          color: 'white'
                        }}
                      />
                    </VStack>
                  </Box>

                </HStack>
              </Box>
              <Text textAlign='center'>
                Al registrarse, acepta los términos y condiciones de la App.
              </Text>
            </VStack>

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
          </Box>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView >
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