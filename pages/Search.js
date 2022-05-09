import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity
} from "react-native";

import { Image, Input, Button } from "react-native-elements";

import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FlymagineIcon from "../assets/favicon.png";

import { SearchBar } from "react-native-elements";
import MiniCard from "../components/SearchComponents/MiniCard";
import BooksCard from "../components/SearchComponents/BooksCard";

import ListSearchBook from "../components/ListSearchBook";
import dataBooks from "../utilities/data/books";
import dataCategory from "../utilities/data/category";
import dataTrending from "../utilities/data/trendingBooks";

import {useNavigation} from "@react-navigation/native";

//Pages
import Book from "./Book";

//Components
import StatusBar from "../components/StatusBar";

//Colors
import COLORS from "../components/styled-components/Colors";

//Styles
import stylesSearch from "../components/styled-components/stylesSearch";

const Search = () => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  const [books, setBooks] = useState(dataBooks);

  const [category, setCategory] = useState(dataCategory);

  const [trend, setTrend] = useState(dataTrending);

  const styles = stylesSearch;

  
  const navegation = useNavigation();

  return (
    <View style={stylesSearch.container}>
      <StatusBar />
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <SearchBar
            placeholderTextColor={COLORS.gray0}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.label}
            inputContainerStyle={styles.inputContainer}
            platform="android"
            placeholder="Busca libros, historias y más..."
            onChangeText={updateSearch}
            value={search}
            //              searchIcon={{color: COLORS.secundary}}
          />
        </View>

        <View /* - - Contenido - - */>
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {search.length === 0 ? (
              /* - - Categorias Scroll - - */
              <View>
                <View style={styles.titleSectionPlus}>
                  <Text style={styles.title}>Nuestras Categorias</Text>
                </View>

                <View style={{ height: 140, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {category?.map((category) => (
                      <MiniCard name={category.name} image={category.image} />
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.titleSection}>
                  <Text style={styles.title}>Tendencia</Text>
                  <Text style={styles.description}>
                    Los tres libros más descargados esta semana, ¿Alguno te
                    gusta?
                  </Text>
                </View>

                <View>
                  {trend?.map((trend) => (
                    <TouchableOpacity onPress={() => navegation.navigate(Book)} activeOpacity={0.75}>
                      <BooksCard
                        imageCover={trend.image}
                        title={trend.title}
                        autor={trend.autor}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.titleSectionPlus}>
                  <Text style={styles.title}> Porque leíste: </Text>
                  <Text style={styles.name}>Cocina facil con Elmo.</Text>
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

export default Search;
