import React, { useState, useCallback } from 'react'
import { RefreshControl, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  Image,
  VStack,
  Stack,
  Text,
  FlatList,
  Button,
} from 'native-base'

import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'

const ScrollInfiniteItems = ({ setData, data, getData, renderItem, isLoading, currentPage, setCurrentPage, setIsNextPage }) => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    console.log('refreshing')
    setData([])
    setIsNextPage(true)
    setCurrentPage(1)
    getData()
  }, [])

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </Stack>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [currentPage])
  )

  return (
    <>
      {data?.length === 0 && !isLoading ? (
        <VStack alignContent='center' alignItems='center'>
          <Image
            source={DontKnow}
            alt='DontKnow'
            resizeMode='contain'
            size={400}
          />
          <Text bold textAlign='center' color={COLORS.primary}>
            Discúlpanos, pero no pudimos encontrar lo que estás
            buscando
          </Text>
          <Text textAlign='center' color={COLORS.primary}>
            Intenta con otra palabra o refresca la búsqueda
          </Text>
          <Button
            mt={2}
            onPress={onRefresh}
            colorScheme='purple'
          >
            <Text bold color='white'>
              Refrescar
            </Text>
          </Button>
        </VStack>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          keyExtractor={item => item?._id?.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
        />
      )}
    </>
  )

}

export default ScrollInfiniteItems