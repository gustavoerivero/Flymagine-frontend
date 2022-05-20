import React, { useState, useCallback } from 'react'
import { View } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

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

  useFocusEffect(
    useCallback(() => {
      getUserById(userData || user?.id)
        .then(res => {
          setUserInfo(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])
  )

  return (
    <View>
      <HeaderProfile
        navigation={navigation}
        userInfo={userInfo}
      />
      {userInfo && (
        <>
          <InfoUserProfile
            userInfo={userInfo}
            navigation={navigation}
          />
          <TabContainerProfile
            navigation={navigation}
            userInfo={userInfo}
          />
        </>
      )}

    </View>
  )
}

export default ProfileScreen