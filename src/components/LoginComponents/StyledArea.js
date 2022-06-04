import React from 'react'
import { TextArea } from 'native-base'
import COLORS from '../styled-components/Colors'

const StyledArea = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style,
  }
  const [height, setHeight] = React.useState(50)
  return (
    <TextArea
      style={inputStyle}
      bgColor={COLORS.base}
      borderColor={COLORS.primary}
      placeholderTextColor='rgba(40, 10, 57, .5)'
      minH={50}
      h={height}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      w={{
        base: '95%',
        md: '25%',
      }}
      size='md'
      color={COLORS.gray3}
      {...props}
    />
  )
}

export default StyledArea
