import React from 'react'
import { Input } from 'native-base'
import COLORS from '../styled-components/Colors'

const StyledField = ({ style = {}, ...props }) => {
  const inputStyle = {
    ...style,
  }
  return (
    <Input
      style={inputStyle}
      bgColor={COLORS.base}
      borderColor={COLORS.primary}
      placeholderTextColor='rgba(40, 10, 57, .5)'
      h={50}
      w={{
        base: '95%',
        md: '25%',
      }}
      size='md'
      color={COLORS.gray3}
      autoCapitalize='none'
      {...props}
    />
  )
}

export default StyledField
