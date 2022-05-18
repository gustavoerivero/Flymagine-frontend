import React from 'react'
import {
  Box,
  TextArea,
  Icon,
  HStack,
} from 'native-base'
import {
  FontAwesome,
} from '@expo/vector-icons'
import { useWindowDimensions } from 'react-native'

const CommentInput = ({ style = {}, ...props }, {children}) => {

  const layout = useWindowDimensions()

  const [height, setHeight] = React.useState(20)

  return (
    <Box
      w={layout.width}
      bgColor='white'
      borderTopRadius={10}
      p={2}
      shadow={2}
    >
      <HStack alignItems='center' space={2} >
        <Icon
          as={FontAwesome}
          name='comment'
          size={7}
          color='#aaa'
        />
        <TextArea
          textAlignVertical='center'
          textAlign='justify'
          minH={16}
          h={height}
          w={layout.width * .85}
          bgColor='rgba(217, 179, 255, .08)'
          color='black'
          borderColor={'white'}
          m={2}
          onContentSizeChange={(event) => {
            setHeight(event.nativeEvent.contentSize.height)
          }}
          variant='unstyled'
          size='md'
          {...props}          
        />
      </HStack>
    </Box>
  )
}

export default CommentInput