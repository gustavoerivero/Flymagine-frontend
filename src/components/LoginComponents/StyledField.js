import React from 'react'
import { Input } from 'native-base'

const StyledField = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
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
      autoCapitalize='none'
      {...props}
    />
  )
}

export default StyledField