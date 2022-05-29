import React, { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import NewReviewModal from './NewReviewModal'

import { AntDesign } from '@expo/vector-icons'

import {
  ScrollView,
  Avatar,
  Box,
  Text,
  VStack,
  FormControl,
  Icon,
  WarningOutlineIcon,
  HStack,
  FlatList,
  Badge,
  Stack,
  Image,
  Fab,
  Modal,
  Input,
  Button,
} from 'native-base'

//image
import newplanet from '../../../../assets/new-planet.png'
import planet from '../../../../assets/planet.png'

//Components
import Review from '../../Post/Review'

//Colors
import COLORS from '../../styled-components/Colors'

const ReviewFeedBook = ({ navigation, bookInfo, reviewData }) => {
  const [showModal, setShowModal] = useState(false)
  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions()

  return (
    <Box
      maxH='93%'
      minW={layout.width}
      bg={COLORS.base}
      justifyContent='center'
      alignItems='center'
      p={1}
    >
      <Stack>
        <ScrollView>
          {reviewData.length > 0 && reviewData ? (
            reviewData?.map((reviewData, id) => (
              <Stack padding={1} key={id}>
                <Review navigation={navigation} review={reviewData} />
              </Stack>
            ))
          ) : (
            <Stack alignItems='center' alignContent='center'>
              <Image
                mt='60%'
                size={150}
                resizeMode={'cover'}
                source={planet}
                alt='New-Planet-Found'
              />
              <Text
                bold
                fontSize='20'
                color={COLORS.primary}
                textAlign='center'
                mv='5'
              >
                ¡Oh! Un mundo no explorado aún
              </Text>
              <Text
                fontSize='15'
                color={COLORS.primary}
                textAlign='center'
                mv='5'
              >
                Parece que no hay reviews de este libro
              </Text>
            </Stack>
          )}
        </ScrollView>
      </Stack>
      <Fab
        renderInPortal={false}
        shadow={2}
        size='lg'
        icon={<Icon color='white' as={<AntDesign name='plus' />} size='2xl' />}
        onPress={() => setShowModal(true)}
        bgColor={COLORS.button.primary}
      />
      <NewReviewModal showModal={showModal} setShowModal={setShowModal} />
    </Box>
  )
}

export default ReviewFeedBook
