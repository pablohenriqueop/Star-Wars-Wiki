import React, { useContext } from "react";

import { Feather } from "@expo/vector-icons";
import { Container, Input } from "./styles";
import ListPeopleContext from "../../contexts/ListPeople";

export default function Header() {
  const { arrayHolder, setPeople } = useContext(ListPeopleContext);

  searchFilterFunction = text => {
    const newData = arrayHolder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setPeople(newData);
  };

  return (
    <Container>
      <Input
        placeholder="Buscar pelo nome"
        onChangeText={text => searchFilterFunction(text)}
        placeholderTextColor="#828282"
      ></Input>
      <Feather name="search" size={24}></Feather>
    </Container>
  );
}
