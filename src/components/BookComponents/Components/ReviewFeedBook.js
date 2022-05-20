import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

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
  Image,
} from "native-base";

//image
import newplanet from "../../../../assets/new-planet.png";
import planet from "../../../../assets/planet.png";

//Components
import Review from "../../Post/Review";

//Data

//Colors
import COLORS from "../../styled-components/Colors";

const ReviewFeedBook = ({ navigation, bookInfo, reviewData }) => {
  const [index, setIndex] = React.useState(0);

  //const Navegation = useNavigation();
  //const [reviews, setReviews] = useState([]);
  // const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {}, []);

  return (
    <Box p="2" h="93%" w='100%' bg={COLORS.gray0} justifyContent='center' alignItems='center'>
      {reviewData.length > 0 && reviewData ? (
        reviewData?.map((reviewData, id) => (
          <ScrollView>
            <Stack>
              <Review navigation={navigation} review={reviewData} />
            </Stack>
          </ScrollView>
        ))
      ) : (
        <VStack justifyContent="center" alignItems="center">
          <Image
            size={150}
            resizeMode={"cover"}
            source={planet}
            alt="New-Planet-Found"
            opacity="1"
          />
          <Text
            bold
            fontSize="20"
            color={COLORS.primary}
            textAlign="center"
            mv="5"
          >
            ¡Oh! Un mundo no explorado aún
          </Text>
          <Text fontSize="15" color={COLORS.primary} textAlign="center" mv="5">
            Parece que no hay reviews de este libro
          </Text>
        </VStack>
      )}
    </Box>
  );
};

export default ReviewFeedBook;
