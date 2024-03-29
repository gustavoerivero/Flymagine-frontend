import React, { useState } from 'react'
import {
  View,
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
} from 'native-base'
import {
  MaterialIcons
} from '@expo/vector-icons'
import Dialog from '../../Dialog'
import {
  emailValidator,
  passwordValidator,
} from '../../../utils/functions'

import Flymagine from '../../../../assets/Flymagine_Complete.png'
import StyledField from '../StyledField'
import Thoteam from '../Thoteam'

import { loginDefaultvalue, loginSchema } from '../../../utils/formValidations/loginFormValidations'
import { Controller, useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'
import { login } from '../../../services/authAPI'
import useAuthContext from '../../../hooks/useAuthContext'
import { loginData } from '../../../adapters/User'
import COLORS from '../../../components/styled-components/Colors'
import { setSession } from '../../../services/jwt'

const LoginForm = ({ navigation }) => {

  const { dispatch } = useAuthContext()
  const { showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [showModal, setShowModal] = useState(false)

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
      const response = await login(loginData(value))

      const token = response?.Data?.token

      if (token) {
        setSession(response?.Data?.id, token)
        await AsyncStorage.setItem('@id', response?.Data?.id)
        await AsyncStorage.setItem('@token', token)
        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              token: token,
              id: response?.Data?.id,
            },
          },
        })
      }
      console.log(`${value.email} logged in`)
      reset(loginDefaultvalue)
    } catch (error) {
      console.log('Error: ', error?.response)
      showErrorToast(error?.response?.Data?.OK !== '0' ? 'Datos incorrectos' : 'Error al iniciar sesión')
    }
    stopLoading()
  }

  const [show, setShow] = useState(false)

  const [message, setMessage] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  return (
    <View style={styles.container} >
      <Box
        alignItems='center'
        rounded='lg'
        bg={COLORS.base}
        opacity={0.8}
        shadow={2}
        borderColor='coolGray.300'
        borderWidth={1}
        p={3}
        py={5}
      >
        <Image
          source={Flymagine}
          style={{
            width: 150,
            height: 150,
            opacity: 0.9,
          }}
          resizeMode='contain'
        />
        <VStack alignItems='center' space={4} mt={8}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <FormControl
                isRequired
                isInvalid={
                  !emailValidator(value) && value !== ''
                }
              >
                <StyledField
                  placeholder='Correo electrónico'
                  onChangeText={onChange}
                  borderColor={!emailValidator(value) && value !== '' ? 'red.500' : 'grey'}
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name='person'
                        />
                      }
                      size={5}
                      ml='4'
                      color={!emailValidator(value) && value !== '' ? 'red.500' : 'muted.900'}
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
                <StyledField
                  placeholder='Contraseña'
                  {...field}
                  onChangeText={onChange}
                  borderColor={!passwordValidator(value) && value !== '' ? 'red.500' : 'grey'}
                  InputLeftElement={
                    <Icon as={
                      <MaterialIcons
                        name='lock'
                      />
                    }
                      size={5}
                      ml='4'
                      color={!passwordValidator(value) && value !== '' ? 'red.500' : 'muted.900'}
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

          <HStack>
            <Button
              title='Iniciar sesión'
              buttonStyle={[styles.button, { backgroundColor: COLORS.button.primary }]}
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
            <Button
              title='Registrarse'
              buttonStyle={[styles.button, { backgroundColor: COLORS.button.primary }]}
              onPress={() => navigation?.navigate('Register')}
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
          onPress={() => navigation?.navigate('PasswordRecoveryRequest')}
        />
        <Button
          title='Thoteam ® - 2022'
          type='clear'
          containerStyle={styles.buttonCopyright}
          titleStyle={[styles.text, { fontSize: 10 }]}
          onPress={() => setShowModal(true)}
        />
        <Thoteam 
          showModal={showModal}
          setShowModal={setShowModal}
        />
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
    backgroundColor: COLORS.button.primary
  },
  text: {
    color: 'rgb(14, 0, 20)'
  },
  buttonRecover: {
    height: 40,
    width: '100%',
    margin: 0,
    padding: 0
  },
  buttonCopyright: {
    margin: 0,
    padding: 0
  }
})

export default LoginForm