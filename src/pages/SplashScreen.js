import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from 'react-native'
import { VStack, Box, StatusBar, FlatList, Stack, Image } from 'native-base'
import * as Animatable from 'react-native-animatable'
import Logo from '../../assets/Flymagine_Complete.png'
import LogoTeam from '../../assets/Thoteam-Logo.png'
import COLORS from '../components/styled-components/Colors'


const SplashScreen = ({ navigation }) => {

    const layout = useWindowDimensions()

    const logoSize = layout.width * .6

    /*goToScreen(routeName) {
        this.props.navigation.navigate(routeName)
    }

    ComponentDidMount() {
        setTimeout( () => {
            this.goToScreen('Login')
        }, 3000, this)
    }*/

  return (
<Box bg={COLORS.secundary} w={layout.width} h={layout.height}>
    <StatusBar translucent bg={COLORS.secundary}/>
    <VStack>
    <Stack h='80%' pt={100} justifyContent='center' alignItems='center'>
    <Animatable.Image
    animation='pulse'
    easing='ease-out'
    iterationCount='infinite'
    style={{
        width: logoSize,
        height: logoSize,
        margin: 100,
    }}
    source={Logo}
    />
    </Stack>
    <Stack h='20%' justifyContent='center' alignItems='center'>
        <Image
        opacity={.7}
        source={LogoTeam}
        w={150}
        h='20%'
        />
    </Stack>
    </VStack>

</Box>
  )
}

export default SplashScreen