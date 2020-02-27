import React, { useContext } from "react";

import { Feather } from "@expo/vector-icons";
import { Container, Input } from "./styles";
import ListPeopleContext from "../../contexts/ListPeople";

export default function Header() {
  const { arrayHolder, setPeople, setIsFiltered } = useContext(ListPeopleContext);

  searchFilterFunction = text => {
    let textData = text.toLowerCase();

    let filteredName = arrayHolder.filter((item) => {
      return item.name.toLowerCase().match(textData);
    });
    
    if (!text || text === '' || !Array.isArray(filteredName) || !filteredName.length) {
      setIsFiltered(false);
      return setPeople(arrayHolder);
      
    } 

    setIsFiltered(true);

    setPeople(filteredName); 

  };

  return (
    <Container>
      <Input
        placeholder="Search by name"
        onChangeText={text => searchFilterFunction(text)}
        placeholderTextColor="#828282"
        autoCapitalize="words"
        autoCorrect={false}
      ></Input>
      <Feather name="search" size={24}></Feather>
    </Container>
  );
}
