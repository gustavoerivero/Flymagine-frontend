import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

import { Button } from 'react-native-elements'

import ModalDropdown from 'react-native-modal-dropdown';

import Notification from '../components/Notification'
import dataNotifications from '../utilities/data/notifications'
import Container from '../components/Container'

import { FontAwesome } from '@expo/vector-icons'
import Dialog from '../components/Dialog'

import {
  handleChange
} from '../utils/functions'

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState(dataNotifications)
  const [data, setData] = useState([])
  const [shouldShow, setShouldShow] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)


  const _handleChange = (item, value) => handleChange(notifications, setNotifications, item, value)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text 
          style={styles.headerText}          
        >
          Notificaciones
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {/**<Button
          buttonStyle={styles.button}
          icon={<FontAwesome name="eye" size={15} color="black" />}
          onPress={() => read(notifications)}
  />*/}
        <Button
          buttonStyle={styles.button}
          icon={<FontAwesome name="trash" size={15} color="black" />}
          onPress={() => {
            setModalVisible(true)
            if (choiceSelected)
              setShouldShow(false)
          }}
        />
        <Dialog
          visible={modalVisible}
          setVisible={setModalVisible}
          setChoice={setChoiceSelected}
          content='¿Seguro que desea eliminar la bandeja de entrada?'
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
              check={notification.check}
            />
          ))}
        </ScrollView>
      ) : false}
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
    marginTop: 5,
    marginBottom: 5,
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
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(90, 85, 220, 1)',
    
  },
})

export default NotificationsPage