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
  Box,
  FlatList,
  StatusBar,
} from 'native-base'
import { Tab, TabView } from '@rneui/themed'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import StyledField from '../components/SearchComponents/StyledField'
import COLORS from '../components/styled-components/Colors'

import UserItem from '../components/SearchComponents/UserItem'
import BookItem from '../components/SearchComponents/BookItem'
import Post from '../components/Post/Post'
import FoundCard from '../components/SearchComponents/FoundCard'

import { searchUsers } from '../services/user/userAPI'
import { searchBooks } from '../services/book/bookAPI'
import { searchHashtag } from '../services/hashtag/hashtagAPI'
import { searchPostByHashtags } from '../services/post/postAPI'

//image
import Pana from '../../assets/images/pana.png'
import DontKnow from '../../assets/images/dontknow.png'
import userfound from '../../assets/images/userfound.png'
import bookfound from '../../assets/images/bookfound.png'
import postfound from '../../assets/images/postfound.png'

import ScrollInfiniteItems from '../components/SearchComponents/components/ScrollInfiniteItems'

const Search = ({ navigation }) => {
  const layout = useWindowDimensions()
  const [search, setSearch] = useState('')
  const [index, setIndex] = useState(0)

  const tabs = ['Todo', 'Usuarios', 'Libros', 'Publicaciones']

  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [posts, setPosts] = useState([])

  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const [currentPagePost, setCurrentPagePost] = useState(1)
  const [isNextPagePost, setIsNextPagePost] = useState(true)

  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [currentPageUser, setCurrentPageUser] = useState(1)
  const [isNextPageUser, setIsNextPageUser] = useState(true)

  const [isLoadingBook, setIsLoadingBook] = useState(false)
  const [currentPageBook, setCurrentPageBook] = useState(1)
  const [isNextPageBook, setIsNextPageBook] = useState(true)

  const getUsers = () => {

    console.log('User Page: ', currentPageUser)

    if (isNextPageUser) {

      setIsLoadingUser(true)
      searchUsers(search, currentPageUser)
        .then((res) => {

          let usersReceived = res?.docs
          setIsNextPageUser(res?.hasNextPage)
          console.log(`Have Next User Page: ${res?.hasNextPage ? 'Yes' : 'No'}`)

          if (usersReceived?.length > 0) {
            users.map((user) => {
              usersReceived = usersReceived.filter((u) => u._id !== user._id && u.status === 'A')
            })
            setUsers([...users, ...usersReceived])
          }
          setIsLoadingUser(false)
        })
        .catch((err) => {
          console.log('User search error: ', err)
          setIsLoadingUser(false)
        })

    }

  }

  const getBooks = () => {

    console.log('Book Page: ', currentPageBook)

    if (isNextPageBook) {

      setIsLoadingBook(true)
      searchBooks(search, currentPageBook)
        .then((res) => {

          let booksReceived = res?.docs

          setIsNextPageBook(res?.hasNextPage)
          console.log(`Have Next Book Page: ${res?.hasNextPage ? 'Yes' : 'No'}`)

          if (booksReceived?.length > 0) {
            books.map((book) => {
              booksReceived = booksReceived.filter((b) => b._id !== book._id && b.status === 'A')
            })
            setBooks([...books, ...booksReceived])
          }
          setIsLoadingBook(false)
        })
        .catch((err) => {
          console.log('Book search error: ', err)
          setIsLoadingBook(false)
        })

    }
  }

  const getPosts = () => {

    console.log('Post Page: ', currentPagePost)

    if (isNextPagePost) {

      setIsLoadingPost(true)
      searchHashtag(search)
        .then((res) => {
          if (res.length > 0) {
            let hashtags = res?.map((hashtag) => hashtag?._id)

            searchPostByHashtags(hashtags, currentPagePost)
              .then((res) => {
                let postsReceived = res?.docs

                setIsNextPagePost(res?.hasNextPage)
                console.log(`Have Next Post Page: ${res?.hasNextPage ? 'Yes' : 'No'}`)

                if (postsReceived?.length > 0) {
                  let pubs = postsReceived.map((element) => element?.post)
                  posts.map((post) => {
                    pubs = pubs.filter((p) => p?._id !== post?._id && p?.status === 'A')
                  })
                  setPosts([...posts, ...pubs])
                }
                setIsLoadingPost(false)
              })
              .catch((err) => {
                console.log('Post search error: ', err)
                setIsLoadingPost(false)
              })
          }
        })
        .catch((err) => {
          console.log('Hashtag search error: ', err)
        })

    }
  }

  const renderUserItem = ({ item }) => {
    return (
      <UserItem
        key={item._id}
        userItem={item}
        navigation={navigation}
      />
    )
  }

  const renderPostItem = ({ item }) => {
    return (
      <Post
        key={item._id}
        post={item}
        navigation={navigation}
      />
    )
  }

  const renderBookItem = ({ item }) => {
    return (
      <BookItem
        key={item._id}
        bookItem={item}
        navigation={navigation}
      />
    )
  }

  return (
    <Box maxH={layout.height} bg={COLORS.base}>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <VStack alignItems='center'>
        <Stack
          bgColor={COLORS.primary}
          alignItems='flex-start'
          w='100%'
          p={3}
          pl={6}
        >
          <Text bold fontSize='lg' color='white'>
            Descubre nuevos mundos...
          </Text>
        </Stack>
        <Stack bgColor={COLORS.primary} w='100%' alignItems='center' pb={3}>
          <StyledField
            placeholder='¿Qué estás buscando?'
            onChangeText={(text) => {
              setSearch(text)

              if (text !== '') {
                getUsers()
                getBooks()
                getPosts()
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
              )
            }
          />
        </Stack>
        {search !== '' ? (
          <View minH={layout.height}>
            <Tab
              value={index}
              onChange={setIndex}
              indicatorStyle={{
                backgroundColor: 'white',
                height: 4,
              }}
              scrollable
            >
              {tabs.map((tab, i) => (
                <Tab.Item
                  key={tab}
                  title={tab}
                  titleStyle={{ color: 'white' }}
                  containerStyle={{ backgroundColor: COLORS.primary }}
                />
              ))}
            </Tab>
            <TabView value={index} onChange={setIndex} animationType='spring'>
              <TabView.Item>
                <VStack p={2}>
                  {users?.length > 0 && (
                    <FoundCard
                      imageCard={userfound}
                      section={'Usuarios'}
                      index={setIndex}
                    />
                  )}
                  {books?.length > 0 && (
                    <FoundCard
                      imageCard={bookfound}
                      section={'Libros'}
                      index={setIndex}
                    />
                  )}
                  {posts?.length > 0 && (
                    <FoundCard
                      imageCard={postfound}
                      section={'Publicaciones'}
                      index={setIndex}
                    />
                  )}
                </VStack>
              </TabView.Item>

              <TabView.Item>
                <VStack h='77%' w={layout.width} p={2} bg={COLORS.base}>
                  <ScrollInfiniteItems
                    setData={setUsers}
                    data={users}
                    getData={getUsers}
                    renderItem={renderUserItem}
                    isLoading={isLoadingUser}
                    currentPage={currentPageUser}
                    setCurrentPage={setCurrentPageUser}
                    setIsNextPage={setIsNextPageUser}
                  />
                </VStack>
              </TabView.Item>

              <TabView.Item>
                <VStack h='77%' w={layout.width} p={2} bg={COLORS.base}>
                  <ScrollInfiniteItems
                    setData={setBooks}
                    data={books}
                    getData={getBooks}
                    renderItem={renderBookItem}
                    isLoading={isLoadingBook}
                    currentPage={currentPageBook}
                    setCurrentPage={setCurrentPageBook}
                    setIsNextPage={setIsNextPageBook}
                  />
                </VStack>
              </TabView.Item>

              <TabView.Item>
                <VStack
                  minH={layout.height}
                  minW={layout.width * 0.95}
                  pb={layout.height * 0.3}
                  mx={1}
                  mt={1}
                  space={1}
                  justifyContent='center'
                  alignItems='center'
                >
                  <ScrollInfiniteItems
                    setData={setPosts}
                    data={posts}
                    getData={getPosts}
                    renderItem={renderPostItem}
                    isLoading={isLoadingPost}
                    currentPage={currentPagePost}
                    setCurrentPage={setCurrentPagePost}
                    setIsNextPage={setIsNextPagePost}
                  />
                </VStack>
              </TabView.Item>
            </TabView>
          </View>
        ) : (
          <VStack alignContent='center' alignItems='center'>
            <Image source={Pana} alt='Pana' resizeMode='contain' size={400} />
            <Text bold textAlign='center' color={COLORS.primary}>
              Cuéntanos qué estás buscando para que te ayudemos a encontrarlo
            </Text>
          </VStack>
        )}
      </VStack>
    </Box >
  )
}

export default Search
