import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, Button } from "react-native-elements";
import Book from "../../pages/Book";
import { useNavigation } from "@react-navigation/native";

//Colors
import COLORS from "../styled-components/Colors";

const BooksCard = (props) => {
  const Navegation = useNavigation();

  return (
    <View style={styles.cardContainer}>
       <Image source={{ uri: props.imageCover }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.autor}>{props.autor}</Text>
      </View>     
    </View>
  );
};

const radius = 10;
const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    height: 250,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: COLORS.secundary,
    borderColor: 'transparent',
    borderRadius: radius,
    shadowColor: COLORS.gray5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "700",
  },
  autor: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.7,
    fontWeight: "200",
    fontStyle: "italic",
  },
});

export default BooksCard;
