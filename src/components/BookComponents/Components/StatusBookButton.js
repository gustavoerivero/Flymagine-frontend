import React, { useCallback, useState, useEffect } from "react";

import {
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import {
  Box,
  Text,
  Button,
} from "native-base";

//Colors
import COLORS from "../../styled-components/Colors";

const StatusBookButton = ({buttonToRead, setButtonToRead, buttonReading, setButtonReading, buttonRead, setButtonRead}) => {
  //Colors
  const textActivated = COLORS.button.text;
  const textDisabled = COLORS.button.textDisabled;
  const icon = COLORS.button.icon;

  //Status Book
const [activated, setActivated] = useState(false)

  return (
    <Box>
      {buttonToRead && (
        <Button
          h="95%"
          variant="ghost"
          borderRadius="full"
          startIcon={
            <MaterialCommunityIcons name={activated ? "bookmark-check" : "bookmark"} size={15} color={activated ? textActivated : textDisabled} />
          }
          onPress={() => setActivated(!activated)}
        >
          <Text fontSize="md" bold color={ activated ? textActivated : textDisabled}>
            Por leer
          </Text>
        </Button>
      )}

      {buttonReading && (
        <Button
          h="95%"
          variant="ghost"
          borderRadius="full"
          startIcon={
            <MaterialCommunityIcons name="book-open-page-variant" size={15} color={icon} />
          }
          onPress={() => [setButtonReading(false), setButtonRead(true)]}
        >
          <Text fontSize="md" bold color={textActivated}>
            Leyendo...
          </Text>
        </Button>
      )}

      {buttonRead && (
        <Button
          h="95%"
          variant="unstyled"
          borderRadius="full"
          startIcon={
            <MaterialCommunityIcons name="sticker-check-outline" size={15} color={icon} />
          }
          alignItems="center"
        >
          <Text fontSize="md" bold color={textActivated}>
            Leído
          </Text>
        </Button>
      )}
    </Box>
  );
};

export default StatusBookButton;
