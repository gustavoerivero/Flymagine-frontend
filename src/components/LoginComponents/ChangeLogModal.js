import React from 'react'
import { useWindowDimensions } from 'react-native'

import {
  Text,
  ScrollView,
  Modal,
  Button,
  Divider,
  VStack,
} from 'native-base'

//Colors
import COLORS from '../styled-components/Colors'

import Genesis from './ChangeLog/Genesis'
import Requiem from './ChangeLog/Requiem'
import Oblivion from './ChangeLog/Oblivion'
import Sempiternam from './ChangeLog/Sempiternam'

const ChangeLogModal = ({ showModal, setShowModal }) => {

  const { width, height } = useWindowDimensions()

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Modal.Content
        h={height * .8}
        w={width * .8}
      >
        <Modal.CloseButton />
        <Modal.Header bg={COLORS.primary}>
          <Text bold color={COLORS.base} fontSize={'md'}>
            Historial de cambios
          </Text>
        </Modal.Header>
        <Modal.Body bg={COLORS.base}>
          <ScrollView>
            <VStack space={1} >

              <Sempiternam />
              <Divider />
              <Oblivion />
              <Divider />
              <Requiem />
              <Divider />
              <Genesis />
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              bgColor={COLORS.button.primary}
              variant='ghost'
              size={'md'}
              minW={'30%'}
              onPress={() => {
                setShowModal(false)
              }}
            >
              <Text bold color={COLORS.base}>
                Cerrar
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ChangeLogModal
