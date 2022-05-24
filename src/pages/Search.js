import React, { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  View,
  Box,
  HStack,
  Image,
  IconButton,
  Icon,
  VStack,
  Stack,
  Text,
  ScrollView,
} from 'native-base'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import StyledField from '../components/SearchComponents/StyledField'
import TabContainerSearch from '../components/SearchComponents/TabContainerSearch'
import COLORS from '../components/styled-components/Colors'

import Pana from '../../assets/images/pana.png'

const Search = ({ navigation }) => {

  const layout = useWindowDimensions()

  const [search, setSearch] = useState('')

  return (
    <View minH={layout.height}>
      <VStack alignItems='center'>
        <Stack bgColor={COLORS.primary} alignItems='flex-start' w='100%' p={4} pl={6}>
          <Text bold fontSize={20} color='white'>
            Descubre nuevos mundos...
          </Text>
        </Stack>
        <Stack bgColor={COLORS.primary} w='100%' alignItems='center' pb={2}>
          <StyledField
            placeholder='¿Qué estás buscando?'
            onChangeText={(text) => setSearch(text)}
            value={search}
            leftElement={
              <Icon
                as={search === '' ? FontAwesome : FontAwesome5}
                name={search === '' ? 'search' : 'arrow-alt-circle-right'}
                color={COLORS.button.primary}
                size={6}
                ml={3}
              />
            }
            rightElement={
              search !== '' && (
                <IconButton
                  onPress={() => setSearch('')}
                  borderRadius='full'
                  icon={
                    <Icon
                      as={FontAwesome5}
                      name='times'
                      color={COLORS.button.primary}
                      size={6}
                    />
                  }
                />
              )}
          />
        </Stack>
        {search !== '' ?
          <TabContainerSearch navigation={navigation} search={search} />
          :
          <VStack alignContent='center' alignItems='center'>
            <Image
              source={Pana}
              alt='Pana'
              resizeMode='contain'
              size={400}
            />
            <Text bold textAlign='center' color={COLORS.primary}>
              Cuéntanos qué estás buscando para que te ayudemos a encontrarlo
            </Text>
          </VStack>
        }
      </VStack>
    </View>
  )
}

export default Search;
