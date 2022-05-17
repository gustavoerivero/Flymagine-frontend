import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  ScrollView,
  View,
} from 'native-base'

import UserItem from '../../components/ProfileComponents/components/UserItem'

import COLORS from '../../components/styled-components/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { getFollowers } from '../../services/user/userAPI'

const Followers = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const id = route?.params?.userId
  const [followers, setFollowers] = useState(route?.params?.followers || [])

  useFocusEffect(
    useCallback(() => {

      getFollowers(id)
        .then(res => {
          setFollowers(res?.Data)
        })
        .catch(err => {
          console.log(err)
        })


    }, [followers])
  )

  return (
    <ScrollView bgColor='red'>
      <View minH={layout.height * .9} bgColor={COLORS.base} >
        {followers && followers.map(follower => (
          <UserItem
            key={follower._id}
            userItem={follower?.idUser}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default Followers