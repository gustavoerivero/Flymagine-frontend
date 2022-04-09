import React from 'react'
import {
  View,
  StyleSheet,
  Modal
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

import { parseDate } from '../utilities/Parsers'


const DateDialog = ({ visible, setVisible, values, setValues }) => {

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
        <DateTimePicker
          onChange={(event, selectedDate) => {
            setVisible(!visible)
            setValues(parseDate(selectedDate))
          }}
          onConfirm={(date) => {
            setValues(parseDate(date))
            setVisible(!visible)
          }}
          onCancel={() => setVisible(!visible)}
          mode='date'
          value={new Date()}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#000',
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

export default DateDialog