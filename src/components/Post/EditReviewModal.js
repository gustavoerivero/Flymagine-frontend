import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AirbnbRating } from 'react-native-elements'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../hooks/useCustomToast'
import useLoading from '../../hooks/useLoading'

import { updateReview } from '../../services/post/reviewAPI'
import { reviewAdapter } from '../../adapters/Review'

import {
  Text,
  FormControl,
  Modal,
  Button,
  TextArea,
} from 'native-base'

//Colors
import COLORS from '../styled-components/Colors'

import { reviewSchema, reviewDefaultValues } from '../../utils/formValidations/dataReviewValidation'

const EditReviewModal = ({ navigation, showModal, setShowModal, review }) => {

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(reviewSchema),
    defaultvalue: reviewDefaultValues,
  })

  useFocusEffect(
    useCallback(() => {
      setValue('description', review.description)
      setValue('rating', review.rating)
    }, [])
  )

  const onSubmit = async (values) => {

    startLoading()

    try {

      const data = reviewAdapter({
        ...values,
        userId: review.idUser,
        bookId: review.idBook,
      })
      const response = await updateReview(review._id, data)
      console.log(response)

      showSuccessToast('¡Misión cumplida! La review fue modificada con éxito')
      setShowModal(false)
      reset(reviewDefaultValues)
      navigation?.goBack()

    } catch (error) {
      console.log(error)
      showErrorToast('¡Misión fallida! No se pudo modificar la review')
    }
    stopLoading()
  }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width='90%'>
        <Modal.CloseButton />
        <Modal.Header bg={COLORS.primary}>
          <Text bold color={COLORS.base} fontSize={'md'}>
            Modifica tu review
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>¿Te equivocaste en algo?</Text>

          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value = '', ...field } }) => (
              <FormControl
                isRequired
              >
                <FormControl.Label>¿Cuál es tu nueva opinión?</FormControl.Label>
                <TextArea 
                  placeholder='Coméntanos, ¿cómo estuvo?...'
                  onChangeText={onChange}
                  value={value}
                  {...field}
                />
              </FormControl>
            )}
          />

          <Controller
            name='rating'
            control={control}
            render={({ field: { onChange, value = review.rating } }) => (
              <FormControl mt='3'
                isRequired
              >
                <FormControl.Label>Califica el libro</FormControl.Label>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={20}
                  defaultRating={value}
                  minValue={1}
                  selectedColor={'#FF00F0'}
                  unSelectedColor={COLORS.button.secundaryDisabled}
                  onFinishRating={(value) => onChange(value)}
                />
              </FormControl>
            )}
          />


        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant='ghost'
              colorScheme='blueGray'
              onPress={() => {
                setShowModal(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              bgColor={COLORS.button.primary}
              isDisabled={!isValid || isLoading}
              isLoading={isLoading}
              size={'md'}
              minW={'30%'}
              onPress={handleSubmit(onSubmit)}
            >
              <Text bold color={COLORS.base} fontSize={'sm'}>
                Modificar
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default EditReviewModal
