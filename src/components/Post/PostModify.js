import React from 'react'
import { useWindowDimensions, TouchableOpacity } from 'react-native'
import {
  Avatar,
  Badge,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
  Image,
  Icon,
  Divider,
  ScrollView,
} from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { parseDate, parseTime } from '../../utilities/Parsers'
import COLORS from '../styled-components/Colors'

const PostModify = ({ post, handleChange }) => {
  const layout = useWindowDimensions()

  return (
    <Box
      bgColor={COLORS.secundary}
      w={layout.width * 0.98}
      p={2}
      minH={layout.height * 0.1}
      shadow={2}
      borderRadius='lg'
    >
      <HStack space={2}>
        <Avatar
          bg='purple.600'
          size='md'
          source={{
            uri: post?.user?.photo === 'none' ? null : post?.user?.photo,
          }}
          borderColor='white'
          borderWidth={3}
        >
          {post?.user && post?.user?.firstName[0] + post?.user?.lastName[0]}
        </Avatar>
        <VStack space={1} w='85%'>
          <HStack space={2}>
            <Text bold fontSize='sm' pt={2}>
              {post?.user?.firstName} {post?.user?.lastName}
            </Text>
            <Text fontSize={10} color='#806e91' alignSelf='flex-end'>
              {parseDate(post?.createdAt) + ' ' + parseTime(post?.createdAt)}
            </Text>
          </HStack>
          <Stack pl={3} pr={2}>
            <Stack>
              {post?.personTags?.length > 0 && (
                <>
                  <Divider />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack space={1} mr={10} m={1}>
                      {post?.personTags?.map((tag, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            console.log('Tag pressed')
                            let newTags = post?.personTags
                            newTags.splice(index, 1)
                            handleChange('personTags', newTags)
                          }}
                        >
                          <Badge
                            size='sm'
                            bgColor='rgba(223, 204, 255, .35)'
                            rounded='full'
                          >
                            <HStack space={1} alignItems='center'>
                              <Avatar
                                bg='purple.600'
                                size='xs'
                                source={{
                                  uri:
                                    tag?.photo === 'none' ? null : tag?.photo,
                                }}
                                borderColor='white'
                                borderWidth={3}
                              >
                                {tag && tag?.firstName[0] + tag?.lastName[0]}
                              </Avatar>
                              <Text color='rgba(95, 0, 255, .55)'>
                                {tag.firstName + ' ' + tag.lastName}
                              </Text>
                              <Icon
                                as={Entypo}
                                name='cross'
                                size={4}
                                color='rgba(95, 0, 255, .55)'
                              />
                            </HStack>
                          </Badge>
                        </TouchableOpacity>
                      ))}
                    </HStack>
                  </ScrollView>
                  <Divider />
                </>
              )}
            </Stack>
            <Text fontSize='xs' textAlign='justify'>
              {post?.description}
            </Text>
          </Stack>
          <Divider />
          <Stack alignItems='flex-end'>
            {post?.photo !== '' && post?.photo !== 'none' && (
              <>
                <Image
                  source={{ uri: post?.photo }}
                  style={{ width: '100%', height: 300 }}
                  alt='post'
                />
                <Divider />
              </>
            )}
          </Stack>
          <Stack>
            {post?.hashtags?.length > 0 && (
              <>
                <Divider />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <HStack space={1} mr={10} m={1}>
                    {post?.hashtags?.map((tag, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          console.log('Tag pressed')
                          let newTags = post?.hashtags
                          newTags.splice(index, 1)
                          handleChange('hashtags', newTags)
                        }}
                      >
                        <Badge
                          size='sm'
                          bgColor='rgba(223, 204, 255, .35)'
                          rounded='full'
                        >
                          <HStack space={1} alignItems='center'>
                            <Text color='rgba(95, 0, 255, .55)'>
                              {tag.name}
                            </Text>
                            <Icon
                              as={Entypo}
                              name='cross'
                              size={4}
                              color='rgba(95, 0, 255, .55)'
                            />
                          </HStack>
                        </Badge>
                      </TouchableOpacity>
                    ))}
                  </HStack>
                </ScrollView>
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
