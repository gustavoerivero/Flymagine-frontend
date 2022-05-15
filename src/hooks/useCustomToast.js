import { Dimensions } from 'react-native'
import { useToast, Avatar, Text, HStack, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const Toast = ({ id, text = 'r' }) => (
  <HStack
    id={id}
    h='20'
    w={width}
    bottom={-50}
    backgroundColor='white'
    px={6}
    space={4}
    alignItems='center'
  >
    <Avatar bgColor='#5A7E64'>
      <Icon
        as={Ionicons}
        name='ios-information-circle-outline'
        size={6}
        color='white'
      />
    </Avatar>
    <Text color='#5A7E64' fontWeight='bold'>
      {text}
    </Text>
  </HStack>
)

const useCustomToast = () => {
  const toast = useToast()

  const showSuccessToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} />
      },
    })
  }

  const showErrorToast = (text = '') => {
    toast.show({
      title: text,
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}

export default useCustomToast