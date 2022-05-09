import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

import { Button } from 'react-native-elements'
import {
  Box,
  Icon,
  HStack,
  VStack,
  FormControl,
  WarningOutlineIcon,
  Checkbox
} from 'native-base'
import {
  MaterialIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Formik } from 'formik'

import Dialog from '../../Dialog'
import {
  emailValidator,
  passwordValidator,
} from '../../../utils/functions'

import Flymagine from '../../../assets/adaptive-icon.png'
import StyledField from '../StyledField'

import {
  loginDefaultvalue,
  loginSchema,
} from '../../../utils/formValidations/loginFormValidations'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoaging from '../../../hooks/useLoading'
import { authAPI } from '../../../services/authAPI'
import useAuthContext from '../../../hooks/useAuthContext'

const LoginForm = () => {

  const { dispatch } = useAuthContext()
  const { showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoaging()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultvalue: loginDefaultvalue,
  })

  const onSubmit = async (value) => {
    startLoading()
    try {
      const response = await authAPI.login(value)
      const token = response?.data?.token

      if (token) {
        await AsyncStorage.setItem('@token', token)
        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              email: value.email,
              id: value.id,
            },
          },
        })
      }
      reset(loginDefaultvalue)
    } catch (error) {
      console.log(error?.response?.data)
      showErrorToast('Error al iniciar sesión')
    }
    stopLoading()
  }

  const Navegation = useNavigation()

  const [show, setShow] = useState(false)

  const [message, setMessage] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  return (
    <View style={styles.container} >
      <Box
        alignItems='center'
        rounded='lg'
        bg='rgba(224, 218, 227, 1)'
        opacity={0.95}
        shadow={2}
        borderColor='coolGray.300'
        borderWidth={1}
        mt='60%'
        p={3}
        py={5}
      >
        <Image
          source={Flymagine}
          style={{
            width: 100,
            height: 100,
            opacity: 0.8,
          }}
          resizeMode='contain'
        />
        <VStack alignItems='center' space={4} mt={8}>
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
            render={({ field: { onChange, value = '',...field } }) => (
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
          <Checkbox colorScheme="purple">
            <Text style={{ color: 'rgb(14, 0, 20)' }}>
              Recordar datos de acceso
            </Text>
          </Checkbox>

          <HStack>
            <Button
              title='Iniciar sesión'
              buttonStyle={styles.button}
              onPress={() => {
                /**  if (userData.email.length > 0 && userData.passwordHash.length > 0 && valid.email && valid.passwordHash) {*/
                Navegation.navigate('SignIn', {
                  email: 'gustavoerivero12@gmail.com',
                })
                /** } else if (userData.email.length === 0 || userData.passwordHash.length === 0) {
                  setMessage('Debes ingresar un correo electrónico y una contraseña')
                  setModalVisible(true)
                } else if (!valid.email || !valid.passwordHash) {
                  console.log(JSON.stringify(valid, null, 2))
                  setMessage('Debes ingresar un correo electrónico y/o una contraseña válidos')
                  setModalVisible(true)
                } else {
                  setMessage('Error desconocido')
                  setModalVisible(true)
                }*/
                handleSubmit(onSubmit)
              }}
            />
            <Button
              title='Registrarse'
              buttonStyle={[styles.button, { backgroundColor: 'rgba(187, 103, 220, .75)' }]}
              onPress={() => Navegation.navigate('Register')}
            />
          </HStack>
        </VStack>

        <Dialog
          visible={modalVisible}
          setVisible={setModalVisible}
          setChoice={setChoiceSelected}
          content={message}
        />

        <Button
          title='¿Has olvidado tu contraseña?'
          type='clear'
          containerStyle={styles.buttonRecover}
          titleStyle={{
            fontSize: 16,
            color: 'rgb(45, 1, 64)'
          }}
          onPress={() => Navegation.navigate('PasswordRecovery')}
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
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '85%',
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
    color: 'rgb(14, 0, 20)'
  },
  buttonRecover: {
    height: 40,
    width: '100%',
    margin: 0,
    padding: 0
  }
})

export default LoginForm