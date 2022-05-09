import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native'

import PasswordResetForm from '../../components/LoginComponents/forms/PasswordResetForm'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const PasswordResetPage = () => {

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
      <View style={styles.container}>
        <PasswordResetForm />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '85%',
  }
})

export default PasswordResetPage