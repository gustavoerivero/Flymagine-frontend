import React from 'react'
import { 
  View, 
  Box,
  Stack,
  HStack,
  VStack,
  Text 
} from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'

const ReadingFeedProfile = ({ navigation }) => {

  const layout = useWindowDimensions()

  return (
    <View
      minH={layout.height}
      minW={layout.width}
      bgColor={COLORS.base}
    >
      <Box
        p={1}
        alignItems='center'
      >
        <Text>
          Reading Feed Profile
        </Text>
      </Box>
    </View>
  )
}

export default ReadingFeedProfile