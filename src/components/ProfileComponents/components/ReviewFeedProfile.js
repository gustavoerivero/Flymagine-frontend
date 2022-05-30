import React, { useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import {
  Image,
  VStack,
  Text,
  ScrollView,
} from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'
import BookItem from './BookItem'
import ReviewItem from './ReviewItem'
import useAuthContext from '../../../hooks/useAuthContext'
import { getReviewByUser } from '../../../services/post/reviewAPI'
import { getToReadBooks } from '../../../services/user/userAPI'
import { useFocusEffect } from '@react-navigation/native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ReviewFeedProfile = ({ navigation, userInfo }) => {

  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const {
    state: { user }
  } = useAuthContext()

  const [books, setBooks] = useState([])
  const [reviews, setReviews] = useState([])

  useFocusEffect(
    useCallback(() => {

      getReviewByUser(userInfo._id || user._id)
        .then(res => {
          setReviews(res)
        })
        .catch(err => {
          console.log(err)
        })

    }, [])
  )

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <VStack
        space={2}
        minH={layout.height + 300}
        minW={layout.width}
        m={2}
        pr={4}
        pb={layout.height * .2}
        mb={layout.height * .2}
      >
        {reviews?.length > 0 ? reviews.map((review, index) => (
          <ReviewItem 
            key={index}
            dataReview={review}
            navigation={navigation}
          />
        )) : (
          <VStack alignItems='center'>
            <Image
              source={DontKnow}
              alt='DontKnow'
              resizeMode='contain'
              size={300}
            />
            <Text bold textAlign='center' color={COLORS.primary}>
              {user.id === userInfo?._id ? 'No haz realizado alguna review aún...' : 'Este usuario no tiene ha hecho alguna review aún...'}
            </Text>
          </VStack>
        )}
      </VStack>

    </ScrollView>
  )
}

export default ReviewFeedProfile