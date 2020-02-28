import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, AsyncStorage} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { Container, Text, TitleYellow} from './styles';
import { getFavoritePeople, addFavorite, isFavorited, removeFavorite } from '../../utils/favorite';

export default function BoxPeople({ id, name, height, gender, mass }, navigation) {
  const [ favorited, setFavorited ] = useState(false);

  useEffect(() => {
    verifyFavorite();
  }, []);

  async function verifyFavorite() {
    const favorited = await isFavorited(name);
    setFavorited(favorited);
  }

  // async function handleClick() {
  //     await AsyncStorage.clear()
  // }

  async function handleToggleFavorite() {
    if(favorited){
      await removeFavorite(name)
    } else {
      await addFavorite(name);
    }
    await verifyFavorite();
    // await AsyncStorage.clear()
  }

  return (
    <Container 
      style={
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.62,
          elevation: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      }
    >
     <View>
        <Text><TitleYellow>Name: </TitleYellow> {name}</Text>
        <Text><TitleYellow>Height: </TitleYellow> {height + 'cm'}</Text>
        <Text><TitleYellow>Gender: </TitleYellow> {gender} </Text>
        <Text><TitleYellow>Mass: </TitleYellow> {mass} </Text>
     </View>
     <TouchableOpacity onPress={handleToggleFavorite}>
       <AntDesign 
        name={ favorited ? 'heart' : 'hearto'  } 
        color="#fff"
        size={20}
      />
     </TouchableOpacity>
    </Container>
  );
}



//export default withNavigation(Card);
