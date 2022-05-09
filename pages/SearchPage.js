import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Image, Input, Button } from "react-native-elements";

import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FlymagineIcon from "../assets/favicon.png";
import { SearchBar } from "@rneui/themed";
import MiniCard from "../components/SearchComponents/MiniCard";
import BooksCard from "../components/SearchComponents/BooksCard";

import ListSearchBook from "../components/ListSearchBook";
import dataBooks from "../utilities/data/books";
import dataCategory from "../utilities/data/category";
import dataTrending from "../utilities/data/trendingBooks";
import { useNavigation } from "@react-navigation/native";


const SearchPage = () => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  const [books, setBooks] = useState(dataBooks);

  const [category, setCategory] = useState(dataCategory);

  const [trend, setTrend] = useState(dataTrending);

  const nav = useNavigation();

  useEffect(()=>{
    nav.setOptions({
      fontSize:40,
      color: 'blue',
    }
    )
  }, [nav])

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={styles.title}>Descubre</Text>
              <Text style={styles.subtitle}>nuevos mundos...</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={FlymagineIcon} style={styles.image} />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Input
              placeholderTextColor="#ccc"
              underlineColorAndroid={"transparent"}
              autoCapitalize="none"
              containerStyle={styles.input}
              inputStyle={styles.label}
              placeholder="Busca libros, historias y más..."
              onChangeText={updateSearch}
              value={search}
            />
          </View>
        </View>

        <View>
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {search.length === 0 ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontWeight: "700",
                      paddingLeft: 10,
                    }}
                  >
                    Nuestras Categorias
                  </Text>
                  <Button
                    icon={<FontAwesome name="plus" color={"black"} size={20} />}
                    buttonStyle={styles.button}
                    containerStyle={{ borderRadius: 50 }}
                    type="clear"
                  />
                </View>

                <View style={{ height: 130, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {category?.map((category) => (
                      <MiniCard name={category.name} image={category.image} />
                    ))}
                  </ScrollView>
                </View>

                <View
                  style={{
                    marginTop: 30,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 25, fontWeight: "700" }}
                  >
                    Tendencia
                  </Text>
                  <Text
                    style={{ color: "black", fontWeight: "100", marginTop: 10 }}
                  >
                    Los tres libros más descargados esta semana, ¿Alguno te
                    gusta?
                  </Text>
                </View>

                <View>
                  {trend?.map((trend) => (
                    <BooksCard
                      imageCover={trend.image}
                      title={trend.title}
                      autor={trend.autor}
                    />
                  ))}
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        flex: 1,
                        color: "black",
                        fontSize: 25,
                        fontWeight: "700",
                        paddingLeft: 10,
                      }}
                    >
                      {" "}
                      Porque leiste:{" "}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: "black",
                        fontSize: 18,
                        fontWeight: "500",
                        paddingLeft: 10,
                        fontStyle: "italic",
                      }}
                    >
                      {" "}
                      Cocina facil con Elmo.{" "}
                    </Text>
                  </View>
                  <Button
                    icon={<FontAwesome name="plus" color={"black"} size={20} />}
                    buttonStyle={styles.button}
                    containerStyle={{ borderRadius: 50 }}
                    type="clear"
                  />
                </View>
                <View style={{ height: 130, marginTop: 20, marginBottom: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {category?.map((category) => (
                      <MiniCard name={category.name} image={category.image} />
                    ))}
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View>
                {books?.map((Book) => (
                  <ListSearchBook
                    key={Book.id}
                    name={Book.book.name}
                    image={Book.book.picture}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "center",
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#FFFF",
  },
  statusbar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 35,
    width: "100%",
    backgroundColor: "rgba(134, 48, 197, 1)",
  },
  header: {
    paddingTop: "5%",
    flex: 1,
    backgroundColor: "rgba(134, 48, 197, 1)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: "30%",
    borderBottomColor: "rgba(134, 48, 197, .75)",
    borderBottomWidth: 1,
    shadowColor: "rgba(134, 48, 197, .5)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  image: {
    height: 70,
    width: 70,
  },
  searchbar: {},

  input: {
    padding: 5,
    height: 50,
    backgroundColor: "rgba(40, 10, 57, .5)",
    width: "95%",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  label: {
    color: "white",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 50,
    //paddingRight: 20
  },
});

export default SearchPage;
