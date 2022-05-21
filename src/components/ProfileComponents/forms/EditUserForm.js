import React, { useState, useCallback } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  Avatar,
  Box,
  View,
  ScrollView,
} from 'native-base'
import mime from 'mime'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'
import useAuthContext from '../../../hooks/useAuthContext'
import { getUserById } from '../../../services/user/userAPI'

import BasicDataForm from '../components/EditFormComponents/BasicDataForm'
import DetailDataForm from '../components/EditFormComponents/DetailDataForm'

import {
  pickImage,
  permisionFunction,
} from '../../../utils/functions'

import { setProfileImage } from '../../../services/user/userAPI'

import COLORS from '../../../components/styled-components/Colors'
import AccessDataForm from '../components/EditFormComponents/AccessDataForm'
import { useFocusEffect } from '@react-navigation/native'

const EditUserForm = ({ navigation }) => {

  const layout = useWindowDimensions()
  const {
    state: { user },
  } = useAuthContext()

  const [image, setImage] = useState(userInfo?.photo || null)
  const [userInfo, setUserInfo] = useState(null)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  useFocusEffect(
    useCallback(() => {
      permisionFunction()
      getUserById(user?.id)
        .then(res => {
          setUserInfo(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])
  )

  return (
    <ScrollView>
      <View
        width={layout.width * .95}
        alignSelf='center'
        alignItems='center'
      >
        <Box
          bgColor={COLORS.primary}
          w={layout.width}
          minH={30}
          alignItems='center'
          p={3}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            disabled={isLoading}
            onPress={() => {
              
              let pick = pickImage()
              pick.then(res => {

                const imageUri = Platform.OS === 'ios' ? 'file:///' + res.uri.split('file:/').join('') : res.uri

                const formData = new FormData()
                formData.append('photo', {
                  uri: imageUri,
                  type: mime.getType(imageUri),
                  name: imageUri.split('/').pop()
                })

                console.log('form', formData)

                startLoading()                            
                setProfileImage(user.id, formData)
                  .then(response => {
                    stopLoading()
                    showSuccessToast('¡Misión cumplida! Tu imagen de perfil ha sido actualizada con éxito')
                    console.log(response)
                    setImage(res.uri)
                    navigation?.navigate('Profile')
                  })
                  .catch(error => {
                    showErrorToast('¡Misión fallida! No se pudo actualizar tu imagen de perfil')
                  })
                  stopLoading()

              }).catch(err => {
                showErrorToast('¡Misión fallida! El archivo que seleccionaste es incorrecto')
              })
            }}
          >
            <Avatar
              bg='purple.600'
              size='2xl'
              source={{
                uri: image ? image : userInfo?.photo,
              }}
              borderColor='white'
              borderWidth={3}
            >
              {userInfo && (userInfo?.firstName[0] + userInfo?.lastName[0])}
            </Avatar>
          </TouchableOpacity>
        </Box>
      </View>

      {userInfo && (
        <>
          <BasicDataForm
            userData={userInfo}
            navigation={navigation}
          />

          <DetailDataForm
            userData={userInfo}
            navigation={navigation}
          />

          <AccessDataForm
            userData={userInfo}
            navigation={navigation}
          />

        </>
      )}



    </ScrollView>
  )

}

export default EditUserForm
