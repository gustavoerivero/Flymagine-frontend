import React, { useState, useEffect } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import { AirbnbRating } from "react-native-elements";

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
  Text,
  FormControl,
  Modal,
  Button,
  TextArea,
} from "native-base";

//Colors
import COLORS from "../../styled-components/Colors";

const NewReviewModal = ({ showModal, setShowModal }) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width="90%">
        <Modal.CloseButton />
        <Modal.Header bg={COLORS.primary}>
          <Text bold color={COLORS.base} fontSize={"md"}>
            Nueva Review
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Cuentanos tu experiencia al leer el libro...</Text>
          <FormControl>
            <FormControl.Label>¿Que tal te parecio?</FormControl.Label>
            <TextArea />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Califica el libro</FormControl.Label>

            <AirbnbRating count={5} showRating={false} size={20} defaultRating={1} minValue={1} selectedColor={'#FF00F0'} unSelectedColor={COLORS.button.secundaryDisabled}/>
          
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              bgColor={COLORS.button.primary}
              size={"md"}
              minW={"30%"}
              onPress={() => {}}
            >
              <Text bold color={COLORS.base} fontSize={"sm"}>
                Enviar
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NewReviewModal;
