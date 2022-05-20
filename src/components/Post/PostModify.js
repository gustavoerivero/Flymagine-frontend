import React, { useState } from 'react'
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

import { Chip } from 'react-native-paper'

import AddTag from './AddTag'

import {
  parseDate,
  parseTime,
} from '../../utilities/Parsers'

import mime from 'mime'
import useCustomToast from '../../hooks/useCustomToast'
import useLoading from '../../hooks/useLoading'

import COLORS from '../styled-components/Colors'

const PostModify = ({ user, post }) => {

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
              {parseDate(post?.date) + ' ' + parseTime(post?.date)}
            </Text>
          </HStack>
          <Stack
            pl={3}
            pr={2}
          >
            <Text fontSize='xs' textAlign='justify' >
              {post?.description}
            </Text>
          </Stack>
          <Divider />
          <Stack alignItems='flex-end' >
            {post?.image !== '' && (
              <>
                <Image
                  source={{ uri: post?.image }}
                  style={{ width: '100%', height: 300 }}
                  alt='post'
                />
                <Divider />
              </>
            )}
          </Stack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default PostModify
