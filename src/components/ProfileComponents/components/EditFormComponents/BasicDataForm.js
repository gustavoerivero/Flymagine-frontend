import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import {
  Box,
  Text,
  VStack,
  FormControl,
  Icon,
  ScrollView,
  View,
  WarningOutlineIcon,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import StyledField from '../../../LoginComponents/StyledField'
import StyledArea from '../../../LoginComponents/StyledArea'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../../hooks/useCustomToast'
import useLoading from '../../../../hooks/useLoading'
import { dataBasicSchema, dataBasicDefaultValues } from '../../../../utils/formValidations/dataBasicFormValidation'
import { updateBasicDataAdapter } from '../../../../adapters/User'
import { updateUser } from '../../../../services/user/userAPI'

import COLORS from '../../../../components/styled-components/Colors'
import styles from './styled-components/styles'

const BasicDataForm = ({ navigation, userData }) => {

  const [userInfo, setUserInfo] = useState(userData || null)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(dataBasicSchema),
    defaultValues: dataBasicDefaultValues,
  })

  useFocusEffect(
    useCallback(() => {
      if (userInfo) {
        setValue('firstName', userInfo?.firstName)
        setValue('lastName', userInfo?.lastName)
        setValue('phone', userInfo?.phone)
        setValue('address', userInfo?.address)
      }
    }, [])
  )

  const onSubmit = async (values) => {
    startLoading()
    try {

      const response = await updateUser(userInfo?._id, updateBasicDataAdapter(values))
      console.log(response)

      showSuccessToast('¡Misión cumplida! Tus datos fueron actualizados con éxito')

      reset(dataBasicDefaultValues)
      navigation?.navigate('Profile')

    } catch (error) {
      showErrorToast('¡Misión fallida! No se pudo actualizar tus datos')
      console.log(error)
    }
    stopLoading()
  }

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
                Datos Básicos
              </Text>

              <Controller
                control={control}
                name='firstName'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.firstName && value !== ''}
                  >
                    <FormControl.Label>
                      Nombre
                    </FormControl.Label>
                    <StyledField
                      placeholder='Nombre'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.firstName && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.firstName && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.firstName && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.firstName?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='lastName'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.lastName && value !== ''}
                  >
                    <FormControl.Label>
                      Apellido
                    </FormControl.Label>
                    <StyledField
                      placeholder='Apellido'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.lastName && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.lastName && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.lastName && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.lastName?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='phone'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.phone && value !== ''}
                  >
                    <FormControl.Label>
                      Número de teléfono
                    </FormControl.Label>
                    <StyledField
                      placeholder='Número de teléfono'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.phone && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='smartphone'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.phone && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.phone && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.phone?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='address'
                render={({
                  field: { onChange, onBlur, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.address && value !== ''}
                    mb={errors?.address && value !== '' ? 0 : 3}
                  >
                    <FormControl.Label>
                      Dirección de vivienda
                    </FormControl.Label>
                    <StyledArea
                      placeholder='Dirección de vivienda'
                      onChangeText={onChange}
                      value={value}
                      borderColor={errors?.address && value !== '' ? 'red.500' : 'grey'}
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
                          color={errors?.address && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.address && value !== '' && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.address?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Button
                title='Actualizar datos básicos'
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

export default BasicDataForm
