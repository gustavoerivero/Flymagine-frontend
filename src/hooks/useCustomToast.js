import { Dimensions } from 'react-native'
import { useToast, Avatar, Text, HStack, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../components/styled-components/Colors'

const { width } = Dimensions.get('window')

const Toast = ({ id, text = 'r', color = COLORS.primary, bgColor = COLORS.secundary}) => (
  <HStack
    id={id}
    h='20'
    w={width}
    bottom={-50}
    backgroundColor={bgColor}
    px={10}
    pr={20}
    space={2}
    alignItems='center'
  >
    <Avatar bgColor={color}>
      <Icon
        as={Ionicons}
        name='ios-information-circle-outline'
        size={6}
        color='white'
      />
    </Avatar>
    <Text color={color} bold pr={2} textAlign='justify' >
      {text}
    </Text>
  </HStack>
)

const useCustomToast = () => {
  const toast = useToast()

  const showSuccessToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} bgColor={COLORS.bgPrimary} />
      },
    })
  }

  const showErrorToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} color={COLORS.error.primary} bgColor={COLORS.error.bgError} />
      },
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}

export default useCustomToast