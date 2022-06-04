import React from 'react'
import { View, StatusBar } from 'native-base'
import ProfileScreen from '../components/ProfileComponents/screens/ProfileScreen'
import COLORS from '../components/styled-components/Colors'

const ProfilePage = ({ navigation }) => {
  return (
    <View>
      <StatusBar animated={true} backgroundColor={COLORS.primary}/>
      <ProfileScreen navigation={navigation} />
    </View>
  )
}

export default ProfilePage