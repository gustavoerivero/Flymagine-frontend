import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Box, View } from 'native-base'
import { Tab, TabView } from '@rneui/themed'
import COLORS from '../../styled-components/Colors'
import ReviewFeedBook from './ReviewFeedBook'
import InfoBookProfile from './InfoBookProfile'
import useAuthContext from '../../../hooks/useAuthContext'

import { getBookById, getGenresByIdBook } from '../../../services/book/bookAPI'
import { getUserById } from '../../../services/user/userAPI'
import { getReviewByBook } from '../../../services/post/reviewAPI'

//<ReviewFeedBook/>

const TabContainerBookProfile = ({ navigation, bookData }) => {
  const {
    state: { user },
  } = useAuthContext()

  const [bookInfo, setBookInfo] = useState(null)
  const [bookGenres, setBookGenres] = useState([])
  const [author, setAuthor] = useState(null)
  const [reviews, setReviews] = useState([])

  const [index, setIndex] = useState(0)

  const layout = useWindowDimensions()

  const tabs = ['Información', 'Reviews']

  useFocusEffect(
    useCallback(() => {
      getBookById(bookData)
        .then((res) => {
          setBookInfo(res)
          console.log(res)
          let info = res

          if (info) {
            getUserById(info?.idUser)
              .then((res) => {
                setAuthor(res?.Data)
                console.log('Autor', res)
              })
              .catch((error) => {
                console.log(error)
              })

            getReviewByBook(info?._id)
              .then((res) => {
                setReviews(res)
              })
              .catch((err) => {
                console.log(err)
              })

            getGenresByIdBook(info?._id)
            .then((res) => {
              setBookGenres(res)
              console.log('GENEROS', res)
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
        {tabs.map((tab) => (
          <Tab.Item
            key={tab}
            title={tab}
            titleStyle={{ color: COLORS.secundary }}
            containerStyle={{ backgroundColor: COLORS.primary }}
          />
        ))}
      </Tab>
      <TabView value={index} onChange={setIndex} animationType='spring'>
        <TabView.Item>
          <InfoBookProfile
            navigation={navigation}
            bookInfo={bookInfo}
            author={author}
            bookGenres={bookGenres}
          />
        </TabView.Item>
        <TabView.Item>
          <ReviewFeedBook
            navigation={navigation}
            bookInfo={bookInfo}
            reviewData={reviews}
          />
        </TabView.Item>
      </TabView>
    </Box>
  )
}

export default TabContainerBookProfile
