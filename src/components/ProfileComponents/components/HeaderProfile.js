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
} from 'native-base'
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import useAuthContext from '../../../hooks/useAuthContext'
import { setFollowsByUser, getFollows } from '../../../services/user/userAPI'
import COLORS from '../../styled-components/Colors'

const HeaderProfile = ({ userInfo, navigation }) => {

  const {
    state: { user },
  } = useAuthContext()

  const [isFollow, setIsFollow] = useState(false)
  const [follows, setFollows] = useState(null)

  useFocusEffect(
    useCallback(() => {
      getFollows(user?.id)
        .then(res => {
          setFollows(res?.Data?.follows)

          if (follows?.find(f => f._id === userInfo?._id)) {
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
      newFollows = newFollows.filter(f => f._id !== userInfo?._id)
      setIsFollow(false)
    } else {
      newFollows.push(userInfo)
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
    <Box
      px={3}
      pt={3}
      bgColor="white"
    >
      <Stack>
        <HStack>
          <VStack
            w='85%'
          >
            <Avatar
              bg='purple.600'
              size='xl'
              source={{
                uri: userInfo?.photo === 'none' ?
                  null
                  : userInfo?.photo
              }}
              borderColor='white'
              borderWidth={3}
            >
              {userInfo && (userInfo?.firstName[0] + userInfo?.lastName[0])}
            </Avatar>
            <Text
              fontSize='xl'
              bold
              color={'purple.900'}
            >
              {userInfo && (userInfo?.firstName + ' ' + userInfo?.lastName)}
            </Text>

            <HStack
              space={2}
              alignItems='center'
            >
              <Icon
                as={userInfo?.idRole?.name === 'Reader' ? FontAwesome5 : AntDesign}
                name={userInfo?.idRole?.name === 'Reader' ? 'book-reader' : 'edit'}
              />
              <Text
                fontSize='sm'
                color={'purple.600'}
                italic
              >
                - {userInfo?.idRole?.name === 'Reader' ? 'Lector' : 'Escritor'} desde {userInfo?.createdAt ? userInfo?.createdAt.split('T')[0].split('-').reverse().join('/') : '-'}
              </Text>
            </HStack>
          </VStack>
          {userInfo && userInfo?._id === user?.id ?
            <VStack>
              <IconButton
                borderRadius='full'
                variant='solid'
                shadow={true}
                icon={
                  <MaterialCommunityIcons
                    name='account-edit'
                    size={24}
                    color='white'
                  />
                }
                onPress={() => {
                  navigation?.navigate('EditProfile')
                }}
              />
            </VStack>
            :
            <VStack>
              <IconButton
                borderRadius='full'
                variant={'outline'}
                borderColor={isFollow ? COLORS.button.secundary : COLORS.button.terciary}
                icon={
                  <FontAwesome5
                    name={isFollow ? 'user-times' : 'user-plus'}
                    size={20}
                    color={isFollow ? COLORS.button.secundary : COLORS.button.terciary}
                  />
                }
                onPress={() => {
                  handleFollow()
                }}
              />
            </VStack>
          }

        </HStack>
      </Stack>
    </Box>
  )
}

export default HeaderProfile