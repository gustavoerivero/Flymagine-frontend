import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  ScrollView,
  View,
} from 'native-base'

import UserItem from '../../components/ProfileComponents/components/UserItem'

import COLORS from '../../components/styled-components/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { getFollows } from '../../services/user/userAPI'

const Follows = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const id = route?.params?.userId
  const [follows, setFollows] = useState(route?.params?.follows || [])

  useFocusEffect(
    useCallback(() => {

      getFollows(id)
        .then(res => {
          setFollows(res?.Data?.follows)
        })
        .catch(err => {
          console.log(err)
        })


    }, [follows])
  )

  return (
    <ScrollView bgColor='red'>
      <View minH={layout.height * .9} bgColor={COLORS.base} >
        {follows && follows.map(follow => (
          <UserItem
            key={follow._id}
            userItem={follow}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default Follows