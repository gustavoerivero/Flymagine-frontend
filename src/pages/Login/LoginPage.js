import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { VStack } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../components/LoginComponents/forms/LoginForm'
import Bibliothecary from '../../../assets/images/Bibliothecary.jpg'

const LoginPage = ({ navigation }) => {

  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{
        opacity: .75,
        backgroundColor: 'rgba(187, 103, 220, .75)',
      }}
      source={Bibliothecary}
      resizeMode='cover'
    >
      <KeyboardAwareScrollView>
        <VStack minH='100%' justifyContent='center'>
          <LoginForm navigation={navigation} />
        </VStack>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    height: '100%'
  },
})

export default LoginPage