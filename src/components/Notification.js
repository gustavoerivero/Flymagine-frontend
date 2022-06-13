import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'

import {
  VStack,
  Stack,
  Text,
  Box,
  HStack,
  Avatar,
} from 'native-base'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { parseDate, parseTime } from '../utilities/Parsers'
import COLORS from './styled-components/Colors'

const Notification = (props) => {
  const [read, setRead] = useState(props.check)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setRead('true')
      }}
    >
      <Box
        py={2}
        pl={1}

        bgColor={COLORS.secundary}
        rounded='lg'
        shadow={2}
        w='100%'
      >
        <HStack /* CONTENT */ justifyContent='space-between' w='98%'>

          <Stack /* AVATAR */ w='16%'
            justifyContent='center'
            alignItems='center'
          >
            <Avatar
              bg='purple.600'
              size='md'
              source={{ uri: props.avatar }}
              borderColor='white'
              borderWidth={3}
            >
              NF
            </Avatar>
          </Stack>

          <VStack /* TEXT */ w='80%'>
            <HStack>
              <Text textAlign='justify'>
                <Text bold>{props.person}</Text> {props.text}
              </Text>
            </HStack>

            <Text fontSize={10} color={COLORS.gray0} pt={1}>
              {parseDate(props.date) + ' ' + parseTime(props.date)}
            </Text>
          </VStack>

          <VStack /* INDICATOR */ w='4%' alignItems='flex-end'>
            {read === 'false' ? (
              <FontAwesome name='circle' size={10} color={COLORS.neon} />
            ) : null}
          </VStack>
        
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

export default Notification
