import React from 'react'
import { View } from 'native-base'
import ProfileScreen from '../../components/ProfileComponents/screens/ProfileScreen'

const UserProfilePage = ({ navigation, route }) => {
  return (
    <View >
      <ProfileScreen navigation={navigation} userData={route?.params?.user} />
    </View>
  )
}

export default UserProfilePage