import React, { useState, useCallback } from 'react'
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
} from 'native-base'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import useAuthContext from '../../../hooks/useAuthContext'

import {
  getFollows,
  getFollowers,
  setFollowsByUser,
} from '../../../services/user/userAPI'
import { getBooksByUser } from '../../../services/book/bookAPI'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import COLORS from '../../styled-components/Colors'
import { ActivityIndicator } from 'react-native'

const InfoUserProfile = ({ userInfo, navigation }) => {
  const {
    state: { user },
  } = useAuthContext()

  const [isFollow, setIsFollow] = useState(null)
  const [follows, setFollows] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      getFollows(user?.id)
        .then((res) => {

          let foll = res?.Data?.follows
          setFollows(foll)
          setIsFollow(foll?.find((f) => f._id === userInfo?._id))
          setIsLoading(false)

        })
        .catch((err) => {
          console.log('Follows error: ', err)
          setIsLoading(false)
        })
    }, [follows])
  )

  const handleFollow = async () => {
    
    setIsLoading(true)
    let newFollows = [...follows]

    if (isFollow) {
      newFollows = newFollows.filter((f) => f._id !== userInfo?._id)
      setIsFollow(false)
    } else {
      newFollows.push(userInfo)
      setIsFollow(true)
    }

    await setFollowsByUser(user.id, newFollows)
      .then((res) => {
        console.log(res)
        setFollows(res?.Data?.follows)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return (
    <Box px={3} bgColor='white' w='100%'>
      <Stack>
        <VStack>
          <HStack /* BIOGRAPHY */
            mr={2}
            mb={2}
            pt={1}
            w='100%'
            alignItems='flex-start'
          >
            <VStack w='5%' pt={0.5} alignItems='center'>
              <Icon as={MaterialIcons} name='history-edu' />
            </VStack>
            <VStack w='95%' pl={2}>
              <Text fontSize='xs' /*textAlign='justify'*/>
                {userInfo ? userInfo?.biography : null}
              </Text>
            </VStack>
          </HStack>

          {userInfo && userInfo?._id === user?.id ? (
            <HStack /* FOLLOW & EDIT BUTTON */ my={2} alignItems='center'>
              <Button
                w='100%'
                borderRadius='full'
                variant='solid'
                colorScheme='blueGray'
                shadow={true}
                bg={COLORS.button.terciary}
                onPress={() => {
                  navigation?.navigate('EditProfile')
                }}
              >
                <Text bold color={COLORS.button.text}>
                  Editar Perfil
                </Text>
              </Button>
            </HStack>
          ) : (
            <HStack mt={2}>
              <Button
                borderRadius='full'
                w='100%'
                variant={'outline'}
                borderColor={
                  isFollow ? COLORS.button.secundary : COLORS.button.terciary
                }
                startIcon={
                  !isLoading &&
                  <FontAwesome5
                    name={isFollow ? 'user-times' : 'user-plus'}
                    size={20}
                    color={
                      isFollow
                        ? COLORS.button.secundary
                        : COLORS.button.terciary
                    }
                  />
                }
                isDisabled={isLoading}
                onPress={handleFollow}
              >
                {!isLoading ?
                  <Text
                    bold
                    fontSize='md'
                    color={
                      isFollow ? COLORS.button.secundary : COLORS.button.terciary
                    }
                  >
                    {isFollow ? 'Dejar de seguir' : 'Seguir'}
                  </Text>
                  :
                  <ActivityIndicator
                    size='small'
                    color={COLORS.button.terciary}
                  />
                }

              </Button>
            </HStack>
          )}
        </VStack>
      </Stack>
    </Box>
  )
}

export default InfoUserProfile
