import React, { useState, useCallback } from 'react'
import { RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native'
import {
  View,
  Fab,
  Icon,
  VStack,
  Image,
  Text,
  FlatList,
  Stack,
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import DontKnow from '../../../assets/images/dontknow.png'
import BookItem from '../../components/ProfileComponents/components/BookItem'
import COLORS from '../../components/styled-components/Colors'
import { useFocusEffect } from '@react-navigation/native'
import useAuthContext from '../../hooks/useAuthContext'
import { getUserById } from '../../services/user/userAPI'
import { getBooksByUser } from '../../services/book/bookAPI'

const BooksPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const id = route?.params?.user

  const [userInfo, setUserInfo] = useState(null)
  const [books, setBooks] = useState(route?.params?.books || [])

  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)

  const {
    state: { user }
  } = useAuthContext()

  const onRefresh = useCallback(() => {
    setBooks([])
    setIsNextPage(true)
    setCurrentPage(1)
    getBooks()
  }, [])

  const getBooks = () => {

    console.log('Book List Page: ', currentPage)

    if (isNextPage) {

      setIsLoading(true)
      getBooksByUser(id, currentPage)
        .then((res) => {

          let booksReceived = res?.docs

          setIsNextPage(res?.hasNextPage)
          console.log(`Have Next User Page: ${res?.hasNextPage ? 'Yes' : 'No'}`)

          if (booksReceived?.length > 0) {
            books.map((book) => {
              booksReceived = booksReceived.filter((b) => b._id !== book._id && b.status === 'A')
            })
            setBooks([...books, ...booksReceived])
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.log('Book list error: ', error)
          setIsLoading(false)
        })
    }

  }

  useFocusEffect(
    useCallback(() => {
      getBooks()
      getUserById(id)
        .then(res => {
          setUserInfo(res?.Data)
        })
        .catch(error => {
          console.log('User on book list error: ', error)
        })

    }, [currentPage])
  )

  const renderItem = ({ item }) => {
    return (
      <BookItem
        key={item?._id}
        bookItem={item}
        navigation={navigation}
      />
    )
  }

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </Stack>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <View minH={layout.height * .9} bgColor={COLORS.base} px={2} pt={1} >
      {books?.length === 0 && !isLoading ?
        <VStack alignItems='center' justifyContent='center' h='80%'>
          <Image
            source={DontKnow}
            alt='DontKnow'
            resizeMode='contain'
            size={300}
          />
          <Text bold textAlign='center' color={COLORS.primary}>
            {user.id === id ? 'No has creado algún libro aún...' : 'Este usuario no ha creado algún libro aún...'}
          </Text>
        </VStack>
        :
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={books}
          keyExtractor={item => item?._id?.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
        />
      }
      {userInfo && id === user.id && userInfo?.role?.name === 'Writer' && (
        <Fab
          renderInPortal={false}
          shadow={2}
          icon={
            <Icon
              color='white'
              as={
                <AntDesign
                  name='plus'
                  size={24}
                />
              }
              size={7}
            />
          }
          onPress={() => navigation?.navigate('RegisterBook')}
          bgColor={COLORS.button.primary}
        />
      )}
    </View>
  )
}

export default BooksPage