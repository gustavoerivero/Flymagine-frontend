import React, {
  useState,
  useEffect
} from 'react'
import {
  Text,
  View
} from 'react-native'
import { ActivityIndicator } from 'react-native'

import axios from 'axios'

import Container from '../components/Container'

import Post from '../components/Post/Post'

const HomeView = () => {

  const [posts, setPosts] = useState(
    [
      {
        "id": "60d21b4667d0d8992e610c85",
        "image": "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
        "likes": 43,
        "comments": [],
        "tags": [
          "animal",
          "dog",
          "golden retriever"
        ],
        "text": "adult Labrador retriever",
        "publishDate": "2022-03-24T14:04:07.598Z",
        "owner": {
          "id": "60d0fe4f5311236168a109ca",
          "title": "ms",
          "firstName": "Sara",
          "lastName": "Andersen",
          "picture": "https://randomuser.me/api/portraits/women/58.jpg"
        }
      },
      {
        "id": "60d21b4967d0d8992e610c90",
        "image": "https://img.dummyapi.io/photo-1510414696678-2415ad8474aa.jpg",
        "likes": 31,
        "comments": [
          {
            "id": "60d21bf967d0d8992e610e9c",
            "text": "I like this photo",
            "publishDate": "2022-03-24T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "miss",
              "firstName": "Margarita",
              "lastName": "Vicente",
              "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"
            },
          },
          {
            "id": "60d21bf967d0d8992e610e9d",
            "text": "Wow! is awesome!",
            "publishDate": "2022-04-02T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "mr",
              "firstName": "Pedro",
              "lastName": "Pérez",
              "picture": "https://randomuser.me/api/portraits/med/"
            },
          },
          {
            "id": "60d21bf967d0d8992e610e9d",
            "text": "I don't belive this is a photo",
            "publishDate": "2022-01-02T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "miss",
              "firstName": "Yajaira",
              "lastName": "Valeria",
              "picture": "https://randomuser.me/api/portraits/med/"
            },
          }
        ],
        "tags": [
          "snow",
          "ice",
          "mountain"
        ],
        "text": "ice caves in the wild landscape photo of ice near ...",
        "publishDate": "2022-03-24T07:44:17.738Z",
        "owner": {
          "id": "60d0fe4f5311236168a10a0b",
          "title": "miss",
          "firstName": "Margarita",
          "lastName": "Vicente",
          "picture": "https://randomuser.me/api/portraits/med/women/5.jpg"
        }
      },
      {
        "id": "60d21b8667d0d8992e610d3f",
        "image": "https://img.dummyapi.io/photo-1515376721779-7db6951da88d.jpg",
        "likes": 16,
        "comments": [
          {
            "id": "60d21bf967d0d8992e610e9c",
            "text": "I like this photo",
            "publishDate": "2022-03-24T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "miss",
              "firstName": "Margarita",
              "lastName": "Vicente",
              "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"
            },
          },
          {
            "id": "60d21bf967d0d8992e610e9d",
            "text": "Wow! so pretty!",
            "publishDate": "2022-04-02T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "mr",
              "firstName": "Sebastian",
              "lastName": "Krause",
              "picture": "https://randomuser.me/api/portraits/med/"
            },
          }
        ],
        "tags": [
          "dog",
          "pet",
          "canine"
        ],
        "text": "@adventure.yuki frozen grass short-coated black do...",
        "publishDate": "2022-02-24T05:44:55.297Z",
        "owner": {
          "id": "60d0fe4f5311236168a109ed",
          "title": "miss",
          "firstName": "Kayla",
          "lastName": "Bredesen",
          "picture": "https://randomuser.me/api/portraits/med/women/13.jpg"
        }
      },
      {
        "id": "60d21b3a67d0d8992e610c60",
        "image": "https://img.dummyapi.io/photo-1581804928342-4e3405e39c91.jpg",
        "likes": 7,
        "comments": [
            {
              "id": "60d21bf967d0d8992e610e9d",
              "text": "I don't belive this is a photo",
              "publishDate": "2022-01-02T07:44:55.297Z",
              "owner": {
                "id": "60d0fe4f5311236168a10a0b",
                "title": "miss",
                "firstName": "Yajaira",
                "lastName": "Valeria",
                "picture": "https://randomuser.me/api/portraits/med/"
              }
          },          
        ],
        "tags": [
          "canine",
          "pet",
          "mammal"
        ],
        "text": "Hiking with my dog in the woods. black labrador re...",
        "publishDate": "2022-01-23T22:56:11.424Z",
        "owner": {
          "id": "60d0fe4f5311236168a109d5",
          "title": "mrs",
          "firstName": "Sibylle",
          "lastName": "Leibold",
          "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"
        }
      },
      {
        "id": "60d21bf967d0d8992e610e9b",
        "image": "https://img.dummyapi.io/photo-1574457547512-5b1646994eea.jpg",
        "likes": 28,
        "comments": [
          {
            "id": "60d21bf967d0d8992e610e9c",
            "text": "I like this photo",
            "publishDate": "2022-03-24T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "miss",
              "firstName": "Margarita",
              "lastName": "Vicente",
              "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"
            },
          },
          {
            "id": "60d21bf967d0d8992e610e9d",
            "text": "Wow! so pretty!",
            "publishDate": "2022-04-02T07:44:55.297Z",
            "owner": {
              "id": "60d0fe4f5311236168a10a0b",
              "title": "mr",
              "firstName": "Sebastian",
              "lastName": "Krause",
              "picture": "https://randomuser.me/api/portraits/med/"
            },
          }
        ],
        "tags": [
          "dog",
          "human",
          "animal"
        ],
        "text": "Two boys hug their dogs in a leaf pile in the fall...",
        "publishDate": "2022-01-23T18:52:32.613Z",
        "owner": {
          "id": "60d0fe4f5311236168a109f7",
          "title": "mrs",
          "firstName": "Jolanda",
          "lastName": "Lacroix",
          "picture": "https://randomuser.me/api/portraits/med/women/32.jpg"
        }
      }
    ]
  )

  return (
    <Container>
      <View>
        {posts?.map((post) => (
          <Post
            key={post.id}
            author={post.owner.firstName + ' ' + post.owner.lastName}
            avatar={post.owner.picture}
            image={post.image}
            description={post.text}
            date={post.publishDate}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </View>
    </Container>
  )
}

export default HomeView