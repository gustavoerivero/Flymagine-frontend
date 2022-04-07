import React, {
  useState,
} from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native'
import {
  Divider
} from 'react-native-elements'

import CommentPost from '../components/Post/CommentPost'
import Comment from '../components/Post/Comment'
import CommentInput from '../components/Post/CommentInput'

const CommentPage = ({ route }) => {

  const [props, setProps] = useState(route.params.props)

  return (
    <ScrollView>
      <View style={styles.container}>
        <CommentPost
          props={props}
        />
        <View style={styles.baseComment}>
          <View style={styles.comments}>
            <Divider
              orientation='vertical'
              style={{
                paddingLeft: '2%',
                marginLeft: '10%'
              }}
              width={2}
            />
            <View style={styles.commentStyle}>
              {props.comments.map((comment, index) => {
                return (
                  <Comment
                    key={index}
                    props={comment}
                    signIn={props.signIn}
                  />
                )
              })}
            </View>
          </View>
          <Divider 
            style={{
              marginBottom: '1%',
            }}
          />
          <View style={styles.commentInput}>
            <CommentInput />
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comments: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'center',
  },
  commentStyle: {
    marginRight: '37%',
    marginLeft: '2%',
  },
  baseComment: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  commentInput: {
    display: 'flex',
    backgroundColor: '#fff',
    marginLeft: '15%',
    marginRight: '15%',
  },
})

export default CommentPage