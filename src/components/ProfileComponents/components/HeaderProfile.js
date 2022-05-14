import React from 'react'
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Avatar,
  Icon,
  IconButton,
} from 'native-base'
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import useAuthContext from '../../../hooks/useAuthContext'

const HeaderProfile = ({ userInfo, navigation }) => {

  const {
    state: { user },
  } = useAuthContext()

  return (
    <Box
      px={3}
      pt={3}
      bgColor="white"
    >
      <Stack>
        <HStack>
          <VStack
            w='85%'
          >
            <Avatar
              bg='purple.600'
              size='xl'
              source={{
                uri: userInfo?.photo === 'none' ?
                  null
                  : userInfo?.photo
              }}
              borderColor='white'
              borderWidth={3}
            >
              {userInfo && (userInfo?.firstName[0] + userInfo?.lastName[0])}
            </Avatar>
            <Text
              fontSize='xl'
              bold
              color={'purple.900'}
            >
              {userInfo?.firstName + ' ' + userInfo?.lastName}
            </Text>

            <HStack
              space={2}
              alignItems='center'
            >
              <Icon
                as={userInfo?.idRole?.name === 'Reader' ? FontAwesome5 : AntDesign}
                name={userInfo?.idRole?.name === 'Reader' ? 'book-reader' : 'edit'}
              />
              <Text
                fontSize='sm'
                color={'purple.600'}
                italic
              >
                - {userInfo?.idRole?.name === 'Reader' ? 'Lector' : 'Escritor'} desde {userInfo?.createdAt ? userInfo?.createdAt.split('T')[0].split('-').reverse().join('/') : '-'}
              </Text>
            </HStack>
          </VStack>
          {userInfo?._id === user?.id && (
            <VStack>
              <IconButton
                borderRadius='full'
                variant='solid'
                shadow={true}
                icon={
                  <MaterialCommunityIcons
                    name='account-edit'
                    size={24}
                    color='white'
                  />
                }
                onPress={() => {
                  navigation?.navigate('EditProfile')
                }}
              />
            </VStack>
          )}

        </HStack>
      </Stack>
    </Box>
  )
}

export default HeaderProfile