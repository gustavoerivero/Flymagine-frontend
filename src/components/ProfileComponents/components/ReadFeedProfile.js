import React, { useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import {
  Image,
  VStack,
  Text,
  ScrollView,
} from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'
import BookItem from './BookItem'
import useAuthContext from '../../../hooks/useAuthContext'
import { getReadBooks } from '../../../services/user/userAPI'
import { useFocusEffect } from '@react-navigation/native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ReadFeedProfile = ({ navigation, userInfo }) => {

  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const {
    state: { user }
  } = useAuthContext()

  const [books, setBooks] = useState([])

  useFocusEffect(
    useCallback(() => {
      getReadBooks(userInfo?._id || user?.id)
        .then(res => {
          let read = res.filter(book => book.status === 'A')
          setBooks(read)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])
  )

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <VStack
        space={2}
        minH={layout.height + 300}
        minW={layout.width}
        m={2}
        pr={4}
        pb={layout.height * .2}
        mb={layout.height * .2}
      >
        {books?.length > 0 ? books.map((book, index) => (
          <BookItem
            key={index}
            bookItem={book}
            navigation={navigation}
          />
        )) : (
          <VStack alignItems='center'>
            <Image
              source={DontKnow}
              alt='DontKnow'
              resizeMode='contain'
              size={300}
            />
            <Text bold textAlign='center' color={COLORS.primary}>
              {user.id === userInfo?._id ? 'No tienes libros que hayas leído aún...' : 'Este usuario no ha leído ningún libro...'}
            </Text>
          </VStack>
        )}
      </VStack>

    </ScrollView>
  )
}

export default ReadFeedProfile