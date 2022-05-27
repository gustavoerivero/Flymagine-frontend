import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  View,
  Image,
  IconButton,
  Icon,
  VStack,
  Stack,
  Text,
  ScrollView,
} from 'native-base'
import { Tab, TabView } from '@rneui/themed'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import StyledField from '../components/SearchComponents/StyledField'
import COLORS from '../components/styled-components/Colors'

import UserItem from '../components/SearchComponents/UserItem'
import BookItem from '../components/SearchComponents/BookItem'
import Post from '../components/Post/Post'

import { searchUsersNoLimits } from '../services/user/userAPI'
import { searchBooks } from '../services/book/bookAPI'
import { searchHashtag } from '../services/hashtag/hashtagAPI'
import { searchPostByHashtags } from '../services/post/postAPI'

import Pana from '../../assets/images/pana.png'
import DontKnow from '../../assets/images/dontknow.png'

const Search = ({ navigation }) => {

  const layout = useWindowDimensions()
  const [search, setSearch] = useState('')
  const [index, setIndex] = useState(0)

  const tabs = [
    'Todo',
    'Usuarios',
    'Libros',
    'Publicaciones'
  ]

  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [posts, setPosts] = useState([])

  return (
    <View minH={layout.height}>
      <VStack alignItems='center'>
        <Stack bgColor={COLORS.primary} alignItems='flex-start' w='100%' p={4} pl={6}>
          <Text bold fontSize={20} color='white'>
            Descubre nuevos mundos...
          </Text>
        </Stack>
        <Stack bgColor={COLORS.primary} w='100%' alignItems='center' pb={2}>
          <StyledField
            placeholder='¿Qué estás buscando?'
            onChangeText={(text) => {

              setSearch(text)

              if (text !== '') {

                searchUsersNoLimits(text)
                  .then(res => {
                    setUsers(res?.Data || [])
                  })
                  .catch(err => {
                    console.log(err)
                  })

                searchBooks(text)
                  .then(res => {
                    setBooks(res)
                  })
                  .catch(err => {
                    console.log(err)
                  })

                searchHashtag(text)
                  .then(res => {

                    if (res.length > 0) {

                      let hashtags = res?.map(hashtag => hashtag?._id)

                      searchPostByHashtags(hashtags)
                        .then(res => {
                          let pubs = res.map(element => element.idPost)
                          setPosts(pubs || [])
                        })
                        .catch(err => {
                          console.log(err)
                        })

                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            }}
            value={search}
            leftElement={
              <Icon
                as={search === '' ? FontAwesome : FontAwesome5}
                name={search === '' ? 'search' : 'arrow-alt-circle-right'}
                color={COLORS.button.primary}
                size={6}
                ml={3}
              />
            }
            rightElement={
              search !== '' && (
                <IconButton
                  onPress={() => setSearch('')}
                  borderRadius='full'
                  icon={
                    <Icon
                      as={FontAwesome5}
                      name='times'
                      color={COLORS.button.primary}
                      size={6}
                    />
                  }
                />
              )}
          />
        </Stack>
        {search !== '' ?
          <View minH={layout.height} >
            <Tab
              value={index}
              onChange={setIndex}
              indicatorStyle={{
                backgroundColor: 'white',
                height: 4,
              }}
              scrollable
            >
              {tabs.map((tab) => (
                <Tab.Item
                  key={tab}
                  title={tab}
                  titleStyle={{ color: 'white' }}
                  containerStyle={{ backgroundColor: COLORS.primary }}
                />
              ))}
            </Tab>
            <TabView
              value={index}
              onChange={setIndex}
              animationType='spring'
            >
              <TabView.Item>

              </TabView.Item>

              <TabView.Item>
                <ScrollView>
                  <VStack
                    minH={layout.height}
                    pb={layout.height * .2}
                    space={1}
                  >
                    {users.length ? users.map(user => (
                      <UserItem
                        key={user._id}
                        userItem={user}
                        navigation={navigation}
                      />
                    ))
                      :
                      <VStack alignContent='center' alignItems='center'>
                        <Image
                          source={DontKnow}
                          alt='DontKnow'
                          resizeMode='contain'
                          size={400}
                        />
                        <Text bold textAlign='center' color={COLORS.primary}>
                          Discúlpanos, pero no pudimos encontrar lo que estás buscando
                        </Text>
                      </VStack>
                    }
                  </VStack>
                </ScrollView>
              </TabView.Item>

              <TabView.Item>
                <ScrollView>
                  <VStack
                    minH={layout.height}
                    pb={layout.height * .2}
                    space={1}
                  >
                    {books.length ? books.map(book => (
                      <BookItem
                        key={book._id}
                        bookItem={book}
                        navigation={navigation}
                      />
                    ))
                      :
                      <VStack alignContent='center' alignItems='center'>
                        <Image
                          source={DontKnow}
                          alt='DontKnow'
                          resizeMode='contain'
                          size={400}
                        />
                        <Text bold textAlign='center' color={COLORS.primary}>
                          Discúlpanos, pero no pudimos encontrar lo que estás buscando
                        </Text>
                      </VStack>
                    }
                  </VStack>
                </ScrollView>
              </TabView.Item>

              <TabView.Item>
                <ScrollView>
                  <VStack
                    minH={layout.height}
                    pb={layout.height * .3}
                    mx={2}
                    mt={1}
                    space={1}
                  >
                    {posts.length > 0 ? posts.map((post) => (
                      <Post
                        key={post._id}
                        post={post}
                        navigation={navigation}
                      />
                    ))
                      :
                      <VStack alignContent='center' alignItems='center'>
                        <Image
                          source={DontKnow}
                          alt='DontKnow'
                          resizeMode='contain'
                          size={400}
                        />
                        <Text bold textAlign='center' color={COLORS.primary}>
                          Discúlpanos, pero no pudimos encontrar lo que estás buscando
                        </Text>
                      </VStack>
                    }
                  </VStack>
                </ScrollView>
              </TabView.Item>

            </TabView>
          </View>
          :
          <VStack alignContent='center' alignItems='center'>
            <Image
              source={Pana}
              alt='Pana'
              resizeMode='contain'
              size={400}
            />
            <Text bold textAlign='center' color={COLORS.primary}>
              Cuéntanos qué estás buscando para que te ayudemos a encontrarlo
            </Text>
          </VStack>
        }
      </VStack>
    </View>
  )
}

export default Search;
