import React, { useState, useCallback } from 'react'
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Icon,
  Link,
} from 'native-base'
import {
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'

import { getFollows, getFollowers } from '../../../services/user/userAPI'
import { getBooksByUser } from '../../../services/book/bookAPI'

const InfoUserProfile = ({ userInfo, navigation }) => {

  const [follows, setFollows] = useState(null)
  const [followers, setFollowers] = useState(null)
  const [books, setBooks] = useState(null)

  useFocusEffect(
    useCallback(() => {
      if (userInfo) {
        getFollowers(userInfo?._id)
          .then(res => {
            setFollowers(res?.Data)
          })
          .catch(error => {
            console.log(error)
          })
        getFollows(userInfo?._id)
          .then(res => {
            setFollows(res?.Data?.follows)
          })
          .catch(error => {
            console.log(error)
          })
        getBooksByUser(userInfo?._id)
          .then(res => {
            setBooks(res)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, [])
  )

  return (
    <Box
      px={3}
      bgColor='white'
      w='100%'
    >
      <Stack>
        <VStack>
          <HStack
            mr={3}
          >
            <Icon
              mt={1}
              mr={4}
              as={MaterialIcons}
              name='history-edu'
            />
            <Text
              fontSize='xs'
            >
              {userInfo ? userInfo?.biography : null}
            </Text>
          </HStack>
          <HStack
            mr={3}
          >
            <Icon
              mr={4}
              as={FontAwesome}
              name='birthday-cake'
            />
            <Text
              fontSize='xs'
              italic
            >
              {userInfo ? userInfo?.birthday.split('T')[0].split('-').reverse().join('/') : '-'}
            </Text>
          </HStack>
          <HStack
            mb={2}
            space={5}
            alignItems='center'
          >
            <Link
              onPress={() => {
                navigation?.navigate('MyFollow', { userId: userInfo?._id, follows: follows })
              }}
            >
              <Text
                fontSize='md'
              >
                <Text
                  fontSize='lg'
                  bold
                >
                  {follows ? follows?.length : 0}
                </Text>
                {''} Siguiendo
              </Text>
            </Link>
            <Link
              onPress={() => navigation?.navigate('MyFollower', { userId: userInfo?._id, followers: followers })}
            >
              <Text
                fontSize='md'
              >
                <Text
                  fontSize='lg'
                  bold
                >
                  {followers ? followers?.length : 0}
                </Text>
                {''} Seguidores
              </Text>
            </Link>
            {userInfo?.idRole && userInfo?.idRole?.name === 'Writter' &&
              <Link
                onPress={() => navigation?.navigate('MyFollower', { userId: userInfo?._id, followers: followers })}
              >
                <Text
                  fontSize='md'
                >
                  <Text
                    fontSize='lg'
                    bold
                  >
                    {books ? books?.length : 0}
                  </Text>
                  {''} {books?.length === 1 ? 'Libro' : 'Libros'}
                </Text>
              </Link>
            }
          </HStack>
        </VStack>
      </Stack>
    </Box>
  )
}

export default InfoUserProfile
