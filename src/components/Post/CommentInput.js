import React from 'react'
import { Box, TextArea, Icon, HStack, Stack } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { useWindowDimensions } from 'react-native'
import COLORS from '../styled-components/Colors'

const CommentInput = ({ style = {}, ...props }, { children }) => {
  const layout = useWindowDimensions()

  const [height, setHeight] = React.useState(20)

  return (
    <Box
      w={layout.width}
      minH={layout.height * 0.12}
      maxH={layout.height * 0.2}
      bgColor='white'
      py={1}
      px={2}
      justifyContent='center'
    >
      <HStack alignItems='center' w='100%'>
        <Stack w='10%' alignItems='center'>
          <Icon as={FontAwesome} name='comment' size={8} color='#aaa' />
        </Stack>

        <Stack w='90%'>
          <TextArea
            textAlignVertical='center'
            textAlign='justify'
            minH={16}
            h={height}
            maxH={120}
            bgColor={COLORS.base}
            color={COLORS.gray4}
            borderColor={'white'}
            m={1}
            onContentSizeChange={(event) => {
              setHeight(event.nativeEvent.contentSize.height)
            }}
            variant='unstyled'
            size='md'
            {...props}
          />
        </Stack>
      </HStack>
    </Box>
  )
}

export default CommentInput
