import React, { useState, useCallback } from 'react'
import { useWindowDimensions, ActivityIndicator } from 'react-native'
import {
  ScrollView,
  View,
  Stack,
} from 'native-base'

import UserItem from '../../components/ProfileComponents/components/UserItem'

import COLORS from '../../components/styled-components/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { getFollowers } from '../../services/user/userAPI'

const Followers = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const id = route?.params?.user
  const [followers, setFollowers] = useState(route?.params?.followers || null)

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
    <ScrollView>
      <View
        minH={layout.height * .9}
        w={layout.width}
        bgColor={COLORS.base}
      >
        {followers ? followers.map(follower => (
          <UserItem
            key={follower._id}
            userItem={follower?.user}
            navigation={navigation}
          />
        ))
        :
        <Stack mt={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </Stack>
        }
      </View>
    </ScrollView>
  )
}

export default Followers