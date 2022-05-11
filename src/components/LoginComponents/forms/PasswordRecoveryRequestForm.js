import React, { useState } from 'react'
import {
  StyleSheet,
} from 'react-native'

import {
  Box,
  Button,
  Divider,
  Stack,
  Text,
  VStack,
  Icon,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import {
  MaterialIcons
} from '@expo/vector-icons'

import {
  Controller,
  useForm,
} from 'react-hook-form'

import StyledField from '../StyledField'
import Dialog from '../../Dialog'

import {
  emailValidator,
} from '../../../utils/functions'

const PasswordRecoveryRequestForm = ({ navigation }) => {

  const [email, setEmail] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  })

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
        <VStack
          space={4}
          divider={<Divider />}
          alignItems='center'
        >
          <Text
            bold
            fontSize='xl'
            color='purple.800'
          >
            ¿Olvidaste tu contraseña?
          </Text>
          <Text
            fontSize='sm'
            color='gray.500'
            textAlign='center'
          >
            Ingresa tu correo electrónico y te enviaremos un enlace para que
            puedas restablecerla.
          </Text>

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
                  label="Email"
                  placeholder="Correo electrónico"
                  onChangeText={onChange}
                  w={'100%'}
                  {...field}
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="person"
                        />
                      }
                      size={5}
                      ml="4"
                      color="muted.900"
                    />
                  }
                  autoCapitalize="none"
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
                {emailValidator(value) || value.length === 0 ?
                  <Text></Text> : null
                }
                <Button
                  onPress={() => {
                    setValid(emailValidator(value))
                    if (emailValidator(value)) {
                      setMessage('Se ha enviado un correo electrónico a la dirección proporcionada con las instrucciones para recuperar su contraseña.')
                      setModalVisible(true)
                    } else {
                      setMessage('Por favor, ingrese una dirección de correo electrónico válida.')
                      setModalVisible(true)
                    }
                  }}
                  bg='purple.600'
                  color='white'
                  rounded='lg'
                  shadow={2}
                  borderColor='purple.500'
                  borderWidth={1}
                  m={2}
                  p={2}
                >
                  Recuperar contraseña
                </Button>
              </FormControl>
            )}
          />

        </VStack>
      </Stack>

      <Dialog
        visible={modalVisible}
        setVisible={setModalVisible}
        setChoice={setChoiceSelected}
        content={message}
        toNavigate={
          valid ? 'PasswordReset' : null
        }
        navigation={navigation}
      />
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
})

export default PasswordRecoveryRequestForm