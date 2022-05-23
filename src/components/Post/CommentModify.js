import React from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Avatar,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
} from 'native-base'

import { parseDate, parseTime } from '../../utilities/Parsers'
import COLORS from '../styled-components/Colors'

const CommentModify = ({ user, comment }) => {

  const layout = useWindowDimensions()

  return (
    <Box
      bgColor={COLORS.secundary}
      w={layout.width}
      p={2}
      shadow={2}
      minH={layout.height * 0.1}
    >
      <HStack
        space={2}
      >
        <Avatar
          bg='purple.600'
          size='md'
          source={{
            uri: user?.photo === 'none' ?
              null
              : user?.photo
          }}
          borderColor='white'
          borderWidth={3}
        >
          {user && (user?.firstName[0] + user?.lastName[0])}
        </Avatar>
        <VStack
          space={1}
          w='85%'
        >
          <HStack space={2} >
            <Text
              bold
              fontSize='sm'
              pt={2}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              fontSize={10}
              color='gray.300'
              alignSelf='flex-end'
            >
              {parseDate(comment?.createdAt) + ' ' + parseTime(comment?.createdAt)}
            </Text>
          </HStack>
          <Stack pl={3} pr={2}>

            <Text fontSize='xs' textAlign='justify' >
              {comment?.description}
            </Text>
          </Stack>         
          
        </VStack>
      </HStack>
    </Box>
  )
}

export default CommentModify
