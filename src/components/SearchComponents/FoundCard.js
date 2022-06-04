import React, { useState, useCallback } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Icon,
  Badge,
  Spacer,
} from 'native-base'
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

//image
import userfound from '../../../assets/images/userfound.png'

import COLORS from '../styled-components/Colors'

const FoundCard = ({ imageCard, section, index, navigation }) => {
  const layout = useWindowDimensions()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      //onPress={ section == 'Usuarios' ? (() => {index(1)}) : section == 'Libros' ? (() => {index(2)}) : (() => {index(3)})
      onPress={() => {
        section == 'Usuarios'
          ? index(1)
          : section == 'Libros'
          ? index(2)
          : index(3)
      }}
    >
      <Box
        maxH={layout.height * 0.15}
        w='100%'
        mb={2}
        borderRadius='lg'
        bg={COLORS.secundary}
        shadow={1}
      >
        <HStack
          h='100%'
          w='100%'
          justifyContent='center'
          alignItems='center'
          pr={2}
        >
          <VStack
            h='100%'
            w='30%'
            justifyContent='center'
            alignItems='center'
            p={1}
          >
            <Image
              source={imageCard}
              /*source={book}*/
              w='90%'
              h='90%'
              borderRadius={5}
              alt={'hola'}
            />
          </VStack>

          <VStack h='90%' w='70%' justifyContent='center' borderRadius='lg'>
            <Badge
              bg={COLORS.primary}
              w='40%'
              //w={ section == 'Usuarios' ? '30%' : section == 'Libros' ? '30%' : '40%' }
              variant='solid'
              rounded='4'
              justifyContent='center'
            >
              <Text bold color={COLORS.secundary} fontSize='xs'>
                {section}
              </Text>
            </Badge>
            <Spacer />
            <HStack w='95%' h='40%' pl={2}>
              <Text bold fontSize='sm' textAlign='justify'>
                Encontramos resultados que te pueden interesar
              </Text>
            </HStack>
            <HStack
              w='100%'
              h='30%'
              pl={2}
              pt={1}
              justifyContent='flex-end'
              alignItems='center'
            >
              <Icon
                as={AntDesign}
                name='caretright'
                color={COLORS.gray1}
                _dark={{
                  color: 'warmGray.50',
                }}
                size='xs'
                mx={1}
              />
              <Text fontSize='xs' textAlign='justify' color={COLORS.gray1}>
                Pulsa para ver los resultados
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

export default FoundCard
