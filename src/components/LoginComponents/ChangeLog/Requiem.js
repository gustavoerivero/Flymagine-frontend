import React from 'react'
import { VStack, Text } from 'native-base'

const Genesis = () => {
  return (
    <VStack>
      <Text bold fontSize={'md'}>
        v1.1.0: Requiem || 19062022
      </Text>
      <VStack ml={3} >
        <Text fontSize={'sm'}>
          - Se agrega seguridad a la aplicación desde el servidor
        </Text>
        <Text fontSize={'sm'}>
          - Se eliminan solicitudes innecesarias al servidor para optimizar la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se agregan spinners a las solicitudes al servidor para indicar que se está procesando una acción en la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se cambia el splash screen de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se cambia la animación de inicio de la aplicación
        </Text>
      </VStack>
    </VStack>
  )
}

export default Genesis