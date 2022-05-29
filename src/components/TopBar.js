import React from 'react'
import { HStack, Button, IconButton, Icon } from 'native-base'
import { Image } from 'react-native-elements'
import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import COLORS from './styled-components/Colors'
import FlymagineIcon from '../../assets/favicon.png'

const TopBar = () => {

  const { dispatch } = useAuthContext()
  const { showSuccessToast } = useCustomToast()

  return (
    <HStack
      h='8%'
      bgColor={COLORS.primary}
      shadow={5}
      justifyContent='space-between'
    >
      <Button
        leftIcon={
          <Image
            source={FlymagineIcon}
            style={{
              height: '95%',
              width: 50,
            }}
          />
        }
        variant='ghost'
        borderRadius='full'
        onPress={() => showSuccessToast('¡Bienvenido a Flymagine!')}
      />
      <IconButton
        icon={
          <Icon
            as={MaterialCommunityIcons}
            name='logout'
            size={7}
            color='white'
          />
        }
        type='clear'
        onPress={() => {
          console.log('User logout')
          dispatch({ type: 'LOGOUT' })
          showSuccessToast('¡Esperamos verte proximamente por acá!')
        }}
      />
    </HStack>
  )
}

export default TopBar
