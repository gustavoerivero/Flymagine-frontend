import React from 'react'
import { Modal } from 'react-native'
import { Text, Divider, Box, HStack, VStack } from 'native-base'

const AddTag = ({ visible, setVisible, title, children }) => {

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
            {title}
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