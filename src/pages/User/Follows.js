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
import { getFollows } from '../../services/user/userAPI'

const Follows = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const id = route?.params?.user
  const [follows, setFollows] = useState(route?.params?.follows || null)

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
    <ScrollView>
      <View
        minH={layout.height * .9}
        w={layout.width}
        bgColor={COLORS.base}
      >
        {follows ? follows.map(follow => (
          <UserItem
            key={follow._id}
            userItem={follow}
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

export default Follows