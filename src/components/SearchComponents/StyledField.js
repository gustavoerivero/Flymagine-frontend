import React from 'react'
import { Input } from 'native-base'

const StyledField = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
      style={inputStyle}
      borderRadius='full'
      bgColor='rgba(255, 255, 255, .75)'
      borderColor='white'
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

export default StyledField