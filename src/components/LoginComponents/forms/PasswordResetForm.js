import React, { useState } from 'react'
import {
  StyleSheet,
  Modal,
} from 'react-native'
import {
  Box,
  Button,
  FormControl,
  Icon,
  Stack,
  VStack,
  Text,
  Divider,
  WarningOutlineIcon,
} from 'native-base'

import {
  MaterialIcons,
} from '@expo/vector-icons'

import {
  Controller,
  useForm,
} from 'react-hook-form'
import {
  passwordValidator,
} from '../../../utils/functions'

import { useNavigation } from '@react-navigation/native'
import StyledField from '../StyledField'
import { handleChange } from '../../../utils/functions'

const PasswordResetForm = () => {

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)
  const _handlePassword = (item, value) => handleChange(valid, setValid, item, value)

  const Navegation = useNavigation()

  const [userData, setUserData] = useState({
    passwordHash: '',
    passwordHash2: '',
  })

  const [message, setMessage] = useState('')

  const [modalVisible, setModalVisible] = useState(false);

  return (
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
      <Stack>
        <VStack alignItems='center' space={4} divider={<Divider />}>
          <Text
            bold
            fontSize='xl'
            color='purple.800'
          >
            Recuperar contraseña
          </Text>
          <Text
            textAlign='center'
            fontSize={10}
            color='purple.900'
          >
            Por favor, ingrese la nueva contraseña y repita la nueva contraseña.
            Recuerde que, debe tener al menos 8 caracteres, como máximo 16 caracteres,
            una letra mayúscula, una letra minúscula, un número y un caracter especial.
          </Text>

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
                <StyledField
                  placeholder='Contraseña'
                  {...field}
                  onChangeText={onChange}
                  w={'100%'}
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
                        name={showPassword ? 'visibility' : 'visibility-off'}
                      />
                    }
                      size={5}
                      mr='4'
                      color={showPassword ? 'purple.900' : 'muted.900'}
                      onPress={() => setShowPassword(!showPassword)} />
                  }
                  secureTextEntry={!showPassword}
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
            name='confirmPassword'
            control={control}
            render={({ field: { onChange, value = '', ...field } }) => (
              <FormControl
                isRequired
                isInvalid={
                  !passwordValidator(value) && value !== ''
                }
              >
                <StyledField
                  placeholder='Repite la contraseña'
                  {...field}
                  onChangeText={onChange}
                  w={'100%'}
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
                        name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                      />
                    }
                      size={5}
                      mr='4'
                      color={showConfirmPassword ? 'purple.900' : 'muted.900'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
                  }
                  secureTextEntry={!showConfirmPassword}
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
          <Button
            onPress={() => {
              if (userData.passwordHash === userData.passwordHash2 && userData.passwordHash !== '') {
                setMessage('Nueva contraseña guardada con éxito')
                setModalVisible(true)
              } else {
                setMessage('Por favor, verifique que la contraseña sea la correcta y que coincidan')
                setModalVisible(true)
              }
            }}
          >
            Cambiar contraseña
          </Button>
        </VStack>
      </Stack>
      <Box
        style={styles.buttonContainer}
      >
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <Box style={styles.centeredView}>
            <Box style={styles.modalView}>
              <Text style={styles.modalText}>
                {message}
              </Text>
              <Button
                onPress={() => {
                  if (userData.passwordHash === userData.passwordHash2 && userData.passwordHash !== '') {
                    Navegation.navigate('Login')
                  } else {
                    setModalVisible(!modalVisible)
                  }
                }}
              >
                Aceptar
              </Button>
            </Box>
          </Box>
        </Modal>

      </Box>
    </Box>
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
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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

export default PasswordResetForm