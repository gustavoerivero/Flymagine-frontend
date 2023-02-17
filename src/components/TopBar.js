import React from 'react'
import { HStack, IconButton, Icon, Image } from 'native-base'
import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import COLORS from './styled-components/Colors'
import largeLogo from '../../assets/LogoHeader.png'
import { TouchableOpacity } from 'react-native'

const TopBar = ({ onRefresh }) => {

  const { dispatch } = useAuthContext()
  const { showSuccessToast } = useCustomToast()
  const [count, setCount] = React.useState(0)

  const touch = () => {
    onRefresh()
    if(count < 5) {
      setCount(count + 1)
    } else {          
      setCount(0)
      showSuccessToast('¡He pillado que te gusta andar de travieso!')
    }   
  }

  return (
    <HStack
      h='8%'
      w='100%'
      bgColor={COLORS.primary}
      shadow={5}
      justifyContent='space-between'
      alignItems='center'
    >
      <TouchableOpacity onPress={touch}>
        <Image
          source={largeLogo}
          opacity={count === 0 ? 1 : 1 - (count / 8)}
          alt='Flymagine Logo'
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
