import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native'

import Bibliothecary from '../../../assets/images/Bibliothecary.jpg'
import PasswordRecoveryRequestForm from '../../components/LoginComponents/forms/PasswordRecoveryRequestForm'

const PasswordRecoveryRequestPage = ({ navigation }) => {

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
      <View
        style={styles.container}
      >
        <PasswordRecoveryRequestForm navigation={navigation} />
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

export default PasswordRecoveryRequestPage