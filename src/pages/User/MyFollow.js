import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

import { Button } from 'react-native-elements'

import ListFollow from '../../components/ListFollow'
import dataFollow from '../../utilities/data/follows'
import Container from '../../components/Container'

import { handleChange } from '../../utils/functions'

const MyFollow = () => {

  const [follows, setFollows] = useState(dataFollow)
  const [data, setData] = useState([])


  const _handleChange = (item, value) => handleChange(follows, setFollows, item, value)

  return (
    <View style={styles.container}>
        <ScrollView>
          {follows?.map((myFollow) => (
            <ListFollow
              key={myFollow.id}
              name={myFollow.follow.firstName + ' ' + myFollow.follow.lastName}
              image={myFollow.follow.picture}
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

export default MyFollow