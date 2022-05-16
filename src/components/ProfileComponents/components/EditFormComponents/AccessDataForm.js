import React, { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import {
  Box,
  Text,
  VStack,
  FormControl,
  Icon,
  View,
  ScrollView,
  WarningOutlineIcon,
} from 'native-base'
import {
  MaterialIcons,
} from '@expo/vector-icons'
import StyledField from '../../../LoginComponents/StyledField'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../../hooks/useCustomToast'
import useLoading from '../../../../hooks/useLoading'
import useAuthContext from '../../../../hooks/useAuthContext'
import{
  dataAccessSchema,
  dataAccessDefaultValues,
} from '../../../../utils/formValidations/dataAccessFormValidation'
import { registerUser, setPreferences } from '../../../../services/authAPI'
import { getUserById } from '../../../../services/user/userAPI'
import { personalPreferencesData, registerData } from '../../../../adapters/User'

import COLORS from '../../../../components/styled-components/Colors'
import styles from './styled-components/styles'

const AccessDataForm = ({ navigation, userData }) => {

  const {
    state: { user },
  } = useAuthContext()

  const [userInfo, setUserInfo] = useState(userData || null)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    getUserById(user?.id)
      .then(res => {
        setUserInfo(res?.Data)
      })
      .catch(error => {
        console.log(error)
      })

    setValue('email', userInfo?.email)    
  }, [])

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(dataAccessSchema),
    defaultValues: dataAccessDefaultValues,
  })

  const onSubmit = async (values) => {
    startLoading()
    try {

      const response = await updateUser()
      console.log(response)

      showSuccessToast('¡Misión cumplida! Tus datos fueron actualizados con éxito')

      reset(dataAccessDefaultValues)
      setShowPassword(false)
      setShowConfirmPassword(false)

      navigation?.goBack()

    } catch (error) {
      showErrorToast('Misión fallida! No se pudo actualizar tus datos')
      console.log(error)
    }
    stopLoading()
  }

  return (
    <ScrollView>
      <KeyboardAwareScrollView>

        <View style={styles.container}>
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
            w={350}
            mw={350}
          >
            <VStack
              space={4}
              alignItems='center'
            >
              <Text
                bold
                fontSize='xl'
                color='purple.800'
              >
                Datos de Acceso
              </Text>

              <Controller
                control={control}
                name='email'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.email && value !== ''}
                  >
                    <FormControl.Label>
                      Correo electrónico
                    </FormControl.Label>
                    <StyledField
                      placeholder='Correo electrónico'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.email && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.email && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.email && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.email?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='currentPassword'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.currentPassword && value !== ''}
                  >
                    <FormControl.Label>
                      Contraseña actual
                    </FormControl.Label>
                    <StyledField
                      placeholder='Contraseña actual'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.currentPassword && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='lock'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.currentPassword && value !== '' ? 'red.500' : 'muted.900'}
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
                    {errors?.currentPassword && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.currentPassword?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='password'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.password && value !== ''}
                  >
                    <FormControl.Label>
                      Nueva contraseña
                    </FormControl.Label>
                    <StyledField
                      placeholder='Nueva contraseña'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.password && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='lock'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.password && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                      InputRightElement={
                        <Icon as={
                          <MaterialIcons
                            name={showNewPassword ? 'visibility' : 'visibility-off'}
                          />
                        }
                          size={5}
                          mr='4'
                          color={showNewPassword ? 'purple.900' : 'muted.900'}
                          onPress={() => setShowNewPassword(!showNewPassword)} />
                      }
                      secureTextEntry={!showNewPassword}
                    />
                    {errors?.password && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.password?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />


              <Controller
                control={control}
                name='confirmPassword'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.confirmPassword && value !== ''}
                  >
                    <FormControl.Label>
                      Confirme la contraseña
                    </FormControl.Label>
                    <StyledField
                      placeholder='Confirmación de contraseña'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.confirmPassword && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='lock'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.confirmPassword && value !== '' ? 'red.500' : 'muted.900'}
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
                    {errors?.confirmPassword && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.confirmPassword?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Button
                title='Actualizar datos de acceso'
                buttonStyle={[styles.button, { backgroundColor: COLORS.button.primary }]}
                isLoading={isLoading}
                disabled={isLoading || !isValid}
                onPress={handleSubmit(onSubmit)}
              />

            </VStack>
          </Box>
        </View>


      </KeyboardAwareScrollView>
    </ScrollView>
  )

}

export default AccessDataForm
