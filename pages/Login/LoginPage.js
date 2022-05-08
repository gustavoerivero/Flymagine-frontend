import React, { useState } from 'react'
import {
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MakeItRain from 'react-native-make-it-rain'

import LoginForm from '../../components/LoginComponents/LoginForm'
import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const LoginPage = () => {

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
        <MakeItRain
          numItems={80}
          itemDimensions={{
            width: 5,
            height: 5,
          }}
          itemTintStrength={0.8}
          fallSpeed={10}
        />
        <LoginForm />
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
})

export default LoginPage