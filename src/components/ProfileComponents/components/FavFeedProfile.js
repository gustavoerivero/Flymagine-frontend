import React, { useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { Image, VStack, Text, ScrollView, Stack, FlatList } from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'
import BookItem from './BookItem'
import useAuthContext from '../../../hooks/useAuthContext'
import { getFavBooks } from '../../../services/user/userAPI'
import { useFocusEffect } from '@react-navigation/native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const FavFeedProfile = ({ navigation, userInfo }) => {
  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const {
    state: { user },
  } = useAuthContext()

  const [books, setBooks] = useState([])

  useFocusEffect(
    useCallback(() => {
      getFavBooks(userInfo?._id || user?.id)
        .then((res) => {
          let favs = res.filter((book) => book.status === 'A')
          setBooks(favs)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
  )

  return (
    <VStack
      px={1}
      minH={layout.height * 0.5}
      minW={layout.width}
      pb={layout.height * 0.2}
      mb={layout.height * 0.2}
    >
      {books?.length > 0 ? (
        <FlatList
          py={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={books}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <Stack p={0.5}>
              <BookItem
                key={item?._id}
                bookItem={item}
                navigation={navigation}
              />
            </Stack>
          )}
        />
      ) : (
        <VStack alignItems='center'>
          <Image
            source={DontKnow}
            alt='DontKnow'
            resizeMode='contain'
            size={300}
          />
          <Text bold textAlign='center' color={COLORS.primary}>
            {user.id === userInfo?._id
              ? 'No tienes libros favoritos aún...'
              : 'Este usuario no tiene algún libro favorito...'}
          </Text>
        </VStack>
      )}
    </VStack>
  )
}

export default FavFeedProfile
