import React from 'react'
import { Input } from 'native-base'

const StyledField = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
      style={inputStyle}
      bgColor='rgba(217, 179, 255, .1)'
      borderColor='gray.50'
      placeholderTextColor='rgba(40, 10, 57, .5)'
      h={38}
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

export default StyledField