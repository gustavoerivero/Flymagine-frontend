import React from 'react'
import { AirbnbRating } from 'react-native-elements'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuthContext from '../../../hooks/useAuthContext'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'

import { createReview } from '../../../services/post/reviewAPI'
import { reviewAdapter } from '../../../adapters/Review'

import {
  Text,
  FormControl,
  Modal,
  Button,
  TextArea,
} from 'native-base'

//Colors
import COLORS from '../../styled-components/Colors'

import { reviewSchema, reviewDefaultValues } from '../../../utils/formValidations/dataReviewValidation'

const NewReviewModal = ({ navigation, showModal, setShowModal, book }) => {

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    state: { user },
  } = useAuthContext()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(reviewSchema),
    defaultvalue: reviewDefaultValues,
  })

  const onSubmit = async (values) => {

    startLoading()

    try {

      const review = reviewAdapter({
        ...values,
        book: book._id,
        user: user.id,
      })

      console.log(review)

      const data = await createReview(review)
      console.log(data)

      showSuccessToast('¡Misión cumplida! La review fue creada con éxito')
      setShowModal(false)
      reset(reviewDefaultValues)
      navigation?.goBack()

    } catch (error) {
      console.log(error)
      showErrorToast('¡Misión fallida! No se pudo crear la review')
    }
    stopLoading()
  }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width='90%'>
        <Modal.CloseButton />
        <Modal.Header bg={COLORS.primary}>
          <Text bold color={COLORS.base} fontSize={'md'}>
            Nueva Review
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Cuentanos tu experiencia al leer el libro...</Text>

          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value = '', ...field } }) => (
              <FormControl
                isRequired
              >
                <FormControl.Label>¿Que tal te parecio?</FormControl.Label>
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
            render={({ field: { onChange, value = 1 } }) => (
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
                Enviar
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default NewReviewModal
