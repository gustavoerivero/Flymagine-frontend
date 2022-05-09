import { StyleSheet } from "react-native";
import COLORS from "./Colors";

const stylesSearch = StyleSheet.create({
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
    backgroundColor: COLORS.base,
    paddingBottom: "14%",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  titleSectionPlus: {
    flex: 1,
    //flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  titleSection: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 30,
    color: COLORS.secundary,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  description: {
    color: COLORS.gray3,
    fontWeight: "100",
    marginTop: 10,
  },
  name: {
    flex: 1,
    color: COLORS.gray3,
    fontSize: 15,
    fontWeight: "200",
    paddingLeft: 5,
    fontStyle: "italic",
  },
  image: {
    height: 70,
    width: 70,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 50,
    //paddingRight: 20
  },

  searchBarContainer: {
    width: "95%",
    backgroundColor: "transparent",
    marginTop: 5,
  },
  label: {
    color: COLORS.gray3,
  },
  inputContainer: {
    backgroundColor: COLORS.secundary,
    borderRadius: 20,
    shadowColor: COLORS.gray5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  bookCard:{
    backgroundColor: 'transparent',
  }
});

export default stylesSearch;
