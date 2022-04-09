import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Image, Input, Button } from "react-native-elements";

import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FlymagineIcon from "../assets/favicon.png";
import { SearchBar } from "@rneui/themed";
import Bibliothecary from "../assets/images/Bibliothecary.jpg";
import Category from "../components/SearchComponents/Category";
import TrendingBooks from "../components/SearchComponents/TrendingBooks";
import { Link } from "@react-navigation/native";

const SearchPage = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const [category, setCategory] = useState([
    {
      key: "01",
      name: "Romance",
      image: "https://i.imgur.com/VzczxoS.jpg",
    },
    {
      key: "02",
      name: "Cuentos",
      image: "https://i.imgur.com/jmLrPrJ.jpg",
    },
    {
      key: "03",
      name: "Epicos",
      image: "https://i.imgur.com/Mi1lbj4.jpg",
    },
    {
      key: "04",
      name: "Narrativo",
      image: "https://i.imgur.com/H0XFU4j.jpg",
    },
    {
      key: "05",
      name: "Poesía",
      image: "https://i.imgur.com/XcRI0jb.jpg",
    },
    {
      key: "06",
      name: "Terror",
      image: "https://i.imgur.com/S9RVw7t.jpg",
    },
    {
      key: "07",
      name: "Periodístico",
      image: "https://i.imgur.com/Bs2LQIq.jpg",
    },
  ]);

  const [trend, setTrend] = useState([
    {
      key: "01",
      title: "Harry Potter: La Piedra Filosofal",
      autor: "J. K. Rowling",
      image:
        "https://static.wixstatic.com/media/133080_1eff8425790440ea8e9a7d781454e399~mv2.jpg/v1/fill/w_401,h_600,al_c,q_90/133080_1eff8425790440ea8e9a7d781454e399~mv2.jpg",
    },
    {
      key: "02",
      title: "Amor en tiempos de Covid",
      autor: "Stephen King",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lead-1586822345.jpg",
    },
    {
      key: "03",
      title: "Querido Death Note: Perdido en el Avila",
      autor: "José Rivero",
      image:
        "https://scontent-mia3-1.xx.fbcdn.net/v/t31.18172-8/11741209_10207468077165098_6391764828211030434_o.jpg?_nc_cat=104&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=Ty174j3xcNgAX86bL1p&_nc_oc=AQnC1CWmhCvx5YUG6pZpPXIIcRf5-EbtNFvRkGJjEAXj_RARJmVGv7jQ80dYOrXwX3M&_nc_ht=scontent-mia3-1.xx&oh=00_AT-fU_2xNpSFiaLNJujG84vOxiN28ybymtav6d9T8m5uBQ&oe=6276DE30",
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
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
          <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
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
                      <Category name={category.name} image={category.image} />
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
                    <TrendingBooks
                      imageCover={trend.image}
                      title={trend.title}
                      autor={trend.autor}
                    />
                  ))}
                </View>



                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", width: "95%", alignItems: 'center',}} >
                  <View style={{flex:1}}>
                    <Text style={{ flex:1, color: "black", fontSize: 25, fontWeight: "700", paddingLeft: 10, }} > Porque leiste: </Text>
                    <Text style={{ flex:1, color: "black", fontSize: 18, fontWeight: "500", paddingLeft: 10, fontStyle: 'italic'}} > Cocina facil con Elmo. </Text>
                  </View> 
                  <Button icon={<FontAwesome name="plus" color={"black"} size={20} />} buttonStyle={styles.button} containerStyle={{ borderRadius: 50 }} type="clear" />
                </View>
                <View style={{ height: 130, marginTop: 20, marginBottom: 20}}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {category?.map((category) => ( <Category name={category.name} image={category.image} /> ))}
                  </ScrollView>
                </View>

              </View>
            ) : (
              <View></View>
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
