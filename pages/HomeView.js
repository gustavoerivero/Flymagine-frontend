import React, {
  useState,
} from 'react'
import {
  ScrollView,
  Text,
} from 'react-native'

//Components
import StatusBar from "../components/StatusBar";
import Container from '../components/Container'
import Post from '../components/Post/Post'

//Data
import dataPosts from '../utilities/data/posts'

const HomeView = ({ params }) => {

  const [signIn, setSignIn] = useState('Adam Meddler')

  const [posts, setPosts] = useState(dataPosts || [])

  return (
    <Container>
 <StatusBar />
      <ScrollView>
        {posts.length > 0 && posts ? posts?.map((post, id) => (
          <Post
            key={post.id}
            signIn={signIn}
            author={post.owner.firstName + ' ' + post.owner.lastName}
            avatar={post.owner.picture}
            image={post.image}
            description={post.text}
            date={post.publishDate}
            likes={post.likes}
            comments={post.comments}
            tags={post.tags}
            personTags={post.personTags}
            id={id}
            posts={posts}
            setPosts={setPosts}
          />
        )) :
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(110, 45, 220, .5)',
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            No hay publicaciones disponibles en este momento...
          </Text>
        }
      </ScrollView>
    </Container>
  )
}

export default HomeView