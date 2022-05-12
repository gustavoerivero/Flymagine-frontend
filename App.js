import { NativeBaseProvider } from 'native-base'
import React from 'react'
import Navegation from './Navegation'

export default function App() {
  return (
    <NativeBaseProvider>
      <Navegation />
    </NativeBaseProvider>
  )
}
