import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

import {
  Button, CheckBox, Icon
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'

const ReaderUserProfile = () => {
    
    const Navegation = useNavigation()

    return(
    <View>
      <Image
        source={Profile}
        imageStyle={styles.image}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
    width: '30%',
    height: '30%',
    marginBottom: 50,
    float: left
  }
})

export default ReaderUserProfile