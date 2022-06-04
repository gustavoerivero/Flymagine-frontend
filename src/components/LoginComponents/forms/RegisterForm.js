import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  Button
} from 'react-native-elements'
import {
  Box,
  Text,
  VStack,
  FormControl,
  Icon,
  WarningOutlineIcon,
  HStack,
  Divider,
  FlatList,
  Badge,
} from 'native-base'
import {
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'
import StyledField from '../StyledField'
import StyledArea from '../StyledArea'

import {
  Controller,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'
import {
  registerSchema,
  registerDefaultValue,
} from '../../../utils/formValidations/registerUserFormValidation'
import { registerUser } from '../../../services/authAPI'
import { setPreferences } from '../../../services/user/userAPI'
import { getAllLiteraryGenre } from '../../../services/literaryGenre/literaryGenre'
import { personalPreferencesData, registerData } from '../../../adapters/User'

import COLORS from '../../../components/styled-components/Colors'

const RegisterForm = ({ navigation }) => {

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [literaryGenres, setLiteraryGenres] = useState([])

  useEffect(() => {
    getAllLiteraryGenre()
      .then(response => {
        setLiteraryGenres(response)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
        showErrorToast('Error al agregar los géneros literarios')
      })
  }, [])

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValue,
  })

  const onChange = (_, selectedDate) => {
    setShowDatePicker(false)
    const date = selectedDate || new Date()
    setValue('birthday', date)
  }

  const onSubmit = async (values) => {
    startLoading()
    try {

      const response = await registerUser(registerData(values))

      const responsePreferences = await setPreferences(response?.Data?._id, personalPreferencesData(values))

      console.log(responsePreferences)

      showSuccessToast('¡Bienvenido a Flymagine!')

      reset(registerDefaultValue)
      setShowPassword(false)
      setShowConfirmPassword(false)
      setValue('literaryGenres', [])
      
      navigation?.navigate('Login')

    } catch (error) {
      showErrorToast(error?.message)
      console.log(error)
    }
    stopLoading()
  }

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.container} >
          <Box
            alignItems='center'
            rounded='lg'
            bg={COLORS.base}
            opacity={0.8}
            shadow={2}
            borderColor='coolGray.300'
            borderWidth={1}
            p={3}
            py={5}
            m={5}
            w={350}
            mw={350}
          >
            <VStack
              space={4}
              alignItems='center'
            >

              <Text
                bold
                fontSize='xl'
                color={COLORS.primary}
              >
                Formulario de Registro
              </Text>

              <Divider />

              <Text
                fontSize={10}
                color='purple.900'
                opacity={0.8}
                textAlign='center'
              >
                Por favor, rellene los siguientes campos para registrarse y
                formar parte de Flymagine
              </Text>

              <Controller
                control={control}
                name='firstName'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.firstName && value !== ''}
                  >
                    <FormControl.Label>
                      Nombre
                    </FormControl.Label>
                    <StyledField
                      placeholder='Nombre'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.firstName && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.firstName && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.firstName && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.firstName?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='lastName'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.lastName && value !== ''}
                  >
                    <FormControl.Label>
                      Apellido
                    </FormControl.Label>
                    <StyledField
                      placeholder='Apellido'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.lastName && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.lastName && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.lastName && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.lastName?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='phone'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.phone && value !== ''}
                  >
                    <FormControl.Label>
                      Número de teléfono
                    </FormControl.Label>
                    <StyledField
                      placeholder='Número de teléfono'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.phone && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='smartphone'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.phone && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.phone && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.phone?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='address'
                render={({
                  field: { onChange, onBlur, value = '', ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.address && value !== ''}
                    mb={errors?.address && value !== '' ? 0 : 3}
                  >
                    <FormControl.Label>
                      Dirección de vivienda
                    </FormControl.Label>
                    <StyledArea
                      placeholder='Dirección de vivienda'
                      onChangeText={onChange}
                      value={value}
                      textAlignVertical='center'
                      borderColor={errors?.address && value !== '' ? 'red.500' : 'grey'}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='house'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.address && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.address && value !== '' && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.address?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='birthday'
                control={control}
                render={({
                  field: { value = new Date() } }) => (
                  <>
                    <FormControl
                      isRequired
                    >
                      <FormControl.Label>Fecha de nacimiento</FormControl.Label>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShowDatePicker(true)}
                        style={{
                          alignItems: 'center',
                          width: '100%'
                        }}
                      >
                        <StyledField
                          placeholder='Fecha de nacimiento'
                          isReadOnly
                          value={value?.toISOString()?.split('T')[0].split('-').reverse().join('/')}
                          borderColor={'grey'}
                          InputLeftElement={
                            <Icon
                              as={
                                <MaterialIcons
                                  name='calendar-today'
                                />
                              }
                              size={5}
                              ml='4'
                              color={'muted.900'}
                            />
                          }
                        />
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={value}
                          mode='date'
                          is24Hour
                          onChange={onChange}
                        />
                      )}
                    </FormControl>
                  </>
                )}
              />

              <Controller
                control={control}
                name='biography'
                render={({
                  field: { onChange, onBlur, value = '', ...field } }) => (
                  <FormControl
                    mb={errors?.biography && value !== '' ? 0 : 3}
                  >
                    <FormControl.Label>
                      Biografía
                    </FormControl.Label>
                    <StyledArea
                      placeholder='Biografía'
                      textAlignVertical='center'
                      onChangeText={onChange}
                      value={value}
                      borderColor={errors?.biography && value !== '' ? 'red.500' : 'grey'}
                      {...field}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='history-edu'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.biography && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='email'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.email && value !== ''}
                  >
                    <FormControl.Label>
                      Correo electrónico
                    </FormControl.Label>
                    <StyledField
                      placeholder='Correo electrónico'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.email && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='person'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.email && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                    />
                    {errors?.email && (
                      <FormControl.ErrorMessage
                        maxWidth={300}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.email?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='password'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.password && value !== ''}
                  >
                    <FormControl.Label>
                      Contraseña
                    </FormControl.Label>
                    <StyledField
                      placeholder='Contraseña'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.password && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='lock'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.password && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                      InputRightElement={
                        <Icon as={
                          <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                          />
                        }
                          size={5}
                          mr='4'
                          color={showPassword ? 'purple.900' : 'muted.900'}
                          onPress={() => setShowPassword(!showPassword)} />
                      }
                      secureTextEntry={!showPassword}
                    />
                    {errors?.password && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.password?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='confirmPassword'
                render={({
                  field: { onChange, onBlur, value, ...field } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.confirmPassword && value !== ''}
                  >
                    <FormControl.Label>
                      Confirme la contraseña
                    </FormControl.Label>
                    <StyledField
                      placeholder='Confirmación de contraseña'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      {...field}
                      borderColor={errors?.confirmPassword && value !== '' ? 'red.500' : 'grey'}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialIcons
                              name='lock'
                            />
                          }
                          size={5}
                          ml='4'
                          color={errors?.confirmPassword && value !== '' ? 'red.500' : 'muted.900'}
                        />
                      }
                      InputRightElement={
                        <Icon as={
                          <MaterialIcons
                            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                          />
                        }
                          size={5}
                          mr='4'
                          color={showConfirmPassword ? 'purple.900' : 'muted.900'}
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
                      }
                      secureTextEntry={!showConfirmPassword}
                    />
                    {errors?.confirmPassword && (
                      <FormControl.ErrorMessage
                        maxWidth={280}
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        {errors?.confirmPassword?.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='literaryGenres'
                control={control}
                render={({ field: { value = [], onChange, onBlur } }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.literaryGenres && value?.length === 0}
                  >
                    <Box ml={2} mr={2} >
                      <FormControl.Label>
                        Escoge los géneros literarios que te interesan
                      </FormControl.Label>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={literaryGenres}
                        keyExtractor={(item) => item?._id}
                        ItemSeparatorComponent={() => <Box w={2} />}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                              const newValue = [...value]

                              if (newValue.find((genre) => genre?.name === item?.name)) {
                                newValue.splice(newValue.findIndex((genre) => genre?.name === item?.name), 1)
                              } else {
                                newValue.push(item)
                              }

                              console.log(newValue)
                              onChange(newValue)
                              onBlur()
                            }}
                          >
                            <Badge
                              colorScheme='success'
                              style={{
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: 'white',
                                backgroundColor:
                                  value.find((genre) => genre?._id === item?._id)
                                    ? COLORS.primary : COLORS.base,
                              }}
                            >
                              <Text
                                color={
                                  value.find((genre) => genre?._id === item?._id)
                                    ? 'white' : 'purple.900'}
                              >
                                {item?.name}
                              </Text>
                            </Badge>
                          </TouchableOpacity>
                        )}
                      />
                      {errors?.literaryGenres && value?.length !== 0 && (
                        <FormControl.ErrorMessage>
                          {errors?.literaryGenres?.message}
                        </FormControl.ErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name='idRole'
                render={({
                  field: { value = '626aef37b4a9510568d6036d' }
                }) => (
                  <FormControl
                    isRequired
                    isInvalid={errors?.role && value !== ''}
                  >
                    <FormControl.Label
                      ml={3}
                    >
                      Escoge tu rol
                    </FormControl.Label>
                    <HStack
                      space={2}
                      px={2}
                      alignItems='center'
                      w='100%'
                      justifyContent='center'
                    >
                      <Box
                        alignItems='center'
                        rounded='lg'
                        bg={COLORS.secundary}
                        shadow={2}
                        borderColor='coolGray.300'
                        borderWidth={1}
                        p={3}
                        mb={5}
                        width='50%'
                      >
                        <VStack
                          space={2}
                          alignItems='center'
                          bg={COLORS.secundary}
                        >
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: 'rgba(0, 0, 0, .9)',
                            }}
                          >
                            Lector
                          </Text>
                          <Box>
                            <Text
                              fontSize={12}
                              style={{
                                fontWeight: 'bold',
                                color: 'rgba(0, 0, 0, 1)',
                                textAlign: 'center',
                              }}
                            >
                              ¿Te apetece leer?
                            </Text>
                            <Text
                              fontSize={10}
                              style={{
                                color: 'rgba(0, 0, 0, .75)',
                                textAlign: 'center',
                              }}
                            >
                              ¡Comparte y disfruta de la lectura con tus amigos!
                            </Text>
                          </Box>
                          <Button
                            title='Lector'
                            buttonStyle={{
                              backgroundColor: value === '626aef37b4a9510568d6036d' ? COLORS.button.secundary : COLORS.button.secundaryDisabled,
                            }}
                            containerStyle={{
                              width: 125,
                              alignContent: 'center',
                            }}
                            onPress={() => setValue('idRole', '626aef37b4a9510568d6036d')}
                            icon={
                              <Icon
                                as={
                                  <MaterialIcons
                                    name='book'
                                  />
                                }
                                size={5}
                                color={value === '626aef37b4a9510568d6036d' ? 'muted.900' : 'muted.300'}
                                mr={2}
                              />
                            }
                          />
                        </VStack>
                      </Box>

                      <Box
                        alignItems='center'
                        rounded='lg'
                        bg={COLORS.secundary}
                        shadow={2}
                        borderColor='coolGray.300'
                        borderWidth={1}
                        p={3}
                        mb={5}
                        width='50%'
                      >
                        <VStack
                          space={2}
                          alignItems='center'
                        >
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: 'rgba(0, 0, 0, .9)',
                            }}
                          >
                            Escritor
                          </Text>
                          <Box>
                            <Text
                              fontSize={12}
                              style={{
                                fontWeight: 'bold',
                                color: 'rgba(0, 0, 0, 1)',
                                textAlign: 'center',
                              }}
                            >
                              ¿Gustas escribir?
                            </Text>
                            <Text
                              fontSize={10}
                              style={{
                                color: 'rgba(0, 0, 0, .75)',
                                textAlign: 'center',
                              }}
                            >
                              ¡Adéntrate y explora en el bello mundo de la escritura!
                            </Text>
                          </Box>
                          <Button
                            title='Escritor'
                            buttonStyle={{
                              backgroundColor: value === '626aeed5b4a9510568d6036b' ? COLORS.button.terciary : COLORS.button.terciaryDisabled,
                            }}
                            containerStyle={{
                              width: 125,
                              alignContent: 'center',
                            }}
                            onPress={() => setValue('idRole', '626aeed5b4a9510568d6036b')}
                            icon={
                              <Icon
                                as={
                                  <Entypo
                                    name='pencil'
                                  />
                                }
                                mr={2}
                                size={5}
                                color={value === '626aeed5b4a9510568d6036b' ? 'muted.900' : 'muted.300'}
                              />
                            }
                          />
                        </VStack>
                      </Box>

                    </HStack>
                  </FormControl>
                )}
              />


              <Text textAlign='center' fontSize={10}>
                Al registrarse, acepta los términos y condiciones de la aplicación.
              </Text>

              <Button
                title='Regístrate'
                buttonStyle={[styles.button, { backgroundColor: COLORS.button.primary }]}
                isLoading={isLoading}
                disabled={isLoading || !isValid}
                onPress={handleSubmit(onSubmit)}
              />

            </VStack>
          </Box>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  )

}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '85%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 170,
    marginHorizontal: 2,
  },

  text: {
    color: 'white'
  },
  checkbox: {
    backgroundColor: 'transparent',
    width: '95%',
    borderColor: 'transparent'
  },
  checkboxText: {
    color: 'white'
  },
  buttonRecover: {
    height: 35,
    width: '100%',
    margin: 0,
    padding: 0
  }
})

export default RegisterForm