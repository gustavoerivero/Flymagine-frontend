import React, { useCallback, useState } from 'react'
import { Linking } from 'react-native'
import { AirbnbRating } from 'react-native-elements'

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons'

import {
  Box,
  AlertDialog,
  Text,
  VStack,
  Icon,
  HStack,
  FlatList,
  Badge,
  Button,
  IconButton,
  Image,
  ScrollView,
} from 'native-base'

import useAuthContext from '../../../hooks/useAuthContext'

import { useFocusEffect } from '@react-navigation/native'

//Data
import {
  setFavBooks,
  getFavBooks,
  setToReadBooks,
  getToReadBooks,
  setReadingBooks,
  getReadingBooks,
  setReadBooks,
  getReadBooks,
} from '../../../services/user/userAPI'
import { deleteBook } from '../../../services/book/bookAPI'
import { previousFourteenHours } from '../../../utils/functions'

//Colors
import COLORS from '../../styled-components/Colors'

//Styles
import stylesBook from '../../styled-components/stylesBook'

const InfoBookProfile = ({
  navigation,
  bookInfo,
  author,
  rating,
  bookGenres,
}) => {
  //Colors
  const backgroundColor = COLORS.button.primary
  const text = COLORS.secundary
  const elementsButton = COLORS.button.text
  const icon = COLORS.button.icon
  const buttonColor = COLORS.button.terciary
  const categoryBgColor = COLORS.button.secundary
  const textActivated = COLORS.button.text
  const textDisabled = COLORS.button.textDisabled

  //Status Book
  const [notRead, setNotRead] = useState(true)
  const [buttonToRead, setButtonToRead] = useState(false)
  const [buttonReading, setButtonReading] = useState(false)
  const [buttonRead, setButtonRead] = useState(false)

  const [fav, setFav] = useState(false)
  const [favouriteBooks, setFavouriteBooks] = useState(null)

  const [userToReadBooks, setUserToReadBooks] = useState(null)
  const [userReadingBooks, setUserReadingBooks] = useState(null)
  const [userReadBooks, setUserReadBooks] = useState(null)

  const [deleteVisible, setDeleteVisible] = useState(false)

  const {
    state: { user },
  } = useAuthContext()

  useFocusEffect(
    useCallback(() => {
      getFavBooks(user.id)
        .then((res) => {
          setFavouriteBooks(res)
          setFav(res.find((book) => book._id === bookInfo?._id))
        })
        .catch((error) => {
          console.log(error)
        })

      getToReadBooks(user.id)
        .then((res) => {
          setUserToReadBooks(res)
          let response = res.find((book) => book._id === bookInfo?._id)

          if (response) {
            setButtonToRead(true)
            setNotRead(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })

      getReadingBooks(user.id)
        .then((res) => {
          setUserReadingBooks(res)
          let response = res.find((book) => book._id === bookInfo?._id)

          if (response) {
            setButtonReading(true)
            setNotRead(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })

      getReadBooks(user.id)
        .then((res) => {
          setUserReadBooks(res)
          let response = res.find((book) => book._id === bookInfo?._id)

          if (response) {
            setButtonRead(true)
            setNotRead(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, [bookInfo])
  )

  const handleFav = async () => {
    let newFavBooks = favouriteBooks
    if (fav) {
      setFav(false)
      newFavBooks = favouriteBooks.filter((book) => book._id !== bookInfo?._id)
      setFavouriteBooks(newFavBooks)
      const response = await setFavBooks(user.id, newFavBooks)
      console.log(response)
    } else {
      setFav(true)
      newFavBooks.push(bookInfo)
      setFavouriteBooks(newFavBooks)
      const response = await setFavBooks(user.id, newFavBooks)
      console.log(response)
    }
  }

  const handleToRead = async () => {
    let newToReadBooks = userToReadBooks

    if (buttonToRead) {
      setNotRead(true)
      setButtonToRead(false)
      newToReadBooks = userToReadBooks.filter(
        (book) => book._id !== bookInfo?._id
      )
      setUserToReadBooks(newToReadBooks)
      const response = await setToReadBooks(user.id, newToReadBooks)
      console.log(response)
    } else {
      setNotRead(false)
      setButtonToRead(true)
      newToReadBooks.push(bookInfo)
      setUserToReadBooks(newToReadBooks)
      const response = await setToReadBooks(user.id, newToReadBooks)
      console.log(response)
    }
  }

  const handleReading = async () => {
    let newReadingBooks = userReadingBooks
    let newReadBooks = userReadBooks

    setNotRead(false)

    if (buttonReading) {
      setButtonReading(false)
      newReadingBooks = userReadingBooks.filter(
        (book) => book._id !== bookInfo?._id
      )
      setUserReadingBooks(newReadingBooks)
      const response = await setReadingBooks(user.id, newReadingBooks)
      console.log(response)

      setButtonRead(true)
      newReadBooks.push(bookInfo)
      setUserReadBooks(newReadBooks)
      const response2 = await setReadBooks(user.id, newReadBooks)
      console.log(response2)
    } else {
      let newToReadBooks = userToReadBooks

      if (newToReadBooks.find((book) => book._id === bookInfo?._id)) {
        setNotRead(false)
        setButtonToRead(false)
        newToReadBooks = userToReadBooks.filter(
          (book) => book._id !== bookInfo?._id
        )
        setUserToReadBooks(newToReadBooks)
        const response = await setToReadBooks(user.id, newToReadBooks)
        console.log(response)
      }

      if (newReadBooks.find((book) => book._id === bookInfo?._id)) {
        setButtonRead(false)
        newReadBooks = userReadBooks.filter(
          (book) => book._id !== bookInfo?._id
        )
        setUserReadBooks(newReadBooks)
        const response = await setReadBooks(user.id, newReadBooks)
        console.log(response)
      }

      setButtonReading(true)

      if (newReadingBooks.find((book) => book._id === bookInfo?._id)) {
      } else {
        newReadingBooks.push(bookInfo)
        setUserReadingBooks(newReadingBooks)
        const response = await setReadingBooks(user.id, newReadingBooks)
        console.log(response)
      }

      Linking.openURL(bookInfo?.document)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteBook(bookInfo?._id)
      console.log(response)
      showSuccessToast('¡Misión cumplida! El libro fue eliminado con éxito')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box h='100%' bg={backgroundColor} opacity='0.95'>
      <HStack h='30%'>
        <VStack w='40%' justifyContent='center' alignItems='center'>
          <Image
            source={{ uri: bookInfo?.photo }}
            style={stylesBook.image}
            alt='post'
          />
        </VStack>

        <VStack w='60%' px={1} justifyContent='center'>
          <HStack h='40%'>
            <Text fontSize='xl' bold color={text}>
              {bookInfo && bookInfo?.name}
            </Text>
          </HStack>

          <HStack h='10%'>
            <AirbnbRating
              count={5}
              showRating={false}
              size={16}
              defaultRating={rating ? rating : 0}
              isDisabled={true}
              selectedColor={'#FF00F0'}
              unSelectedColor={COLORS.button.secundaryDisabled}
            />
          </HStack>

          <HStack alignItems='center' pt={1} h='10%'>
            <Ionicons name='person' color={icon} />
            <Text fontSize='sm' color={text} pl={1}>
              {author && author?.lastName[0] + '. ' + author?.firstName}
            </Text>
          </HStack>

          <HStack alignItems='center' pt={1} h='10%'>
            <Entypo name='book' color={icon} />
            <Text fontSize='sm' color={text} pl={1}>
              Géneros:
            </Text>
          </HStack>

          <HStack my={2} h='15%'>
            <Box>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bookGenres}
                keyExtractor={(item) => item?._id}
                ItemSeparatorComponent={() => <Box w={1} />}
                renderItem={({ item }) => (
                  <Badge
                    colorScheme='success'
                    alignItems='center'
                    justifyContent='center'
                    style={{
                      borderRadius: 30,
                      backgroundColor: categoryBgColor,
                    }}
                  >
                    <Text color={elementsButton}>{item?.name}</Text>
                  </Badge>
                )}
              />
            </Box>
          </HStack>
        </VStack>
      </HStack>

      <HStack h='35%' justifyContent='center'>
        <VStack w='95%'>
          <HStack alignItems='center' my={1}>
            <MaterialIcons name='description' size={12} color={icon} />
            <Text fontSize='md' bold color={text} pl={1}>
              Sinopsis:
            </Text>
          </HStack>
          <ScrollView>
            <Text fontSize='md' color={text} pl={1} textAlign='justify'>
              {bookInfo && bookInfo?.sypnosis}
            </Text>
          </ScrollView>
        </VStack>
      </HStack>

      <HStack h='20%' justifyContent='center'>
        <VStack>
          <HStack justifyContent='space-around' h='40%' alignItems='center'>
            <Button
              h='95%'
              w='80%'
              bg={buttonColor}
              colorScheme='blueGray'
              endIcon={
                <Icon
                  as={Ionicons}
                  name='cloud-download-outline'
                  size='md'
                  color={elementsButton}
                />
              }
              borderRadius='full'
              onPress={handleReading}
            >
              <Text fontSize='md' bold color={elementsButton}>
                Descargar libro
              </Text>
            </Button>
            <IconButton
              h='95%'
              w='15%'
              variant='unstyled'
              alignItems='center'
              justifyContent='center'
              icon={
                <MaterialIcons
                  name='favorite'
                  size={35}
                  color={fav ? 'red' : icon}
                />
              }
              borderRadius='100'
              activeOpacity={0.85}
              onPress={handleFav}
            />
          </HStack>

          <HStack justifyContent='space-between' mt='3' maxH='30%'>
            <VStack alignItems='flex-start'>
              {author?._id === user?.id &&
                previousFourteenHours(bookInfo?.createdAt) && (
                  <>
                    <Button
                      h='95%'
                      variant='unstyled'
                      borderRadius='full'
                      startIcon={
                        <FontAwesome name='edit' size={15} color={icon} />
                      }
                      onPress={() =>
                        navigation.navigate('EditBook', { bookInfo })
                      }
                    >
                      <Text fontSize='md' bold color={text}>
                        Editar libro
                      </Text>
                    </Button>

                    <Button
                      h='95%'
                      variant='unstyled'
                      borderRadius='full'
                      startIcon={
                        <FontAwesome name='trash' size={15} color={icon} />
                      }
                      onPress={() => setDeleteVisible(true)}
                    >
                      <Text fontSize='md' bold color={text}>
                        Eliminar libro
                      </Text>
                    </Button>
                    <AlertDialog
                      isOpen={deleteVisible}
                      onClose={() => {
                        setDeleteVisible(false)
                      }}
                    >
                      <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>
                          Eliminación de libro
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                          ¿Estás seguro de que quieres eliminar este libro?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                          <Button.Group space={2}>
                            <Button
                              variant='unstyled'
                              colorScheme='coolGray'
                              onPress={() => {
                                setDeleteVisible(false)
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                              colorScheme='danger'
                              onPress={() => {
                                try {
                                  handleDelete()
                                  setDeleteVisible(false)
                                  navigation?.goBack()
                                } catch {
                                  showErrorToast(
                                    '¡Misión fallida! No se pudo eliminar el libro'
                                  )
                                }
                              }}
                            >
                              Eliminar
                            </Button>
                          </Button.Group>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog>
                  </>
                )}
            </VStack>

            <>
              {notRead && (
                <Button
                  h='95%'
                  variant='ghost'
                  borderRadius='full'
                  startIcon={
                    <MaterialCommunityIcons
                      name='bookmark'
                      size={15}
                      color={textDisabled}
                    />
                  }
                  onPress={handleToRead}
                >
                  <Text fontSize='md' bold color={textDisabled}>
                    Por leer
                  </Text>
                </Button>
              )}

              {buttonToRead && (
                <Button
                  h='95%'
                  variant='ghost'
                  borderRadius='full'
                  startIcon={
                    <MaterialCommunityIcons
                      name='bookmark-check'
                      size={15}
                      color={textActivated}
                    />
                  }
                  onPress={handleToRead}
                >
                  <Text fontSize='md' bold color={textActivated}>
                    Por leer
                  </Text>
                </Button>
              )}

              {buttonReading && (
                <Button
                  h='95%'
                  variant='ghost'
                  borderRadius='full'
                  startIcon={
                    <MaterialCommunityIcons
                      name='book-open-page-variant'
                      size={15}
                      color={icon}
                    />
                  }
                  onPress={handleReading}
                >
                  <Text fontSize='md' bold color={textActivated}>
                    Leyendo...
                  </Text>
                </Button>
              )}

              {buttonRead && (
                <Button
                  h='95%'
                  variant='unstyled'
                  borderRadius='full'
                  startIcon={
                    <MaterialCommunityIcons
                      name='sticker-check-outline'
                      size={15}
                      color={icon}
                    />
                  }
                  alignItems='center'
                >
                  <Text fontSize='md' bold color={textActivated}>
                    Leído
                  </Text>
                </Button>
              )}
            </>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default InfoBookProfile
