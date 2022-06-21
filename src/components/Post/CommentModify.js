import React from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Avatar,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
  Image,
  Divider,
} from 'native-base'

import { parseDate, parseTime } from '../../utilities/Parsers'
import COLORS from '../styled-components/Colors'

const CommentModify = ({ comment }) => {

  const layout = useWindowDimensions()

  return (
    <Box
      w='100%'
      p={1}
      bgColor={COLORS.secundary}
      rounded='lg'
      shadow={2}
      minH={layout.height * 0.1}
    >
      <HStack justifyContent='center' m={1}>
        <Stack /* AVATAR */ w='15%' alignItems='center' >
          <Avatar
            bg='purple.600'
            size='md'
            source={{
              uri: comment?.user?.photo === 'none' ?
                null
                : comment?.user?.photo
            }}
            borderColor='white'
            borderWidth={3}
          >
            {comment?.user && (comment?.user?.firstName[0] + comment?.user?.lastName[0])}
          </Avatar>
        </Stack>

        <VStack /* INFO */ px={1} pb={2} w='85%' >
          <HStack /* USER */ w='100%' h={7} space={2} alignItems='center' >
            <Text bold fontSize='sm' >
              {comment?.user?.firstName} {comment?.user?.lastName}
            </Text>
            <Text fontSize={10} color='#806e91' >
              {parseDate(comment?.createdAt) + ' ' + parseTime(comment?.createdAt)}
            </Text>
          </HStack>
          <Stack /* DESCRIPTION */ w='100%'>
            <Text fontSize='xs' textAlign='justify' >
              {comment?.description}
            </Text>
            <Divider />
          </Stack>

          <Stack alignItems='center'>
            {comment?.photo && comment?.photo !== 'none' && (
              <>
                <Image source={{ uri: comment?.photo }} size={300} alt='post' />
                <Divider opacity={0.5} />
              </>
            )}
          </Stack>

        </VStack>

      </HStack>
    </Box>
  )
}

export default CommentModify
