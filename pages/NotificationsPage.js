import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

import {Button} from 'react-native-elements'

import ModalDropdown from 'react-native-modal-dropdown';

import Notification from '../components/Notification'
import dataNotifications from '../utilities/data/notifications'
import Container from '../components/Container'

import { FontAwesome } from '@expo/vector-icons';

let data = [{ id: 1, name: 'Leído' }, { id: 2, name: 'borrar' }]

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState(dataNotifications || [])
  const [data, setData] = useState([])
  const [shouldShow, setShouldShow] = useState(true);

  return (
    <Container>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {/*<Button
          title='Marcar todo como leído'
          buttonStyle={styles.button}
  />*/}
        <Button
        buttonStyle={styles.button}
        icon={<FontAwesome name="trash" size={15} color="black" />}
        onPress={() => [setShouldShow(false)]}
        />
      </View>
      {shouldShow ? (
      <ScrollView>
        {notifications?.map((notification) => (
          <Notification
            key={notification.id}
            person={notification.transmitter.firstName + ' ' + notification.transmitter.lastName}
            avatar={notification.transmitter.picture}
            date={notification.notificationDate}
            text={notification.text}
          />
        ))}
      </ScrollView>
      ) : null}
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    width: '100%',
    maxWidth: 250,
    marginLeft: .01,
  },  
})

export default NotificationsPage