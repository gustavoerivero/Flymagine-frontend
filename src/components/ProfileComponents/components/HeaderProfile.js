import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Avatar,
  Icon,
  IconButton,
  Link,
} from 'native-base'
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import useAuthContext from '../../../hooks/useAuthContext'
import {
  setFollowsByUser,
  getFollows,
  getFollowers,
} from '../../../services/user/userAPI'
import { getBooksByUser } from '../../../services/book/bookAPI'
import COLORS from '../../styled-components/Colors'
import { TouchableOpacity } from 'react-native'

const HeaderProfile = ({ userInfo, navigation }) => {

  const [follows, setFollows] = useState(null)
  const [followers, setFollowers] = useState(null)
  const [books, setBooks] = useState(null)

  useFocusEffect(
    useCallback(() => {
      if (userInfo) {
        getFollowers(userInfo?._id)
          .then((res) => {
            setFollowers(res?.Data)
          })
          .catch((error) => {
            console.log(error)
          })
        getFollows(userInfo?._id)
          .then((res) => {
            setFollows(res?.Data?.follows)
          })
          .catch((error) => {
            console.log(error)
          })
        getBooksByUser(userInfo?._id)
          .then((res) => {
            setBooks(res)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }, [])
  )

  return (
    <Box px={3} pt={3} bgColor='white' w='100%'>
      <VStack w='100%'>
        <HStack w='100%' /* AVATAR & BUTTONS */>
          <Stack w='25%' /* AVATAR */>
            <Avatar
              bg='purple.600'
              size='xl'
              source={{
                uri: userInfo?.photo === 'none' ? null : userInfo?.photo,
              }}
              borderColor='white'
              borderWidth={3}
            >
              {userInfo && userInfo?.firstName[0] + userInfo?.lastName[0]}
            </Avatar>
          </Stack>

          <Stack /* BOOKS */
            w='25%'
            pl={4}
            alignItems='center'
            justifyContent='center'
          >
            {userInfo?.role && userInfo?.role?.name === 'Writer' && (
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('BooksPage', {
                    user: userInfo?._id,
                    books: books,
                  })
                }
              >
                <VStack w='95%' alignItems='center' justifyContent='center'>
                  <Text fontSize='xl' bold>
                    {books ? books?.length : 0}
                  </Text>
                  <Text fontSize='md'>
                    {books?.length === 1 ? 'Libro' : 'Libros'}
                  </Text>
                </VStack>
              </TouchableOpacity>
            )}
          </Stack>

          <Stack /* FOLLOWERS */
            w='25%'
            alignItems='center'
            justifyContent='center'
          >
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('MyFollower', {
                  user: userInfo?._id,
                  followers: followers,
                })
              }
            >
              <VStack w='95%' alignItems='center' justifyContent='center'>
                <Text fontSize='xl' bold>
                  {followers ? followers?.length : 0}
                </Text>
                <Text fontSize='md'>Seguidores</Text>
              </VStack>
            </TouchableOpacity>
          </Stack>

          <Stack /* FOLLOWS */
            w='25%'
            alignItems='center'
            justifyContent='center'
          >
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('MyFollow', {
                  user: userInfo?._id,
                  follows: follows,
                })
              }}
            >
              <VStack w='95%' alignItems='center' justifyContent='center'>
                <Text fontSize='xl' bold>
                  {follows ? follows?.length : 0}
                </Text>
                <Text fontSize='md'>Siguiendo</Text>
              </VStack>
            </TouchableOpacity>
          </Stack>
        </HStack>

        <HStack /* USERNAME */ w='100%'>
          <Text fontSize='xl' bold color={'purple.900'}>
            {userInfo && userInfo?.firstName + ' ' + userInfo?.lastName}
          </Text>
        </HStack>

        <HStack /* ROL SINCE & BIRTHDAY */ w='100%'>
          <HStack space={2} alignItems='center' w='60%'>
            <Icon
              as={
                userInfo?.role?.name === 'Reader' ? FontAwesome5 : AntDesign
              }
              name={
                userInfo?.role?.name === 'Reader' ? 'book-reader' : 'edit'
              }
            />
            <Text fontSize='sm' color={'purple.600'} italic>
              - {userInfo?.role?.name === 'Reader' ? 'Lector' : 'Escritor'}{' '}
              desde{' '}
              {userInfo?.createdAt
                ? userInfo?.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('/')
                : '-'}
            </Text>
          </HStack>

          <HStack alignItems='center' w='40%'>
            <Icon mr={4} as={FontAwesome} name='birthday-cake' />
            <Text fontSize='xs' italic>
              {userInfo
                ? userInfo?.birthday
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('/')
                : '-'}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default HeaderProfile
