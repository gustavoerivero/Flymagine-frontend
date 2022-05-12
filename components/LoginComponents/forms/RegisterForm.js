import React, { useState } from 'react'
import { handleChange } from '../../../utils/functions'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DateDialog from '../../DateDialog'
import Dialog from '../../Dialog'
import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  Icon,
  WarningOutlineIcon,
  IconButton,
  HStack,
  Divider,
} from 'native-base'
import {
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'
import StyledField from '../StyledField'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  phoneValidator,
  emailValidator,
  passwordValidator,
} from '../../../utils/functions'
import StyledArea from '../StyledArea'

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
            opacity={0.95}
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

              <Text
                fontSize={10}
                color='purple.900'
                opacity={0.8}
                textAlign='center'
              >
                Por favor, rellene los siguientes campos para registrarse y 
                formar parte de Flymagine
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
                    <StyledArea
                      placeholder='Dirección de vivienda'
                      onChangeText={onChange}
                      minHeight={50}
                      h={ 50 + 15 * Math.floor((value.length-1)/18) }
                      mb={4}
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
                        bgColor={userData.type !== 'reader' ? 'rgba(127, 153, 220, .75)' : 'rgba(89, 127, 227, 1)'}
                        width={110}
                        justifyContent='center'
                        onPress={() => _handleChange('type', 'reader')}
                        rightIcon={
                          <Icon
                            as={
                              <MaterialIcons
                                name='book'
                              />
                            }
                            size={5}
                            color={userData.type !== 'reader' ? 'muted.500' : 'muted.900'}
                          />
                        }
                      >
                        ¡A leer!
                      </Button>
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
                        Escritor
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
                        bgColor={userData.type !== 'writter' ? 'rgba(245, 66, 239, .5)' : 'rgba(245, 66, 239, .75)'}
                        width={110}
                        justifyContent='center'
                        onPress={() => _handleChange('type', 'writter')}
                        leftIcon={
                          <Icon
                            as={
                              <Entypo
                                name='pencil'
                              />
                            }
                            size={5}
                            color={userData.type !== 'writter' ? 'muted.500' : 'muted.900'}
                          />
                        }
                      >
                        ¡A escribir!
                      </Button>

                    </VStack>
                  </Box>

                </HStack>
              </Box>
              <Text textAlign='center' fontSize={10}>
                Al registrarse, acepta los términos y condiciones de la aplicación.
              </Text>
            </VStack>

            <View
              style={styles.buttonContainer}
            >
              <Dialog
                visible={modalVisible}
                setVisible={setModalVisible}
                setChoice={setChoiceSelected}
                content={userData.type === null ?
                  'Por favor, llene todos los campos solicitados' :
                  '¿Estás seguro que deseas registrarte con estos datos?'
                }
                cancelButton={userData.type === null ? false : true}
                toNavigate={userData.type !== null ? 'Login' : null}
              />
              <Button
                onPress={() => {
                  setModalVisible(true)
                }}
              >
                Regístrate
              </Button>
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