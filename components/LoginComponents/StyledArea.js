import React from 'react'
import { TextArea } from 'native-base'

const StyledArea = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style
  }
  return (
    <TextArea
      style={inputStyle}
      bgColor='rgba(158, 132, 173, .25)'
      borderColor='grey'
      placeholderTextColor='rgba(40, 10, 57, .5)'
      h={50}
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