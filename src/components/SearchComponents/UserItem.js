import React, { useState, useCallback } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
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
  Divider,
} from 'native-base'
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

import useAuthContext from '../../hooks/useAuthContext'
import { setFollowsByUser, getFollows } from '../../services/user/userAPI'
import COLORS from '../../components/styled-components/Colors'

const UserItem = ({ userItem, navigation }) => {
  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [isFollow, setIsFollow] = useState(false)
  const [follows, setFollows] = useState(null)

  useFocusEffect(
    useCallback(() => {
      getFollows(user?.id)
        .then((res) => {
          setFollows(res?.Data?.follows)

          if (follows?.find((f) => f._id === userItem._id)) {
            setIsFollow(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }, [follows])
  )

  const handleFollow = async () => {
    let newFollows = [...follows]

    if (isFollow) {
      newFollows = newFollows.filter((f) => f._id !== userItem?._id)
      setIsFollow(false)
    } else {
      newFollows.push(userItem)
      setIsFollow(true)
    }

    await setFollowsByUser(user.id, newFollows)
      .then((res) => {
        console.log(res)
        setFollows(res?.Data?.follows)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate('UserProfile', { user: userItem?._id })
      }}
      activeOpacity={0.8}
    >
      <Box
        mb={1}
        w='100%'
        h={layout.height * 0.09}
        alignItems='center'
        alignContent='center'
        alignSelf='center'
        justifyContent='center'
        borderRadius='lg'
      >
        <HStack
          alignItems='center'
          justifyContent='space-between'
          w='98%'
          h='95%'
        >
          <Stack w='17%' h='90%' justifyContent='center'>
            <Avatar
              bg='purple.600'
              size='lg'
              source={{
                uri: userItem?.photo === 'none' ? null : userItem?.photo,
              }}
              borderColor='white'
              borderWidth={3}
            >
              {userItem && userItem?.firstName[0] + userItem?.lastName[0]}
            </Avatar>
          </Stack>

          <VStack w='55%' h='80%' alignItems='center' justifyContent='center'>
            <HStack w='90%' h='50%'>
              <Text bold fontSize='md' w='100%'>
                {userItem?.firstName} {userItem?.lastName}
              </Text>
            </HStack>
            <HStack space={2} alignItems='center' w='90%' h='30%'>
              <Icon
                opacity={0.5}
                color={'purple.600'}
                as={
                  userItem?.role?._id === '62a68e04f76e5e02ef008afc'
                    ? FontAwesome5
                    : AntDesign
                }
                name={
                  userItem?.role?._id === '62a68e04f76e5e02ef008afc'
                    ? 'book-reader'
                    : 'edit'
                }
              />
              <Text fontSize='xs' opacity={0.5} color={'purple.600'} italic>
                {userItem?.role?._id === '62a68e04f76e5e02ef008afc'
                  ? 'Lector'
                  : 'Escritor'}
              </Text>
            </HStack>
          </VStack>

          <Stack w='27%' h='100%' alignItems='center' justifyContent='center'>
            {user?.id !== userItem?._id && (
              <Button
                w='95%'
                size='xs'
                variant='outline'
                height={layout.height * 0.04}
                borderRadius={50}
                onPress={() => {
                  console.log(isFollow ? 'unfollow' : 'follow')
                  handleFollow()
                }}
              >
                <Text fontSize={10} color={COLORS.primary}>
                  {isFollow ? 'Dejar de seguir' : 'Seguir'}
                </Text>
              </Button>
            )}
          </Stack>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

export default UserItem
