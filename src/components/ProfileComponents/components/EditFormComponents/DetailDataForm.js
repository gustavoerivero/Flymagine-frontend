import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import {
  Box,
  Badge,
  View,
  ScrollView,
  Text,
  VStack,
  FormControl,
  Icon,
  FlatList,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import StyledArea from '../../../LoginComponents/StyledArea'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../../hooks/useCustomToast'
import useLoading from '../../../../hooks/useLoading'

import COLORS from '../../../../components/styled-components/Colors'
import styles from './styled-components/styles'
import {
  dataDetailsSchema,
  dataDetailsDefaultValues
} from '../../../../utils/formValidations/dataDetailsFormValidation'
import { updateDataUserAdapter, personalPreferencesData } from '../../../../adapters/User'
import { updateUser, getPreferences, setPreferences } from '../../../../services/user/userAPI'
import { getAllLiteraryGenre } from '../../../../services/literaryGenre/literaryGenre'

const DetailDataForm = ({ navigation, userData }) => {

  const [userInfo, setUserInfo] = useState(userData || null)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [literaryGenres, setLiteraryGenres] = useState([])

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(dataDetailsSchema),
    defaultValues: dataDetailsDefaultValues,
  })

  useFocusEffect(
    useCallback(() => {
      getPreferences(userInfo?._id)
        .then(response => {
          setValue('literaryGenres', response)
        })
        .catch(error => {
          console.log(`Error: ${error}`)
          showErrorToast('Error al agregar los géneros literarios')
        })
      getAllLiteraryGenre()
        .then(response => {
          setLiteraryGenres(response)
        })
        .catch(error => {
          console.log(`Error: ${error}`)
          showErrorToast('Error al agregar los géneros literarios')
        })
      setValue('firstName', userInfo?.firstName)
      setValue('lastName', userInfo?.lastName)
      setValue('phone', userInfo?.phone)
      setValue('address', userInfo?.address)
      setValue('biography', userInfo?.biography || '')

    }, [])
  )

  const onSubmit = async (values) => {
    startLoading()
    try {

      const response = await updateUser(userInfo?._id, updateDataUserAdapter(values))
      const responsePreferences = await setPreferences(response?.Data?._id, personalPreferencesData(values))

      console.log(responsePreferences)

      showSuccessToast('¡Misión cumplida! Tus datos fueron actualizados con éxito')

      reset(dataDetailsDefaultValues)
      setValue('literaryGenres', [])

      navigation?.goBack()

    } catch (error) {
      showErrorToast(error?.message)
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
                Datos Detallados
              </Text>

              <Controller
                control={control}
                name='biography'
                render={({
                  field: { onChange, onBlur, value = '', ...field } }) => (
                  <FormControl
                    mb={errors?.biography && value !== '' ? 0 : 3}
                  >
                    <FormControl.Label>
                      Biografía
                    </FormControl.Label>
                    <StyledArea
                      placeholder='Biografía'
                      onChangeText={onChange}
                      value={value}
                      borderColor={errors?.biography && value !== '' ? 'red.500' : 'grey'}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='history-edu'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.biography && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                  </FormControl>
                )}
              />

              <Controller
                name='literaryGenres'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.literaryGenres && value?.length === 0}
                  >
                    <Box ml={2} mr={2} >
                      <FormControl.Label>
                        Escoge los géneros literarios que te interesan
                      </FormControl.Label>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={literaryGenres}
                        keyExtractor={(item) => item?._id}
                        ItemSeparatorComponent={() => <Box w={2} />}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                              const newValue = [...value]

                              if (newValue.find((genre) => genre?.name === item?.name)) {
                                newValue.splice(newValue.findIndex((genre) => genre?.name === item?.name), 1)
                              } else {
                                newValue.push(item)
                              }

                              console.log(newValue)
                              onChange(newValue)
                              onBlur()
                            }}
                          >
                            <Badge
                              colorScheme='success'
                              style={{
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: 'white',
                                backgroundColor:
                                  value.find((genre) => genre?._id === item?._id)
                                    ? COLORS.primary : "#fff",
                              }}
                            >
                              <Text
                                color={
                                  value.find((genre) => genre?._id === item?._id)
                                    ? 'white' : 'purple.900'}
                              >
                                {item?.name}
                              </Text>
                            </Badge>
                          </TouchableOpacity>
                        )}
                      />
                      {errors?.literaryGenres && value?.length !== 0 && (
                        <FormControl.ErrorMessage>
                          {errors?.literaryGenres?.message}
                        </FormControl.ErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                )}
              />

              <Button
                title='Actualizar datos detallados'
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

export default DetailDataForm
