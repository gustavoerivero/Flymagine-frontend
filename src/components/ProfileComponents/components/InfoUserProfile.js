import React from 'react'
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Icon,
  Link,
} from 'native-base'
import {
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'

const InfoUserProfile = ({ userInfo, navigation }) => {
  return (
    <Box
      px={3}
      bgColor='white'
      w='100%'
    >
      <Stack>
        <VStack>
          <HStack
            mr={3}
          >
            <Icon
              mt={1}
              mr={4}
              as={MaterialIcons}
              name='history-edu'
            />
            <Text
              fontSize='xs'
            >
              {userInfo ? userInfo?.biography : null}
            </Text>
          </HStack>
          <HStack
            mr={3}
          >
            <Icon
              mr={4}
              as={FontAwesome}
              name='birthday-cake'
            />
            <Text
              fontSize='xs'
              italic
            >
              {userInfo ? userInfo?.birthday.split('T')[0].split('-').reverse().join('/') : '-'}
            </Text>
          </HStack>
          <HStack
            mb={2}
            space={5}
            alignItems='center'
          >
            <Link
              onPress={() => navigation?.navigate('MyFollow')}
            >
              <Text
                fontSize='md'
              >
                <Text
                  fontSize='lg'
                  bold
                >
                  {userInfo?.follows ? userInfo?.follows?.length : 0}
                </Text>
                {''} Siguiendo
              </Text>
            </Link>
            <Link
              onPress={() => navigation?.navigate('MyFollower')}
            >
              <Text
                fontSize='md'
              >
                <Text
                  fontSize='lg'
                  bold
                >
                  {userInfo?.followers ? userInfo?.followers?.length : 0}
                </Text>
                {''} Seguidores
              </Text>
            </Link>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  )
}

export default InfoUserProfile
