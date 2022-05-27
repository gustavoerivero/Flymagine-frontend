import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Tab, TabView, AirbnbRating } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  MaterialIcons,
  Entypo,
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import {
    Avatar,
    Box,
    Text,
    VStack,
    FormControl,
    Icon,
    WarningOutlineIcon,
    HStack,
    FlatList,
    Badge,
  } from 'native-base'

//Image
import BookImage from "../../../assets/book.jpg";

//Components
import Review from "../../components/Post/Review";

//Data
import dataReviews from "../../utilities/data/reviews";

//Colors
import COLORS from "../../components/styled-components/Colors";

//Styles
import stylesProfile from "../../components/styled-components/stylesProfile";
import stylesBook from "../../components/styled-components/stylesBook";

const Book = (props) => {
  const [index, setIndex] = React.useState(0);

  const Navegation = useNavigation();

  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShow2, setShouldShow2] = useState(true);
  const [shouldShow3, setShouldShow3] = useState(true);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [show, setShow] = useState(true);

  const [signIn, setSignIn] = useState("Adam Meddler");

  const [reviews, setReviews] = useState(dataReviews || []);

  return (
    <View style={[stylesBook.container]}>
      <View style={stylesBook.bookDetailsContainer}>
        <Image
          source={BookImage}
          style={stylesBook.image}
          resizeMode="stretch"
        />
        <View style={stylesBook.bookDetails}>
          <View style={stylesBook.detailLine}>
            <Text style={[stylesBook.detailText, {fontSize: 20, fontWeight:"700", marginLeft: 0}]}>
              Nombre del libro dasda adsda sdas sadas 
            </Text>
          </View>
          <View style={stylesBook.detailLine}>
            <Ionicons name="person" size={12} color={COLORS.base} />
            <Text style={stylesBook.detailText}>
              Autor del libro:
            </Text>
          </View>
          <View style={stylesBook.detailLine}>
            <MaterialIcons name="description" size={12} color="black" />
            <Text style={{ marginLeft: 5, marginBottom: 2.5 }}>Sinopsis:</Text>
          </View>
          <View style={stylesBook.detailLine}>
            <Entypo name="book" size={12} color="black" />
            <Text style={stylesBook.detailLine}>Géneros:</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={stylesBook.buttonF}
          activeOpacity={0.85}
          onPress={() => setShow(!show)}
        >
          <MaterialIcons
            name="favorite"
            size={20}
            color={show ? "white" : "red"}
          />
        </TouchableOpacity>

        {shouldShow2 ? (
          <TouchableOpacity
            style={stylesBook.buttonD}
            onPress={() => [
              setShouldShow(true),
              setShouldShow2(false),
              setShouldShow3(true),
              setShouldShow4(false),
            ]}
          >
            <AntDesign name="pdffile1" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        {shouldShow ? (
          <TouchableOpacity
            style={stylesBook.buttonT}
            activeOpacity={0.85}
            onPress={() => [
              setShouldShow(false),
              setShouldShow2(true),
              setShouldShow3(false),
              setShouldShow4(false),
            ]}
          >
            <Ionicons name="time" size={15} color="white" />
            <Text style={stylesBook.textButton}>Por leer</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
        {shouldShow3 ? (
          <TouchableOpacity
            style={stylesBook.buttonT}
            activeOpacity={0.85}
            onPress={() => [
              setShouldShow(true),
              setShouldShow2(true),
              setShouldShow3(false),
              setShouldShow4(true),
            ]}
          >
            <Ionicons name="checkmark-done-sharp" size={15} color="white" />
            <Text style={stylesBook.textButton}>Leído</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
      {shouldShow4 ? (
        <TouchableOpacity style={stylesBook.buttonT} activeOpacity={0.85}>
          <FontAwesome
            name="pencil-square-o"
            size={15}
            color="white"
            style={{ marginLeft: 2 }}
          />
          <Text style={stylesBook.textButton}>Escribir review</Text>
        </TouchableOpacity>
      ) : (
        false
      )}
      <View style={{ alignSelf: "flex-start", marginBottom: 5 }}>
        <AirbnbRating count={5} showRating={false} size={15} />
      </View>
      <Tab
        indicatorStyle={{
          backgroundColor: "black",
          height: 3,
        }}
      >
        <Tab.Item
          title="Review"
          titleStyle={stylesBook.text}
          containerStyle={stylesBook.itemContainer}
          icon={
            <MaterialCommunityIcons
              name="comment-text-multiple-outline"
              size={24}
              color={COLORS.base}
            />
          }
        />
      </Tab>

      <TabView>
        <TabView.Item style={{ backgroundColor: "#fff", width: "100%" }}>
          <ScrollView>
            {reviews.length > 0 && reviews ? (
              reviews?.map((review, id) => (
                <Review
                  key={review.id}
                  signIn={signIn}
                  author={review.owner.firstName + " " + review.owner.lastName}
                  avatar={review.owner.picture}
                  image={review.image}
                  description={review.text}
                  date={review.publishDate}
                  likes={review.likes}
                  comments={review.comments}
                  tags={review.tags}
                  personTags={review.personTags}
                  id={id}
                  rating={review.rating}
                  posts={reviews}
                  setPosts={setReviews}
                />
              ))
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(110, 45, 220, .5)",
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                No hay reviews disponibles en este momento...
              </Text>
            )}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Book;
