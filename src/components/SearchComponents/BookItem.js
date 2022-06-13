import React, { useCallback } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Box, VStack, HStack, Image, Text, Icon, Stack } from 'native-base'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import useAuthContext from '../../hooks/useAuthContext'

//Image
import book from '../../../assets/book.jpg'
import COLORS from '../styled-components/Colors'

const BookItem = ({ bookItem, navigation }) => {
  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  useFocusEffect(useCallback(() => {}, []))

  return (
    <TouchableOpacity
    activeOpacity={0.8}
      onPress={() => {
        navigation?.navigate('BookProfilePage', { book: bookItem?._id })
      }}
    >
      <Box maxH={layout.height * .20} w='100%' mb={2} borderRadius='lg' bg={COLORS.secundary} shadow={1}>
        <HStack h='100%' w='100%' justifyContent='center' alignItems='center'>
          <VStack
            h='100%'
            w='30%'
            justifyContent='center'
            alignItems='center'
          >
            <Image
              source={{ 
              uri: bookItem?.photo !== 'none' ? bookItem?.photo : 'https://via.placeholder.com/300/?text=no+image' 
            }}
            /*source={book}*/
              w='90%'
              h='90%'
              borderRadius={5}
              alt={bookItem?.name}
            />
          </VStack>

          <VStack
            h='90%'
            w='70%'
            justifyContent='center'
            alignItems='center'
          >
            <HStack w='95%' h='30%'>
              <Text bold fontSize='sm' textAlign='justify'>
                {bookItem?.name?.length > 75
                  ? bookItem?.name?.substring(0, 75 - 3) + '...'
                  : bookItem?.name}
              </Text>
            </HStack>
            <HStack w='95%' h='15%'>
              <HStack
                w='60%'
                space={1}
                alignItems='flex-start'
              >
                <Icon mr={1} mt={0.5} as={FontAwesome} name='user-circle-o' />
                <Text
                  fontSize='xs'
                  alignContent='center'
                  textAlign='justify'
                  italic
                >
                  {bookItem?.user?.firstName} {bookItem?.user?.lastName}
                </Text>
              </HStack>
              <HStack
                w='40%'
                space={1}
                alignItems='flex-start'
              >
                <Icon mr={1} mt={0.5} as={MaterialIcons} name='date-range' />
                <Text
                  fontSize='xs'
                  alignContent='center'
                  textAlign='justify'
                  italic
                >
                  {bookItem?.createdAt
                    ? bookItem?.createdAt
                        .split('T')[0]
                        .split('-')
                        .reverse()
                        .join('/')
                    : '-'}
                </Text>
              </HStack>
            </HStack>

            <HStack space={1} h='55%' w='95%'>
              <Icon w='10%' mr={1} mt={0.5} as={MaterialIcons} name='history-edu' />
              <Text w='90%' h='90%' fontSize='xs' alignContent='center' textAlign='justify'>
                {bookItem?.sypnosis?.length > 22
                  ? bookItem?.sypnosis?.substring(0, 150 - 3) + '...'
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
