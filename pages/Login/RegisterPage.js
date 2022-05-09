import React from 'react'
import {
  StyleSheet,
  ImageBackground
} from 'react-native'
import RegisterForm from '../../components/LoginComponents/forms/RegisterForm'

import Bibliothecary from '../../assets/images/Bibliothecary.jpg'

const RegisterPage = () => {
  
  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{
        opacity: .75,
        backgroundColor: 'rgba(187, 103, 220, 1)',
      }}
      source={Bibliothecary}
      resizeMode='cover'
    >
      <RegisterForm />
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
})

export default RegisterPage
