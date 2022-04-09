import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image, Button } from "react-native-elements";
import Navegation from "../../Navegation";
import Book from "../../pages/MyBook";
import { useNavigation } from '@react-navigation/native';

const TrendingBooks = ({ title, autor, imageCover }) => {
  return (
    <View style={styles.card}>
      <Button
        icon={ <Image source={{uri: imageCover}} style={styles.image} /> }
        buttonStyle={{
          flex: 3,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
        containerStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "100%",
          height: 200,
        }}
        type="clear"
        onPress={() => Navegation.navigate(Book)}
      />

      <View style={{ flex: 1, marginTop: 5, }} >
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.autor}>
          {autor}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 14, color: "black", fontWeight: "700"
  },
  autor:{
    fontSize: 12,
    color: "black",
    fontWeight: "200",
    fontStyle: "italic",
  },
  card: {
    width: "95%",
    height: 250,
    marginHorizontal: 10,
    marginVertical: 5 
  },
});

export default TrendingBooks;
