import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image, Button } from "react-native-elements";
import COLORS from "../styled-components/Colors";
import stylesMiniCard from "../styled-components/MiniCardStyles";

const MiniCard = (props) => {

  const styles = stylesMiniCard;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.name}</Text>
      </View>

      <Image source={props.image} />
    </View>
  );
};

export default MiniCard;
