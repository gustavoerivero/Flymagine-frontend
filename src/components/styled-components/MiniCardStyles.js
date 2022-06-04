import { StyleSheet } from "react-native";
import COLORS from "./Colors";

const radius = 10;
const stylesMiniCard = StyleSheet.create({
  cardContainer: {
    height: 130,
    width: 130,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'transparent',
    borderRadius: radius,
    backgroundColor: COLORS.secundary,
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
    width: 130,
    height: 95,
    resizeMode: "cover",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default stylesMiniCard;