import React from 'react'
import { Modal } from 'react-native'
import { Text, Divider, Box, HStack, VStack } from 'native-base'
import { Button } from 'react-native-elements'
import Colors from '../styled-components/Colors'

const AddTag = ({ visible, setVisible, children }) => {

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <Box
        bgColor='rgba(255, 255, 255, 1)'
        borderWidth={1}
        borderColor='gray.50'
        shadow={1}
        borderRadius={5}
        alignItems='center'
        justifyContent='center'
        alignContent='center'
        alignSelf='center'
        mt='20%'
        p={2}
        w='90%'
      >
        <VStack space={2} alignItems='center'>
          <Text
            bold
            color='black'
            fontSize={16}
            textAlign='center'            
          >
            Añade etiquetas
          </Text>
          <Divider />
          <HStack 
            justifyContent='space-between'
            alignItems='center'
            alignContent='center'
            space={2}
          >
            {children}

          </HStack>          
        </VStack>
      </Box>
    </Modal>
  )
}

export default AddTag