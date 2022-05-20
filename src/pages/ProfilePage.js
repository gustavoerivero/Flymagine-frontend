import React from 'react'
import { View } from 'native-base'
import ProfileScreen from '../components/ProfileComponents/screens/ProfileScreen'

const ProfilePage = ({ navigation }) => {
  return (
    <View>
      <ProfileScreen navigation={navigation} />
    </View>
  )
}

export default ProfilePage