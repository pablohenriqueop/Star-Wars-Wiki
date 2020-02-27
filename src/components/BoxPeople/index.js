import React from 'react';


 import { Container, Text, TitleYellow} from './styles';

export default function BoxPeople(props, navigation) {

  function handleClick() {
      console.log(navigation);
  }

  return (
    <Container style={
      {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
        elevation: 4,
      }
    }>
      <Text><TitleYellow>Name: </TitleYellow> {props.name}</Text>
      <Text><TitleYellow>Height: </TitleYellow> {props.height + 'cm'}</Text>
      <Text><TitleYellow>Gender: </TitleYellow> {props.gender} </Text>
      <Text><TitleYellow>Mass: </TitleYellow> {props.mass} </Text>
    </Container>
  );
}

//export default withNavigation(Card);
