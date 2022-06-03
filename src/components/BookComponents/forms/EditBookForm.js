import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  pickImage,
  selectOneFile,
  permisionFunction,
} from '../../../utils/functions'
import { TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  View,
  Text,
  Icon,
  Badge,
  FlatList,
  FormControl,
  WarningOutlineIcon,
  VStack,
  Box,
} from 'native-base'

import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'

import useAuthContext from '../../../hooks/useAuthContext'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'

import { Button } from 'react-native-elements'
import mime from 'mime'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import StyledField from '../Components/StyledField'
import StyledArea from '../Components/StyledArea'

import { getAllLiteraryGenre } from '../../../services/literaryGenre/literaryGenre'
import {
  getGenresByIdBook,
  updateBook,
  uploadImage,
  uploadDocument,
  setLiteraryGenres,
} from '../../../services/book/bookAPI'

import {
  registerBookSchema,
  registerBookDefaultValue
} from '../../../utils/formValidations/dataBookFormValidation'

import { updateBookAdapter } from '../../../adapters/Book'

import COLORS from '../../styled-components/Colors'
import noImage from '../../../../assets/images/noImage.png'

const EditBookForm = ({ navigation, bookData }) => {

  const layout = useWindowDimensions()

  const [image, setImage] = useState(null)
  const [document, setDocument] = useState(null)

  const [litGenres, setLitGenres] = useState([])

  const [showDatePicker, setShowDatePicker] = useState(false)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    state: { user }
  } = useAuthContext()

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerBookSchema),
    defaultValues: registerBookDefaultValue,
  })

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false)
    const date = selectedDate || new Date()
    setValue('creationDate', date)
  }

  useFocusEffect(
    useCallback(() => {
      permisionFunction()
      getGenresByIdBook(bookData._id)
        .then(res => {

          setValue('name', bookData?.name)
          setValue('synopsis', bookData.sypnosis)
          setValue('literaryGenres', res)

          getAllLiteraryGenre()
            .then(response => {
              setLitGenres(response)
            })
            .catch(error => {
              console.log(error)
            })

        })
        .catch(error => {
          console.log(error)
        })


    }, [bookData])
  )

  const onSubmit = async (data) => {
    startLoading()

    if (data.name === '') {
      showErrorToast('Es necesario ingresar un nombre')
      stopLoading()
      return
    }

    if (data.synopsis === '') {
      showErrorToast('Es necesario ingresar una sinopsis')
      stopLoading()
      return
    }

    if (data.photo === '') {
      showErrorToast('Es necesario ingresar una foto')
      stopLoading()
      return
    }

    if (data.document === '') {
      showErrorToast('Es necesario ingresar un documento de formato PDF')
      stopLoading()
      return
    }

    if (data.literaryGenres.length === 0) {
      showErrorToast('Es necesario seleccionar al menos un género literario')
      stopLoading()
      return
    }

    if (data.creationDate === '') {
      showErrorToast('Es necesario ingresar una fecha de creación')
      stopLoading()
      return
    }

    try {

      const book = updateBookAdapter({
        idUser: user.id,
        name: data.name,
        synopsis: data.synopsis,
        creationDate: data.creationDate,
      })
      const response = await updateBook(bookData._id, book)
      console.log('First upload', response)

      let imageUri = Platform.OS === 'ios' ? 'file:///' + image.uri.split('file:/').join('') : image.uri
      let formData = new FormData()
      formData.append('photo', {
        uri: imageUri,
        type: mime.getType(imageUri),
        name: imageUri.split('/').pop()
      })
      const responseImage = await uploadImage(bookData._id, formData)
      console.log('Second upload', responseImage)

      let documentUri = Platform.OS === 'ios' ? 'file:///' + document.uri.split('file:/').join('') : document.uri
      let formDataDocument = new FormData()
      formDataDocument.append('document', {
        uri: documentUri,
        type: mime.getType(documentUri),
        name: documentUri.split('/').pop()
      })
      const responseDocument = await uploadDocument(bookData._id, formDataDocument)
      console.log('Third upload', responseDocument)

      const responseGenres = await setLiteraryGenres(bookData._id, data.literaryGenres)
      console.log('last upload', responseGenres)

      showSuccessToast('¡Misión cumplida! El libro ha sido actualizado correctamente')
      reset()
      stopLoading()
      navigation.goBack()

    } catch (error) {
      console.log('an error... F', error)
      showErrorToast('¡Misión fallida! No se pudo actualizar el libro')
    }
    stopLoading()
  }

  return (
    <KeyboardAwareScrollView>
      <View
        minH={layout.height}
        minW={layout.width}
        alignSelf='center'
        alignItems='center'
      >
        <Box
          bgColor={COLORS.primary}
          w={layout.width}
          minH={200}
          p={3}
        >
          <Controller
            control={control}
            name='photo'
            render={({ value }) => (
              <FormControl
                isRequired
                isInvalid={errors.photo}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    borderColor: errors?.photo && value !== '' && 'red',
                    borderWidth: errors?.photo && value !== '' && 1,
                    borderRadius: 5,
                  }}
                  activeOpacity={0.75}
                  onPress={() => {
                    console.log('Upload image')
                    let imageUp = pickImage()
                    imageUp.then(res => {
                      setImage(res)
                      setValue('photo', res.type)
                    }).catch(err => {
                      console.log(err)
                    })
                  }}
                >
                  <ImageBackground
                    source={{ uri: image ? image.uri : bookData.photo }}
                    style={{
                      width: 125,
                      height: 175,
                    }}
                    imageStyle={{
                      borderRadius: 5,
                    }}
                    alt='pinche prop'
                    resizeMode='stretch'
                  >
                    <Icon
                      as={
                        <Ionicons
                          name='camera'
                          color='white'
                        />
                      }
                      size={30}
                      color='white'
                      alignSelf='flex-end'
                      mr={2}
                      mt={2}
                    />
                  </ImageBackground>
                </TouchableOpacity>
              </FormControl>
            )}
          />
        </Box>

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
              Datos del libro
            </Text>

            <Controller
              control={control}
              name='name'
              render={({
                field: { onChange, onBlur, value, ...field } }) => (
                <FormControl
                  isInvalid={errors.name && value !== ''}
                  isRequired
                >
                  <FormControl.Label>
                    Nombre del libro
                  </FormControl.Label>
                  <StyledField
                    label='Nombre del libro'
                    placeholder='Nombre del libro'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    {...field}
                    borderColor={errors?.name && value !== '' ? 'red.500' : 'grey'}
                    InputLeftElement={
                      <Icon
                        as={
                          <FontAwesome5
                            name='book'
                          />
                        }
                        size={4}
                        ml='4'
                        color={errors?.name && value !== '' ? 'red.500' : 'muted.900'}
                      />
                    }
                  />
                  {errors?.name && (
                    <FormControl.ErrorMessage
                      maxWidth={300}
                      leftIcon={
                        <WarningOutlineIcon
                          size='xs'
                        />
                      }
                    >
                      {errors?.name?.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name='synopsis'
              render={({
                field: { onChange, onBlur, value, ...field } }) => (
                <FormControl
                  isInvalid={errors.synopsis && value !== ''}
                  isRequired
                  mb={errors?.biography && value !== '' ? 0 : 3}
                >
                  <FormControl.Label>
                    Sinopsis del libro
                  </FormControl.Label>
                  <StyledArea
                    label='Sinopsis del libro'
                    placeholder='Sinopsis del libro'
                    textAlignVertical='center'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    {...field}
                    borderColor={errors?.synopsis && value !== '' ? 'red.500' : 'grey'}
                    InputLeftElement={
                      <Icon
                        as={
                          <MaterialIcons
                            name='menu-book'
                          />
                        }
                        size={5}
                        ml='3'
                        color={errors?.synopsis && value !== '' ? 'red.500' : 'muted.900'}
                      />
                    }
                  />
                  {errors?.synopsis && (
                    <FormControl.ErrorMessage
                      maxWidth={300}
                      leftIcon={
                        <WarningOutlineIcon
                          size='xs'
                        />
                      }
                    >
                      {errors?.synopsis?.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name='creationDate'
              control={control}
              render={({
                field: { value = new Date() } }) => (
                <>
                  <FormControl
                    isRequired
                    isInvalid={errors.creationDate && value !== ''}
                  >
                    <FormControl.Label>Fecha de creación</FormControl.Label>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => setShowDatePicker(true)}
                      style={{
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      <StyledField
                        placeholder='Fecha de creación'
                        isReadOnly
                        borderColor={errors?.creationDate && value !== '' ? 'red.500' : 'grey'}
                        value={value?.toISOString()?.split('T')[0].split('-').reverse().join('/')}
                        InputLeftElement={
                          <Icon
                            as={
                              <MaterialIcons
                                name='calendar-today'
                              />
                            }
                            size={5}
                            ml='4'
                            color={errors?.creationDate && value !== '' ? 'red.500' : 'muted.900'}
                          />
                        }
                      />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={value}
                        mode='date'
                        is24Hour
                        onChange={onChange}
                      />
                    )}
                    {errors?.creationDate && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.creationDate?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </>
              )}
            />

            <Controller
              name='literaryGenres'
              control={control}
              render={({ field: { value = [], onChange, onBlur } }) => (
                <FormControl
                  isRequired
                  isInvalid={errors?.literaryGenres && value?.length === 0}
                >
                  <Box ml={2} mr={2} >
                    <FormControl.Label>
                      ¿De qué género es el libro?
                    </FormControl.Label>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={litGenres}

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
                    {errors?.literaryGenres && value?.length === 0 && (
                      <FormControl.ErrorMessage>
                        {errors?.literaryGenres?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </Box>
                </FormControl>
              )}
            />

            <Controller
              name='document'
              control={control}
              render={({ value }) => (
                <>
                  <FormControl
                    isRequired
                    isInvalid={errors?.document && document === ''}
                  >
                    <FormControl.Label>Documento PDF del libro</FormControl.Label>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        console.log('Upload document')
                        selectOneFile().then(res => {
                          setValue('document', res.name)
                          setDocument(res)
                        }).catch(err => {
                          console.log(err)
                        })
                      }}
                      style={{
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      
                      <StyledField
                        placeholder='Documento PDF del libro'
                        isReadOnly
                        value={document ? document.name : value}
                        borderColor={errors?.document && value !== '' ? 'red.500' : 'grey'}
                        InputLeftElement={
                          <Icon
                            as={
                              <Ionicons
                                name='document-attach'
                              />
                            }
                            size={5}
                            ml='4'
                            color={errors?.document && value !== '' ? 'red.500' : 'muted.900'}
                          />
                        }
                      />
                    </TouchableOpacity>
                    {errors?.document && document === '' && (
                      <FormControl.ErrorMessage>
                        {errors?.document?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </>
              )}
            />

            <Button
              title='Edita tu libro'
              buttonStyle={{
                width: 170,
                marginHorizontal: 2,
                backgroundColor: COLORS.button.primary
              }}
              isLoading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
            />

          </VStack>
        </Box>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default EditBookForm
