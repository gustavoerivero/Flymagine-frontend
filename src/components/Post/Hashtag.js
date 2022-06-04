import React from "react";
import { Avatar, Badge, Stack, HStack, Text, Divider } from "native-base";
import { TouchableOpacity, useWindowDimensions } from "react-native";

import COLORS from "../styled-components/Colors";
import useAuthContext from "../../hooks/useAuthContext";

const Hashtag = ({ navigation, hashtag = {} }) => {
  const layout = useWindowDimensions();
  const {
    state: { user },
  } = useAuthContext();

  return (
    <Stack>
      <TouchableOpacity
        key={hashtag._id}
      >
        <Badge size="xs" bgColor="rgba(223, 204, 255, .35)" rounded="full">
          <HStack space={1} alignItems='center'>
            <Text fontSize='xs' color='rgba(95, 0, 255, .55)'>
            {hashtag.name}
            </Text>
          </HStack>
        </Badge>
      </TouchableOpacity>
    </Stack>
  );
};

export default Hashtag;
