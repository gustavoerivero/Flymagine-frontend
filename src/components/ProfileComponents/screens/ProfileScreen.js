import React, { useState, useEffect } from 'react'
import { View } from 'native-base'
import HeaderProfile from '../components/HeaderProfile'
import InfoUserProfile from '../components/InfoUserProfile'

import useAuthContext from '../../../hooks/useAuthContext'
import { getUserById } from '../../../services/user/userAPI'
import TabContainerProfile from '../components/TabContainerProfile'

const ProfileScreen = ({ navigation, userData }) => {

  const [userInfo, setUserInfo] = useState(null)

  const {
    state: { user }
  } = useAuthContext()

  useEffect(() => {
    getUserById(userData || user?.id)
      .then(res => {        
        setUserInfo(res?.Data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <View>
      <HeaderProfile
        navigation={navigation}
        userInfo={userInfo}
      />
      <InfoUserProfile
        userInfo={userInfo}
        navigation={navigation}
      />
      <TabContainerProfile
        navigation={navigation}
        userInfo={userInfo}
      />
    </View>
  )
}

export default ProfileScreen