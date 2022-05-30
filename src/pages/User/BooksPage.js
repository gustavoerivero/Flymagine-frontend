import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  ScrollView,
  View,
  Fab,
  Icon,
  VStack,
  Image,
  Text,
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

  const id = route?.params?.userId
  const [userInfo, setUserInfo] = useState(null)
  const [books, setBooks] = useState(route?.params?.books || [])

  const {
    state: { user }
  } = useAuthContext()

  useFocusEffect(
    useCallback(() => {

      getBooksByUser(id)
        .then(res => {
          setBooks(res)
        })

      getUserById(id)
        .then(res => {
          setUserInfo(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })

    }, [books])
  )

  return (
    <ScrollView bgColor='red'>
      <View minH={layout.height * .9} bgColor={COLORS.base} px={2} pt={1} >
        {books && books?.length > 0 ? books.map(book => (
          <BookItem
            key={book?._id}
            bookItem={book}
            navigation={navigation}
          />
        ))
          :
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
        }
        {userInfo && id === user.id && userInfo?.idRole?.name === 'Writter' && (
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
            onPress={() => console.log('Deja de presionarme!')}
            bgColor={COLORS.button.primary}
          />
        )}

      </View>
    </ScrollView>
  )
}

export default BooksPage