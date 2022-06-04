import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { AirbnbRating } from "react-native-elements";

import {
  AlertDialog,
  Button,
  Avatar,
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Icon,
} from "native-base";

import { parseDate, parseTime } from "../../../utilities/Parsers";
import { previousFourteenHours } from "../../../utils/functions";

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import useAuthContext from "../../../hooks/useAuthContext";
import useCustomToast from "../../../hooks/useCustomToast";
import { getUserById, getOnlyUser } from "../../../services/user/userAPI";
import { getReviewById, deleteReview } from "../../../services/post/reviewAPI";
import {
  postReactionsByReview,
  getReactionsByReview,
} from "../../../services/post/reactionAPI";
import { getComments } from "../../../services/comments/commentReviewAPI";

import EditReviewModal from "../../Post/EditReviewModal";

//Colors
import COLORS from "../../styled-components/Colors";

const ReviewItem = ({ navigation, dataReview = {} }) => {
  const {
    state: { user },
  } = useAuthContext();

  const layout = useWindowDimensions();

  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [userLogged, setUserLogged] = useState(null);
  const [userReview, setUserReview] = useState(null);

  const [review, setReview] = useState(dataReview);
  const [book, setBook] = useState(dataReview?.idBook);
  const [showModal, setShowModal] = useState(false)

  const [isLiked, setIsLiked] = useState(false);
  const [reviewReactionInfo, setReviewReactionInfo] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(null);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const deleteReviewById = async () => {
    try {
      console.log(review);
      const data = await deleteReview(review?._id);
      console.log(data);
      showSuccessToast("Publicación eliminada con éxito");
    } catch (error) {
      console.log(error);
    }
  };

  const likeReview = async () => {
    try {
      const newValue = reviewReactionInfo;
      if (newValue?.find((value) => userLogged._id === value?._id)) {
        newValue?.splice(
          newValue?.findIndex(
            (reactionUser) => userLogged?._id === reactionUser?._id
          )
        );
      } else {
        newValue?.push(userLogged);
      }

      setReviewReactionInfo(newValue);
      const response = await postReactionsByReview(
        review?._id,
        reviewReactionInfo
      );
      console.log("Response: ", response);
      setLikes(reviewReactionInfo?.length);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOnlyUser(user?.id)
        .then((log) => {
          setUserLogged(log?.Data);
        })
        .catch((error) => {
          console.log(error);
        });

      getReviewById(review?._id)
        .then((res) => {
          setReview(res);

          getUserById(res?.idUser)
            .then((r) => {
              setUserReview(r?.Data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      getReactionsByReview(review?._id)
        .then((res) => {
          setReviewReactionInfo(res?.Data[0]?.users || []);
          setLikes(res?.Data[0]?.users?.length || 0);
          setIsLiked(
            res?.Data[0]?.users?.find((value) => user.id === value?._id)
          );
        })
        .catch((error) => {
          console.log(error);
        });

      getComments(review?._id)
        .then((res) => {
          console.log(res);
          setComments(res || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation?.navigate("BookProfilePage", { book: book?._id });
      }}
    >
      <Box p={2} bgColor={COLORS.secundary} rounded="lg" shadow={2}>
        <VStack>
          <HStack>
            <TouchableOpacity
              onPress={() => {
                console.log(
                  `${
                    userReview?.firstName + " " + userReview?.lastName
                  }'s profile`
                );
                console.log(userReview._id);
                if (userReview?._id === user?.id) {
                  navigation.navigate("Profile");
                } else {
                  navigation.navigate("UserProfile", { user: userReview._id });
                }
              }}
            >
              <Avatar
                bg="purple.600"
                size="md"
                source={{
                  uri: userReview?.photo === "none" ? null : userReview?.photo,
                }}
                borderColor="white"
                borderWidth={3}
              >
                {userReview &&
                  userReview?.firstName[0] + userReview?.lastName[0]}
              </Avatar>
            </TouchableOpacity>
            <VStack ml={2}>
              <HStack
                space={2}
                justifyContent="space-between"
                alignItems="center"
                h={7}
                mr={2}
              >
                <HStack space={2} ml={1}>
                  <Text bold fontSize="sm">
                    {userReview?.firstName} {userReview?.lastName}
                  </Text>
                  <Text fontSize={10} color="gray.300" alignSelf="center">
                    {parseDate(review?.createdAt) +
                      " " +
                      parseTime(review?.createdAt)}
                  </Text>
                </HStack>

                {user?.id === review?.idUser &&
                  previousFourteenHours(review?.createdAt) && (
                    <HStack alignItems="flex-end">
                      <IconButton
                        icon={<FontAwesome name="edit" color="gray.300" />}
                        size="sm"
                        onPress={() => {
                          setShowModal(true);
                        }}
                      />

                      <EditReviewModal
                        navigation={navigation}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        review={review}
                      />

                      <IconButton
                        icon={<FontAwesome name="trash" color="gray.300" />}
                        size="sm"
                        onPress={() => {
                          setDeleteVisible(true);
                        }}
                      />
                      <AlertDialog
                        isOpen={deleteVisible}
                        onClose={() => {
                          setDeleteVisible(false);
                        }}
                      >
                        <AlertDialog.Content>
                          <AlertDialog.CloseButton />
                          <AlertDialog.Header>
                            Eliminación de review
                          </AlertDialog.Header>
                          <AlertDialog.Body>
                            ¿Estás seguro de que quieres eliminar esta review?
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <Button.Group space={2}>
                              <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={() => {
                                  setDeleteVisible(false);
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                colorScheme="danger"
                                onPress={() => {
                                  try {
                                    deleteReviewById(review?._id);
                                    setDeleteVisible(false);
                                    showSuccessToast(
                                      "¡Misión cumplida! La review fue eliminada con éxito"
                                    );
                                    navigation?.goBack();
                                  } catch {
                                    showErrorToast(
                                      "¡Misión fallida! La review no pudo ser eliminada"
                                    );
                                  }
                                }}
                              >
                                Eliminar
                              </Button>
                            </Button.Group>
                          </AlertDialog.Footer>
                        </AlertDialog.Content>
                      </AlertDialog>
                    </HStack>
                  )}
              </HStack>

              <VStack>
                <Stack
                  w={layout.width * 0.73}
                  mx={1}
                  mb={2}
                  alignItems="flex-start"
                >
                  <Text fontSize="xs" textAlign="justify">
                    {review?.description}
                  </Text>
                </Stack>
                <Stack
                  w={layout.width * 0.73}
                  mx={2}
                  mb={3}
                  alignItems="flex-start"
                >
                  <AirbnbRating
                    count={5}
                    showRating={false}
                    size={10}
                    defaultRating={review?.rating}
                    isDisabled={true}
                    selectedColor={"#FF00F0"}
                    unSelectedColor={COLORS.button.secundaryDisabled}
                  />
                </Stack>

                <Divider />
              </VStack>
            </VStack>
          </HStack>

          <HStack w="95%" mt={1} justifyContent="space-around" space={4}>
            <HStack pb={1} w="75%">
              <Text fontSize="xs" color={COLORS.gray0}>
                {" "}
                {book?.name?.length > 45
                  ? book?.name?.substring(0, 45 - 3) + "..."
                  : book?.name}
              </Text>
            </HStack>
            <HStack w="20%">
              <TouchableOpacity
                onPress={() => {
                  setIsLiked(!isLiked);
                  likeReview();
                  if (isLiked) {
                    setLikes(likes - 1);
                  } else {
                    setLikes(likes + 1);
                  }
                }}
              >
                <HStack space={1} alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name="thumb-up"
                    color={isLiked ? COLORS.button.secundary : "gray.400"}
                  />
                  <Text fontSize="xs" color={"gray.400"}>
                    {likes}
                  </Text>
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentReviewPage", {
                    review: review,
                    comments: comments,
                  });
                }}
              >
                <HStack space={1} alignItems="center" ml={4}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="comment"
                    color={"gray.400"}
                  />
                  <Text fontSize="xs" color={"gray.400"}>
                    {comments?.length || 0}
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ReviewItem;
