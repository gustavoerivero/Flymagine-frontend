import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import {
  Box,
  Divider,
  Stack,
  Text,
  VStack,
  Icon,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import StyledField from '../StyledField'
import { emailValidator } from '../../../utils/functions'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'
import { restorePassword } from '../../../services/authAPI'
import { yupResolver } from '@hookform/resolvers/yup'
import { restorePasswordSchema, restorePasswordDefaultValue } from '../../../utils/formValidations/dataReset'
import COLORS from '../../styled-components/Colors'

const PasswordRecoveryRequestForm = ({ navigation }) => {

  const { showErrorToast, showSuccessToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(restorePasswordSchema),
    defaultvalue: restorePasswordDefaultValue,
  })

  const onSubmit = async (value) => {
    startLoading()
    try {
      let resp = await restorePassword(value.email)
      console.log(resp)
      showSuccessToast('¡El correo de recuperación de contraseña ha sido enviado!')
      reset()
      navigation?.navigate('Login')
    } catch (error) {
      showErrorToast('¡Error al enviar el correo de recuperación de contraseña!')
      console.log(error)
    }
    stopLoading()
  }

  return (
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
      m={5}
    >
      <Stack>
        <VStack
          space={1}
          divider={<Divider />}
          alignItems='center'
        >
          <Text
            bold
            fontSize='xl'
            color={COLORS.primary}
            mb={2}
          >
            ¿Olvidaste tu contraseña?
          </Text>
          <Text
            fontSize='sm'
            color='gray.500'
            textAlign='center'
          >
            Ingresa tu correo electrónico y te haremos llegar un correo con una
            nueva contraseña.
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

              </FormControl>
            )}
          />

          <Button
            title='Recuperar acceso'
            buttonStyle={styles.button}
            disabled={!isValid || isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />

        </VStack>
      </Stack>
    </Box>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 170,
    marginHorizontal: 2,
    backgroundColor: COLORS.button.primary
  },
})

export default PasswordRecoveryRequestForm