import React, { useState, useCallback } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Box,
  VStack,
  HStack,
  Stack,
  Text,
  Avatar,
  Button,
  Icon,
  Divider
} from "native-base";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";

import useAuthContext from "../../hooks/useAuthContext";
import { setFollowsByUser, getFollows } from "../../services/user/userAPI";
import COLORS from "../../components/styled-components/Colors";

const UserItem = ({ userItem, navigation }) => {
  const layout = useWindowDimensions();

  const {
    state: { user },
  } = useAuthContext();

  const [isFollow, setIsFollow] = useState(false);
  const [follows, setFollows] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getFollows(user?.id)
        .then((res) => {
          setFollows(res?.Data?.follows);

          if (follows?.find((f) => f._id === userItem._id)) {
            setIsFollow(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [follows])
  );

  const handleFollow = async () => {
    let newFollows = [...follows];

    if (isFollow) {
      newFollows = newFollows.filter((f) => f._id !== userItem?._id);
      setIsFollow(false);
    } else {
      newFollows.push(userItem);
      setIsFollow(true);
    }

    await setFollowsByUser(user.id, newFollows)
      .then((res) => {
        console.log(res);
        setFollows(res?.Data?.follows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate("UserProfile", { user: userItem?._id });
      }}
    >
      <Box
        mb={2}
        w="100%"
        h={layout.height * 0.1}
        alignItems="center"
        alignContent="center"
        alignSelf="center"
        justifyContent="center"
        borderRadius="lg" bg={COLORS.secundary} shadow={1}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          w="98%"
          h="95%"
        >
          <Stack w="17%" h="100%" justifyContent="center">
            <Avatar
              bg="purple.600"
              size="lg"
              source={{
                uri: userItem?.photo === "none" ? null : userItem?.photo,
              }}
              borderColor="white"
              borderWidth={3}
            >
              {userItem && userItem?.firstName[0] + userItem?.lastName[0]}
            </Avatar>
          </Stack>

          <VStack w="55%" h="90%" alignItems="center">
            <HStack w="90%" h="35%" alignItems="center">
              <Text bold fontSize="sm" w="70%">
                {userItem?.firstName} {userItem?.lastName}
              </Text>
              <HStack space={2} alignItems="center" w="30%" h="100%">
              <Icon
              w="10%"
                as={
                  userItem?.idRole?._id === "626aef37b4a9510568d6036d"
                    ? FontAwesome5
                    : AntDesign
                }
                name={
                  userItem?.idRole?._id === "626aef37b4a9510568d6036d"
                    ? "book-reader"
                    : "edit"
                }
              />
              <Text w="90%" fontSize="xs" color={"purple.600"} italic>
                {userItem?.idRole?._id === "626aef37b4a9510568d6036d"
                  ? "Lector"
                  : "Escritor"}
              </Text>
            </HStack>
            </HStack>
            <Divider opacity={0.5} w="95%" my={0.5}/>
            <HStack space={2} w="95%" h="63%">
              <Icon w="10%" mr={1} mt={0.5} as={MaterialIcons} name="history-edu" />
              <Text w="90%" fontSize="xs" alignContent="center">
                {userItem?.biography?.length > 22
                  ? userItem?.biography?.substring(0, 60 - 3) + "..."
                  : userItem?.biography}
              </Text>
            </HStack>
          </VStack>

          <Stack w="27%" h="100%" alignItems="center" justifyContent="center">
            {user?.id !== userItem?._id && (
              <Button
                w="95%"
                size="xs"
                variant="outline"
                height={layout.height * 0.04}
                borderRadius={50}
                onPress={() => {
                  console.log(isFollow ? "unfollow" : "follow");
                  handleFollow();
                }}
              >
                <Text fontSize={10} color={COLORS.primary}>
                  {isFollow ? "Dejar de seguir" : "Seguir"}
                </Text>
              </Button>
            )}
          </Stack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default UserItem;
