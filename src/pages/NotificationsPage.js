import React, { useState } from 'react'
import { StyleSheet, Modal, RefreshControl } from 'react-native'

import {
  View,
  Image,
  IconButton,
  Icon,
  VStack,
  Stack,
  Text,
  ScrollView,
  Box,
  FlatList,
  Badge,
  HStack,
  Button,
  StatusBar,
} from 'native-base'

import Notification from '../components/Notification'
import dataNotifications from '../utilities/data/notifications'

import DontKnow from '../../assets/images/dontknow.png'

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Dialog from '../components/Dialog'

import { handleChange } from '../utils/functions'
import COLORS from '../components/styled-components/Colors'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(dataNotifications)
  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const _handleChange = (item, value) =>
    handleChange(notifications, setNotifications, item, value)

  return (
    <Box w='100%' h='100%'>
      <StatusBar animated={true} backgroundColor={COLORS.primary}/>
      <VStack w='100%' h='100%'>
        <HStack /* HEADER */
          w='100%'
          h='7%'
          bg={COLORS.primary}
          alignItems='center'
          px={3}
          py={1}
        >
          <Stack w='88%' h='95%' justifyContent='center'>
            <Text bold fontSize='xl' color={COLORS.secundary}>
              Notificaciones
            </Text>
          </Stack>

          <Stack w='12%' h='95%'>
            <IconButton
              h='100%'
              w='100%'
              colorScheme='blueGray'
              bg={COLORS.button.primary}
              icon={
                <MaterialCommunityIcons
                  name='checkbox-multiple-marked-circle'
                  size={25}
                  color={COLORS.button.icon}
                />
              }
              onPress={() => {
                setModalVisible(true)
              }}
            />
            <Dialog
              visible={modalVisible}
              setVisible={setModalVisible}
              content='¿Seguro que desea marcar todo como leído?'
            />
          </Stack>
        </HStack>

        {/**<Button
          buttonStyle={styles.button}
          icon={<FontAwesome name='eye' size={15} color='black' />}
          onPress={() => read(notifications)}
  />*/}
        <VStack /* NOTIFICATION LIST */ w='100%'
          pt={1}
          justifyContent='center'
          alignItems='center'
          alignContent='center'
        >
          {notifications ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              data={notifications}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => (
                <Stack p={1}>
                  <Notification
                    key={item.id}
                    person={
                      item.transmitter.firstName +
                      ' ' +
                      item.transmitter.lastName
                    }
                    avatar={item.transmitter.picture}
                    date={item.notificationDate}
                    text={item.text}
                    check={item.check}
                    page={item.page}
                  />
                </Stack>
              )}
            />
          ) : (
            <VStack
              alignContent='center'
              alignItems='center'
              mt={10}
            >
              <Image
                source={DontKnow}
                alt='DontKnow'
                resizeMode='contain'
                size={400}
              />
              <Text
                bold
                fontSize='2xl'
                textAlign='center'
                color={COLORS.primary}
              >
                Esto aquí se ve muy solo...
              </Text>
              <Text
                bold
                fontSize='xs'
                textAlign='center'
                color={COLORS.primary}
              >
                Parece que no tienes notificaciones nuevas.
              </Text>
            </VStack>
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default NotificationsPage
