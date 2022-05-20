import React from 'react'
import { TextArea } from 'native-base'

const StyledArea = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style
  }
  const [height, setHeight] = React.useState(50)
  return (
    <TextArea
      style={inputStyle}
      bgColor='rgba(158, 132, 173, .25)'
      borderColor='grey'
      placeholderTextColor='rgba(40, 10, 57, .5)'
      minH={50}
      h={height}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      w={{
        base: "95%",
        md: "25%"
      }}
      size='md'
      color='black'
      {...props}
    />
  )
}

export default StyledArea