import React, { useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Stack } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

import HeaderProfile from '../components/HeaderProfile'
import InfoUserProfile from '../components/InfoUserProfile'

import useAuthContext from '../../../hooks/useAuthContext'
import useLoading from '../../../hooks/useLoading'
import { getUserById } from '../../../services/user/userAPI'
import TabContainerProfile from '../components/TabContainerProfile'
import COLORS from '../../../components/styled-components/Colors'

const ProfileScreen = ({ navigation, userData }) => {
  const [userInfo, setUserInfo] = useState(null)

  const {
    state: { user },
  } = useAuthContext()
  const { isLoading, startLoading, stopLoading } = useLoading()

  useFocusEffect(
    useCallback(() => {
      startLoading()
      getUserById(userData || user?.id)
        .then((res) => {
          setUserInfo(res?.Data)
          stopLoading()
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
  )

  return (
    <View>
      {userInfo && !isLoading ? (
        <>
          <HeaderProfile navigation={navigation} userInfo={userInfo} />
          <InfoUserProfile userInfo={userInfo} navigation={navigation} />
          <TabContainerProfile navigation={navigation} userInfo={userInfo} />
        </>
      )
        :
        <Stack mt={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </Stack>
      }
    </View>
  )
}

export default ProfileScreen
