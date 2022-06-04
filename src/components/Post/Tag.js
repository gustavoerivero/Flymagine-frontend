import React from "react";
import { Avatar, Badge, Stack, HStack, Text, Divider } from "native-base";
import { TouchableOpacity, useWindowDimensions } from "react-native";

import COLORS from "../styled-components/Colors";
import useAuthContext from "../../hooks/useAuthContext";

const Tag = ({ navigation, tag = {} }) => {
  const layout = useWindowDimensions();
  const {
    state: { user },
  } = useAuthContext();

  return (
    <Stack>
      <TouchableOpacity
        key={tag._id}
        onPress={() => {
          if (tag?._id === user?.id) {
            navigation.navigate("Profile");
          } else {
            navigation.navigate("UserProfile", {
              user: tag._id,
            });
          }
        }}
      >
        <Badge size="xs" bgColor="rgba(223, 204, 255, .35)" rounded="full">
          <HStack space={1} alignItems='center'>
            <Avatar
              bg="purple.600"
              size={5}
              source={{
                uri: tag?.photo === "none" ? null : tag?.photo,
              }}
              borderColor="white"
              borderWidth={1}
            >
                <Text fontSize={10} color='white'>
                {tag && tag?.firstName[0]}
                </Text>
            </Avatar>
            <Text fontSize='xs' color='rgba(95, 0, 255, .55)'>
              {tag.firstName + " " + tag.lastName}
            </Text>
          </HStack>
        </Badge>
      </TouchableOpacity>
    </Stack>
  );
};

export default Tag;
