import React, { useState } from 'react'
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
  Stack,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import StyledField from '../../../LoginComponents/StyledField'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../../hooks/useCustomToast'
import useLoading from '../../../../hooks/useLoading'
import useAuthContext from '../../../../hooks/useAuthContext'
import {
  dataAccessSchema,
  dataAccessDefaultValues,
} from '../../../../utils/formValidations/dataAccessFormValidation'
import {
  getUserById,
  changeUserPassword,
} from '../../../../services/user/userAPI'
import { updateAccessDataAdapter } from '../../../../adapters/User'

import COLORS from '../../../../components/styled-components/Colors'
import styles from './styled-components/styles'

const AccessDataForm = ({ navigation, userData }) => {
  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
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
      const response = await changeUserPassword(
        user?.id,
        updateAccessDataAdapter(values)
      )
      console.log(response)

      showSuccessToast(
        '¡Misión cumplida! Tus datos fueron actualizados con éxito'
      )

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
            bg={COLORS.secundary}
            opacity={0.95}
            shadow={2}
            borderColor='coolGray.300'
            borderWidth={1}
            p={3}
            py={5}
            m={3}
            w={350}
            mw={350}
          >
            <VStack space={3} alignItems='center'>
              <VStack /* TEXT */ alignItems='center' space={1}>
                <Text bold fontSize='xl' color={COLORS.primary}>
                  Datos de Acceso
                </Text>

                <Text fontSize='xs' color='gray.600' textAlign='center'>
                  Para cambiar tu contraseña, es necesario que ingreses tu
                  correo electrónico, tu contraseña actual y la nueva
                  contraseña.
                </Text>
              </VStack>

              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.email && value !== ''}
                  >
                    <FormControl.Label>Correo electrónico</FormControl.Label>
                    <StyledField
                      placeholder='Correo electrónico'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={
                        errors?.email && value !== '' ? 'red.500' : 'grey'
                      }
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name='person' />}
                          size={5}
                          ml='4'
                          color={
                            errors?.email && value !== ''
                              ? 'red.500'
                              : 'muted.900'
                          }
                        />
                      }
                    />
                    {errors?.email && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={<WarningOutlineIcon size='xs' />}
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
                render={({ field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.currentPassword && value !== ''}
                  >
                    <FormControl.Label>Contraseña actual</FormControl.Label>
                    <StyledField
                      placeholder='Contraseña actual'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={
                        errors?.currentPassword && value !== ''
                          ? 'red.500'
                          : 'grey'
                      }
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name='lock' />}
                          size={5}
                          ml='4'
                          color={
                            errors?.currentPassword && value !== ''
                              ? 'red.500'
                              : 'muted.900'
                          }
                        />
                      }
                      InputRightElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                showPassword ? 'visibility' : 'visibility-off'
                              }
                            />
                          }
                          size={5}
                          mr='4'
                          color={showPassword ? 'purple.900' : 'muted.900'}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      secureTextEntry={!showPassword}
                    />
                    {errors?.currentPassword && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={<WarningOutlineIcon size='xs' />}
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
                render={({ field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.password && value !== ''}
                  >
                    <FormControl.Label>Nueva contraseña</FormControl.Label>
                    <StyledField
                      placeholder='Nueva contraseña'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={
                        errors?.password && value !== '' ? 'red.500' : 'grey'
                      }
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name='lock' />}
                          size={5}
                          ml='4'
                          color={
                            errors?.password && value !== ''
                              ? 'red.500'
                              : 'muted.900'
                          }
                        />
                      }
                      InputRightElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                showNewPassword
                                  ? 'visibility'
                                  : 'visibility-off'
                              }
                            />
                          }
                          size={5}
                          mr='4'
                          color={showNewPassword ? 'purple.900' : 'muted.900'}
                          onPress={() => setShowNewPassword(!showNewPassword)}
                        />
                      }
                      secureTextEntry={!showNewPassword}
                    />
                    {errors?.password && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={<WarningOutlineIcon size='xs' />}
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
                render={({ field: { onChange, onBlur, value, ...field } }) => (
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
                      borderColor={
                        errors?.confirmPassword && value !== ''
                          ? 'red.500'
                          : 'grey'
                      }
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name='lock' />}
                          size={5}
                          ml='4'
                          color={
                            errors?.confirmPassword && value !== ''
                              ? 'red.500'
                              : 'muted.900'
                          }
                        />
                      }
                      InputRightElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                showConfirmPassword
                                  ? 'visibility'
                                  : 'visibility-off'
                              }
                            />
                          }
                          size={5}
                          mr='4'
                          color={
                            showConfirmPassword ? 'purple.900' : 'muted.900'
                          }
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      }
                      secureTextEntry={!showConfirmPassword}
                    />
                    {errors?.confirmPassword && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={<WarningOutlineIcon size='xs' />}
                      >
                        {errors?.confirmPassword?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Stack /* BUTTON */ mt={3}>
                <Button
                  title='Actualizar datos de acceso'
                  buttonStyle={[
                    styles.button,
                    { backgroundColor: COLORS.button.terciary },
                  ]}
                  isLoading={isLoading}
                  disabled={isLoading || !isValid}
                  onPress={handleSubmit(onSubmit)}
                />
              </Stack>
            </VStack>
          </Box>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}

export default AccessDataForm
