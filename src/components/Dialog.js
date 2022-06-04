import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import {
  Divider,
} from 'react-native-elements'

import {
  Text,
  FormControl,
  Modal,
  Button,
  TextArea,
} from 'native-base'

import COLORS from './styled-components/Colors'

const Dialog = ({ visible, setVisible, content, navigation }) => {

  return (
     <Modal isOpen={visible} onClose={() => setVisible(false)} animationType='slide'
      transparent={true}>
      <Modal.Content width='90%'>
        <Modal.CloseButton />
        <Modal.Header bg={COLORS.primary}>
          <Text bold color={COLORS.base} fontSize={'md'}>
            Hay notificaciones sin leer
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{content}</Text>

        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => {
                setVisible(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              bgColor={COLORS.button.primary}
              size={'md'}
              minW={'30%'}
              onPress={() => {
                setVisible(false)
              }}
            >
              <Text bold color={COLORS.base} fontSize={'sm'}>
                Aceptar
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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