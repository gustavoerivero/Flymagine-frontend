import React, { useState, useEffect } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  Avatar,
  Box,
  View,
  ScrollView,
} from 'native-base'
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
import COLORS from '../../../components/styled-components/Colors'
import AccessDataForm from '../components/EditFormComponents/AccessDataForm'

const EditUserForm = ({ navigation }) => {

  const layout = useWindowDimensions()
  const {
    state: { user },
  } = useAuthContext()

  const [image, setImage] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  useEffect(() => {
    permisionFunction()
    getUserById(user?.id)
      .then(res => {
        setUserInfo(res?.Data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const onSubmit = async (values) => {
    startLoading()
    try {

      navigation?.goBack()

    } catch (error) {
      showErrorToast(error?.message)
      console.log(error)
    }
    stopLoading()
  }

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
            onPress={() => {
              console.log('Upload image')
              let pick = pickImage()
              pick.then(res => {
                setImage(res)
                showSuccessToast('¡Misión cumplica! Tu imagen de perfil ha sido actualizada con éxito')
              }).catch(err => {
                console.log(err)
                showErrorToast('¡Misión fallida! No se pudo actualizar tu imagen de perfil')
              })
              console.log(image)
            }}
          >
            <Avatar
              bg='purple.600'
              size='2xl'
              source={{
                uri: image ? image : userInfo?.image,
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
