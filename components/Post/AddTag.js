import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal
} from 'react-native'

import {
  Button,
  Divider,
} from 'react-native-elements'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Input from '../Input'

const AddTag = ({ visible, setVisible, setChoice, content, tags, setTags, name }) => {

  const [text, setText] = useState('')

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={styles.headerText}
          >
            {content}
          </Text>
          <Divider />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Input
              placeholder='Escribe aquí'
              text={text}
              setText={setText}
            />
            <Button
              icon={
                <MaterialCommunityIcons
                  name='tag-plus'
                  size={20}
                  color='#fff'
                />
              }
              containerStyle={{
                borderRadius: 5,
                height: 35,
                width: 35,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              disabled={text === ''}
              onPress={() => {
                name === 'personTags' ?
                  setTags(name, [...tags, {
                    id: "60d0fe4f5311236168a109ca",
                    title: "ms",
                    firstName: "Christina",
                    lastName: "Zanetti",
                    picture: "https://randomuser.me/api/portraits/women/12.jpg"
                  }]) :
                  setTags(name, [...tags, text])

                setText('')
                setVisible(!visible)
                setChoice(true)
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Cancelar'
              containerStyle={styles.buttonDialog}
              buttonStyle={{ backgroundColor: 'rgba(125, 50, 140, .75)' }}
              onPress={() => {
                setVisible(!visible)
                setChoice(false)
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    textAlign: "center",
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  buttonDialog: {
    width: '40%',
    paddingHorizontal: '2.5%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(90, 85, 220, 1)',
    textAlign: 'center',
  }
})

export default AddTag