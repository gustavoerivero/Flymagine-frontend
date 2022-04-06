import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native'

import ModalDropdown from 'react-native-modal-dropdown';

import Notification from '../components/Notification'
import dataNotifications from '../utilities/data/notifications'
import Container from '../components/Container'

let data = [{id:1, name:'Leído'}, {id: 2, name: 'borrar'}]

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState(dataNotifications || [])
  const [data, setData] = useState([])

  return (
    <Container>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='Marcar todo como leído'
        />
      </View>
      
      <ScrollView>
        {notifications?.map((notification) => (
          <Notification
            key={notification.id}
            person={notification.transmitter.firstName + ' ' + notification.transmitter.lastName}
            avatar={notification.transmitter.picture}
            date={notification.notificationDate}
          />
        ))}
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({

})

export default NotificationsPage