import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { VStack, Fab, Icon } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Ionicons } from '@expo/vector-icons'

import ConfettiCannon from 'react-native-confetti-cannon'

import LoginForm from '../../components/LoginComponents/forms/LoginForm'
import ChangeLogModal from '../../components/LoginComponents/ChangeLogModal'
import Bibliothecary from '../../../assets/images/Bibliothecary.jpg'

const LoginPage = ({ navigation }) => {

  const [showModal, setShowModal] = React.useState(false)

  return (
    <ImageBackground
      style={styles.imageBackground}
      imageStyle={{
        opacity: .75,
        backgroundColor: 'rgba(187, 103, 220, .75)',
      }}
      source={Bibliothecary}
      resizeMode='cover'
    >
      <KeyboardAwareScrollView>
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={3000}
          autoStart
          fadeOut
          colors={['#9c50db', '#cf50db', '#cf50db']}
        />
        <VStack minH='100%' justifyContent='center'>
          <LoginForm
            navigation={navigation}
          />
          <Fab
            colorScheme='purple'
            renderInPortal={false}
            shadow={2}
            onPress={() => setShowModal(true)}
            icon={
              <Icon
                color='white'
                as={
                  <Ionicons
                    name='newspaper-outline'
                    size={15}
                  />
                }
                size={5}
              />
            }
          />
          <ChangeLogModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </VStack>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    height: '100%'
  },
})

export default LoginPage