import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Box } from 'native-base'
import { Tab, TabView } from '@rneui/themed'
import COLORS from '../../styled-components/Colors'
import ReviewFeedBook from './ReviewFeedBook'
import InfoBookProfile from './InfoBookProfile'
import useAuthContext from '../../../hooks/useAuthContext'

import { getBookById, getGenresByIdBook } from '../../../services/book/bookAPI'
import { getReviewByBook } from '../../../services/post/reviewAPI'

//<ReviewFeedBook/>

const TabContainerBookProfile = ({ navigation, bookData }) => {
  
  const [bookInfo, setBookInfo] = useState(null)
  const [bookGenres, setBookGenres] = useState([])
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)

  const [index, setIndex] = useState(0)

  const layout = useWindowDimensions()

  const tabs = ['Información', 'Reviews']

  useFocusEffect(
    useCallback(() => {
      getBookById(bookData)
        .then((res) => {
          setBookInfo(res)
          let info = res

          if (info) {

            getReviewByBook(info?._id)
              .then((res) => {
                setReviews(res)

                let sum = 0
                let count = 0

                res.forEach((review) => {
                  sum += review.rating
                  count++
                })

                if (count > 0) {
                  let average = Math.floor(sum / count)
                  setRating(average)
                }

              })
              .catch((err) => {
                console.log(err)
              })

            getGenresByIdBook(info?._id)
              .then((res) => {
                setBookGenres(res)
              })
              .catch((er) => {
                console.log(er)
              })

          }
        })
        .catch((err) => {
          console.log(err)
        })


    }, [])
  )

  return (
    <Box minH={layout.height}>
      <Tab
        value={index}
        onChange={setIndex}
        backgroundColor={COLORS.primary}
        indicatorStyle={{
          backgroundColor: COLORS.secundary,
          height: 4,
        }}
        scrollable
      >
        {bookInfo && tabs.map((tab, i) => (
          <Tab.Item
            key={tab + i.toString()}
            title={tab}
            titleStyle={{ color: COLORS.secundary }}
            containerStyle={{ backgroundColor: COLORS.primary }}
          />
        ))}
      </Tab>
      {bookInfo && (
        <TabView value={index} onChange={setIndex} animationType='spring'>
          <TabView.Item>
            <InfoBookProfile
              navigation={navigation}
              bookInfo={bookInfo}
              rating={rating}
              author={bookInfo?.user}
              bookGenres={bookGenres}
            />
          </TabView.Item>
          <TabView.Item>
            <ReviewFeedBook
              navigation={navigation}
              bookInfo={bookData}
              reviewData={reviews}
            />
          </TabView.Item>
        </TabView>
      )}
    </Box>
  )
}

export default TabContainerBookProfile
