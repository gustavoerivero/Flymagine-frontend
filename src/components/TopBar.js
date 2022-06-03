import React from 'react'
import { HStack, Button, IconButton, Icon, Image, Text, Stack } from 'native-base'
import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import COLORS from './styled-components/Colors'
import FlymagineIcon from '../../assets/favicon.png'
import largeLogo from '../../assets/LogoHeader.png'
import { TouchableOpacity } from 'react-native'

const TopBar = () => {

  const { dispatch } = useAuthContext()
  const { showSuccessToast } = useCustomToast()

  return (
    <HStack
      h='8%'
      w='100%'
      bgColor={COLORS.primary}
      shadow={5}
      justifyContent='space-between'
      alignItems='center'
    >
      <TouchableOpacity onPress={() => showSuccessToast('¡Bienvenido a Flymagine!')}>

      <Image
            source={largeLogo}
            resizeMode='stretch'
            ml={2}
            w={180}
            h='70%'
          />

      </TouchableOpacity>
          
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
