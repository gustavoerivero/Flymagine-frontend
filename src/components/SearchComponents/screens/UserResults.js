import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { VStack, ScrollView } from 'native-base'

import UserItem from '../UserItem'
import { searchUsers } from '../../../services/user/userAPI'

const UserResults = ({ navigation, search }) => {

  const [users, setUsers] = useState([])
  const layout = useWindowDimensions()

  useFocusEffect(
    useCallback(() => {
      if (search) {
        console.log(search)

        searchUsers(search)
          .then(res => {
            setUsers(res?.Data)
            console.log('resultados', res?.Data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }, [])
  )

  return (
    <ScrollView>
      <VStack h={layout.height}>
        {users && users.map(user => (
          <UserItem
            key={user._id}
            userItem={user}
            navigation={navigation}
          />
        ))}
      </VStack>
    </ScrollView>
  )
}

export default UserResults