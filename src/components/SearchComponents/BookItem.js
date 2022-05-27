import React, { useCallback } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Icon,
} from 'native-base'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import useAuthContext from '../../hooks/useAuthContext'

const BookItem = ({ bookItem, navigation }) => {

  const layout = useWindowDimensions()

  const {
    state: { user }
  } = useAuthContext()

  useFocusEffect(
    useCallback(() => {
     
    }, [])
  )

  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate('BookProfilePage', { book: bookItem?._id })
      }}
    >
      <Box
        p={5}
        m={1}
        w={layout.width}
      >
        <HStack space={2}>

          <Image 
            source={{ 
              uri: bookItem?.photo !== 'none' ? bookItem?.photo : 'https://via.placeholder.com/300.png?text=no+image' 
            }}
            style={{ 
              width: 75, 
              height: 100 
            }}
            borderRadius={5}
            alt={bookItem?.name}
          />
          <VStack w={layout.width * .6} mt={2}>
            <HStack>
              <Text bold fontSize='sm' textAlign='justify'>
              {bookItem?.name?.length > 75
                  ? bookItem?.name?.substring(0, 75 - 3) + '...'
                  : bookItem?.name}
              </Text>
            </HStack>
            <HStack space={2}>
              <Icon
                mr={1}
                mt={.5}
                as={FontAwesome}
                name='user-circle-o'
              />
              <Text fontSize='xs' alignContent='center' textAlign='justify' italic>
                {bookItem?.idUser?.firstName} {bookItem?.idUser?.lastName}
              </Text>
            </HStack>
            <HStack space={2}>
              <Icon
                mr={1}
                mt={.5}
                as={MaterialIcons}
                name='date-range'
              />
              <Text fontSize='xs' alignContent='center' textAlign='justify' italic>
                {bookItem?.createdAt ? bookItem?.createdAt.split('T')[0].split('-').reverse().join('/') : '-'}
              </Text>
            </HStack>
            <HStack space={2}>
              <Icon
                mr={1}
                mt={.5}
                as={MaterialIcons}
                name='history-edu'
              />
              <Text fontSize='xs' alignContent='center' textAlign='justify'>
                {bookItem?.sypnosis?.length > 165
                  ? bookItem?.sypnosis?.substring(0, 165 - 3) + '...'
                  : bookItem?.sypnosis}
              </Text>
            </HStack>

          </VStack>

        </HStack>

      </Box>
    </TouchableOpacity>
  )
}

export default BookItem