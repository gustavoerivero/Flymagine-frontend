import React, {useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
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
  Stack,
  Button,
  IconButton,
  Image,
} from "native-base";

import { useFocusEffect } from '@react-navigation/native'

//Image
import BookImage from "../../../assets/book.jpg";

//Components
import Review from "../../components/Post/Review";

//Data
import dataReviews from "../../utilities/data/reviews";
import { getBookById } from "../../services/book/bookAPI";
import { getAllLiteraryGenre } from "../../services/literaryGenre/literaryGenre";
import { getUserById } from "../../services/user/userAPI";

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

  const [bookInfo, setBookInfo] = useState(null);

  const [literaryGenres, setLiteraryGenres] = useState([]);

  const [author, setAuthor] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getBookById(`627420031a320782986aaa3c`)
      .then((res) => { 
        setBookInfo(res)
        console.log("Book:", bookInfo)
      })
      .catch((err) => {
        console.log(err)
      })
      if (bookInfo){
        getUserById(bookInfo?.idUser)
        .then((res) => {
          setAuthor(res?.Data)
          console.log("Author", res)
        })
        .catch((error) => {
          console.log(error)
        })
      }

    getAllLiteraryGenre()
      .then((response) => {
        setLiteraryGenres(response)
      })
      .catch((error) => {
        console.log(error)
        showErrorToast("Error al agregar los géneros literarios")
      })
      console.log(bookInfo?.photo)
    }, []))

  return (
    <View style={[stylesBook.container]}>
      <Box h="65%" bg={COLORS.primary} shadow={"5"}>
        <HStack h="46%">
          <VStack w="40%" justifyContent="center" alignItems="center">
            <Image
              source={{uri: bookInfo?.photo}}
              style={stylesBook.image}
              alt='post'
            />
          </VStack>

          <VStack w="60%" px={1} justifyContent="center">
            <HStack h="40%">
              <Text fontSize="xl" bold color={COLORS.base}>
                {bookInfo && bookInfo?.name}
              </Text>
            </HStack>

            <HStack alignItems="center" pt={1} h="10%">
              <Ionicons name="person" color={COLORS.base} />
              {author && (
                <Text fontSize="sm" color={COLORS.base} pl={1}>
              {author && (author?.lastName[0] +'. '+ author?.firstName)}
              </Text>
              )}
            </HStack>

            <HStack alignItems="center" pt={1} h="10%">
              <Entypo name="book" color={COLORS.base} />
              <Text fontSize="sm" color={COLORS.base} pl={1}>
                Géneros: {bookInfo && bookInfo?.geners}
              </Text>
            </HStack>

            <HStack my={2} h="15%">
              <Box>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={literaryGenres}
                  keyExtractor={(item) => item?._id}
                  ItemSeparatorComponent={() => <Box w={1} />}
                  renderItem={({ item }) => (
                    <Badge
                      colorScheme="success"
                      style={{
                        borderRadius: 30,
                        backgroundColor: COLORS.button.secundaryDisabled,
                      }}
                    >
                      <Text color={COLORS.base}>{item?.name}</Text>
                    </Badge>
                  )}
                />
              </Box>
            </HStack>

            <HStack h="10%">
              <AirbnbRating count={5} showRating={false} size={16} />
            </HStack>
          </VStack>
        </HStack>

        <HStack h="32%" justifyContent="center">
          <VStack w="95%">
            <HStack alignItems="center" my={1}>
              <MaterialIcons name="description" size={12} color={COLORS.base} />
              <Text fontSize="sm" bold color={COLORS.base} pl={1}>
                Sinopsis:
              </Text>
            </HStack>

            <Text fontSize="sm" color={COLORS.base} pl={1}>
              {bookInfo && bookInfo?.sypnosis}
            </Text>
          </VStack>
        </HStack>

        <HStack h="22%" justifyContent="center">
          <VStack justifyContent="space-around">
            <HStack justifyContent="space-around" h="50%" alignItems="center">
              <Button
                h="95%"
                w="80%"
                colorScheme={COLORS.button.secundary}
                endIcon={
                  <Icon
                    as={Ionicons}
                    name="cloud-download-outline"
                    size="md"
                    color={COLORS.button.icon}
                  />
                }
                borderRadius="full"
              >
                <Text fontSize="md" bold color={COLORS.base}>
                  Descargar libro
                </Text>
              </Button>
              <IconButton
                h="95%"
                w="15%"
                alignItems="center"
                justifyContent="center"
                icon={
                  <MaterialIcons
                    name="favorite"
                    size={20}
                    color={show ? COLORS.base : "red"}
                  />
                }
                borderRadius="100"
                activeOpacity={0.85}
                onPress={() => setShow(!show)}
              />
            </HStack>

            <HStack justifyContent="space-between" h="50%" alignItems="center">
              <Button
                h="95%"
                variant="ghost"
                colorScheme={COLORS.button.secundary}
                borderRadius="full"
                startIcon={
                  <Ionicons name="time" size={15} color={COLORS.base} />
                }
              >
                <Text fontSize="md" bold color={COLORS.base}>
                  Leer más tarde
                </Text>
              </Button>

              <Button
                h="95%"
                variant="ghost"
                colorScheme={COLORS.button.secundary}
                borderRadius="full"
                startIcon={
                  <Ionicons
                    name="checkmark-done-sharp"
                    size={15}
                    color={COLORS.base}
                  />
                }
              >
                <Text fontSize="md" bold color={COLORS.base}>
                  Leído
                </Text>
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </View>
  );
};

export default Book;
