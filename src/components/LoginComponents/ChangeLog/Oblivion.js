import React from 'react'
import { VStack, Text } from 'native-base'

const Oblivion = () => {
  return (
    <VStack>
      <Text bold fontSize={'md'}>
        v1.1.1: Oblivion || 21062022
      </Text>
      <VStack ml={3} >
        <Text fontSize={'sm'}>
          - Se reduce el tiempo de carga de la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se reduce la cantidad de solicitudes al servidor optimizando la aplicación
        </Text>
        <Text fontSize={'sm'}>
          - Se agranda un poco el tamaño de los botones de reacción y de comentarios
        </Text>
        <Text fontSize={'sm'}>
          - ¡Ahora es posible comentar con imágenes!
        </Text>
      </VStack>
    </VStack>
  )
}

export default Oblivion