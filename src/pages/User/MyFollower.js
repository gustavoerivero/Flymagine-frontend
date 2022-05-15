import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

import { Button } from 'react-native-elements'

import ListFollower from '../../components/ListFollower'
import dataFollowers from '../../utilities/data/followers'
import Container from '../../components/Container'

import { handleChange } from '../../utils/functions'

const MyFollower = () => {

  const [followers, setFollowers] = useState(dataFollowers)
  const [data, setData] = useState([])


  const _handleChange = (item, value) => handleChange(followers, setFollowers, item, value)

  return (
    <View style={styles.container}>
        <ScrollView>
          {followers?.map((myFollower) => (
            <ListFollower
              key={myFollower.id}
              name={myFollower.follower.firstName + ' ' + myFollower.follower.lastName}
              image={myFollower.follower.picture}
              check={myFollower.check}
            />
          ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(150, 129, 223, .75)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    width: '100%',
    maxWidth: 250,
    marginLeft: .01,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F9F7F8',
    paddingTop: 10
  },
  
})

export default MyFollower