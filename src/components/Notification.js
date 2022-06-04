import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'

import {
  View,
  Image,
  IconButton,
  Icon,
  VStack,
  Stack,
  Text,
  ScrollView,
  Box,
  FlatList,
  Badge,
  HStack,
  Button,
  Avatar,
} from 'native-base'

import { FontAwesome } from '@expo/vector-icons'
import Book from '../pages/Book/Book'
import { useNavigation } from '@react-navigation/native'

import { parseDate, parseTime } from '../utilities/Parsers'
import COLORS from './styled-components/Colors'

const Notification = (props) => {
  const layout = useWindowDimensions()
  const Navegation = useNavigation()
  const [read, setRead] = useState(props.check)
  const [page, setPage] = useState(props.page)

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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
    width: '100%',
    minHeight: 100,
    height: 'auto',
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignContent: 'stretch',
    width: '100%',
    maxWidth: 260,
    marginRight: 10,
  },
  profileButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    width: '100%',
    maxWidth: 250,
    alignSelf: 'flex-end',
    marginLeft: 1,
    fontSize: 1,
  },
})

export default Notification
