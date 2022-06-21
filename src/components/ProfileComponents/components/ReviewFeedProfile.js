import React, { useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { Image, VStack, Text, FlatList, Stack } from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'
import ReviewItem from './ReviewItem'
import useAuthContext from '../../../hooks/useAuthContext'
import { getReviewByUser } from '../../../services/post/reviewAPI'
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
    state: { user },
  } = useAuthContext()

  const [reviews, setReviews] = useState([])

  useFocusEffect(
    useCallback(() => {
      getReviewByUser(userInfo._id || user._id)
        .then((res) => {
          let revs = res.filter((review) => review.book.status === 'A')
          setReviews(revs)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])
  )

  return (
    <VStack
      minH={layout.height * 0.5}
      minW={layout.width}
      pb={layout.height * 0.2}
      mb={layout.height * 0.2}
      px={1}
    >
      {reviews?.length > 0 ? (
        <FlatList
          py={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={reviews}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <Stack p={1}>
              <ReviewItem
                key={item?._id}
                dataReview={item}
                navigation={navigation}
              />
            </Stack>
          )}
        />
      ) : (
        <VStack alignItems='center'>
          <Image
            source={DontKnow}
            alt='DontKnow'
            resizeMode='contain'
            size={300}
          />
          <Text bold textAlign='center' color={COLORS.primary}>
            {user.id === userInfo?._id
              ? 'No haz realizado alguna review aún...'
              : 'Este usuario no tiene ha hecho alguna review aún...'}
          </Text>
        </VStack>
      )}
    </VStack>
  )
}

export default ReviewFeedProfile
