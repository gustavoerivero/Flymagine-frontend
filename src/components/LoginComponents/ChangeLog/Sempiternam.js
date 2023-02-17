import React from 'react'
import { VStack, Text } from 'native-base'

const Sempiternam = () => {
  return (
    <VStack>
      <Text bold fontSize={'md'}>
        v1.1.2: Sempiternam || 26062022
      </Text>
      <VStack ml={3} >
        <Text fontSize={'sm'}>
          - Se modifica el servidor para consultas paginadas
        </Text>
        <Text fontSize={'sm'}>
          - Se optimizan los tiempos de carga de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se agregan spinners en la carga de posts y usuarios
        </Text>
        <Text fontSize={'sm'}>
          - Se agrega un modal para mostrar el historial de cambios ubicada en la pantalla de inicio de sesión
        </Text>
        <Text fontSize={'sm'}>
          - Se agrega un modal para mostrar la información sobre el equipo de desarrollo en la pantalla de inicio de sesión
        </Text>
      </VStack>
    </VStack>
  )
}

export default Sempiternam