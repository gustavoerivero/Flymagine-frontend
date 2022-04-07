import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal
} from 'react-native'

import {
  Button
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

const Dialog = ({ visible, setVisible, setChoice, content, toNavigate, params, cancelButton, method }) => {

  const Navegation = useNavigation()
  const [shouldShow,setShouldShow] = useState(true)

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
          <Text style={styles.modalText}>
            {content}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title='Aceptar'
              containerStyle={styles.buttonDialog}
              onPress={() => {
                setVisible(!visible)
                setChoice(true)
                if (toNavigate)
                  params ? Navegation.navigate(toNavigate) : Navegation.navigate(toNavigate, params)
                
              }}
            />
            {cancelButton &&
              <Button
                title='Cancelar'
                containerStyle={styles.buttonDialog}
                buttonStyle={{ backgroundColor: 'rgba(125, 50, 140, .75)' }}
                onPress={() => {
                  setVisible(!visible)
                  setChoice(false)
                }}
              />
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
    paddingVertical: 8,
  },
  buttonDialog: {
    width: '40%',
    paddingHorizontal: '2.5%',
  }
})

export default Dialog