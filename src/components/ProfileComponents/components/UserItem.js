import React, { useState, useCallback } from 'react'
import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  Box,
  VStack,
  HStack,
  Stack,
  Text,
  Avatar,
  Button,
  Icon,
} from 'native-base'
import {
  MaterialIcons,
  FontAwesome5,
  AntDesign
} from '@expo/vector-icons'

import useAuthContext from '../../../hooks/useAuthContext'
import { setFollowsByUser, getFollows } from '../../../services/user/userAPI'
import COLORS from '../../../components/styled-components/Colors'

const UserItem = ({ userItem, navigation, onPress }) => {

  const layout = useWindowDimensions()

  const {
    state: { user }
  } = useAuthContext()

  const [isFollow, setIsFollow] = useState(null)
  const [follows, setFollows] = useState(null)

  useFocusEffect(
    useCallback(() => {
      getFollows(user?.id)
        .then(res => {
          setFollows(res?.Data?.follows)

          if (follows?.find(f => f._id === userItem._id)) {
            setIsFollow(true)
          }

        })
        .catch(err => {
          console.log(err)
        })
    }, [follows])
  )

  const handleFollow = async () => {

    let newFollows = [...follows]

    if (isFollow) {
      newFollows = newFollows.filter(f => f._id !== userItem?._id)
      setIsFollow(false)
    } else {
      newFollows.push(userItem)
      setIsFollow(true)
    }

    await setFollowsByUser(user.id, newFollows)
      .then(res => {
        console.log(res)
        setFollows(res?.Data?.follows)
      })
      .catch(err => {
        console.log(err)
      })

  }


  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate('UserProfile', { user: userItem?._id })
      }}
    >
      <Box
        p={5}
        m={1}
        w='100%'
        alignItems='center'
        alignContent='center'
        alignSelf='center'
        justifyContent='center'
      >
        <HStack space={2}>

          <Avatar
            bg='purple.600'
            size='lg'
            source={{
              uri: (userItem?.photo === 'none' ? null : userItem?.photo)
            }}
            borderColor='white'
            borderWidth={3}
          >
            {userItem && (userItem?.firstName[0] + userItem?.lastName[0])}
          </Avatar>

          <VStack w={layout.width * .5} mt={2}>
            <HStack>
              <Text bold fontSize='sm'>
                {userItem?.firstName} {userItem?.lastName}
              </Text>
            </HStack>
            <HStack
              space={2}
              alignItems='center'
            >
              <Icon
                as={userItem?.role === '62a68e04f76e5e02ef008afc' ? FontAwesome5 : AntDesign}
                name={userItem?.role === '62a68e04f76e5e02ef008afc' ? 'book-reader' : 'edit'}
              />
              <Text
                fontSize='xs'
                color={'purple.600'}
                italic
              >
                {userItem?.role === '62a68e04f76e5e02ef008afc' ? 'Lector' : 'Escritor'}
              </Text>
            </HStack>
            <HStack space={2}>
              <Icon
                mr={1}
                mt={.5}
                as={MaterialIcons}
                name='history-edu'
              />
              <Text fontSize='xs' alignContent='center'>
                {userItem?.biography?.length > 22
                  ? userItem?.biography?.substring(0, 99 - 3) + '...'
                  : userItem?.biography}
              </Text>
            </HStack>

          </VStack>

          <Stack
            mt={3}
            w={layout.width * .25}
          >
            {user?.id !== userItem?._id && (
              <Button
                size='xs'
                variant='outline'
                height={layout.height * .04}
                borderRadius={50}
                onPress={() => {
                  console.log(isFollow ? 'unfollow' : 'follow')
                  handleFollow()
                }}
              >
                {isFollow !== null ?
                  <Text fontSize={9} color={COLORS.primary}>
                    {isFollow ? 'Dejar de seguir' : 'Seguir'}
                  </Text>
                  :
                  <ActivityIndicator
                    size='small'
                    color={COLORS.primary}
                  />
                }
              </Button>
            )}
          </Stack>

        </HStack>

      </Box>
    </TouchableOpacity>
  )
}

export default UserItem