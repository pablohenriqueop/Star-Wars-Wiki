import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
if (__DEV__) {
  import("../ReactotronConfig");
}
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Header from "./components/Header";

import background from "../assets/background.jpg";
import titulo from "../assets/titulo.png";

import { ListPeople } from "./components/ListPeople";
import BoxPeople from "./components/BoxPeople";
import { Title } from "./components/Title";
import api from "./services/api";
import ListPeopleContext from "./contexts/ListPeople";

export default function App() {
  const [people, setPeople] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fechData() {
    setLoading(true);
    const response = await api.get("/people");
    setLoading(false);
    setPeople(response.data.results);
    setArrayHolder(response.data.results);
  }

  useEffect(() => {
    fechData();
  }, []);

  return (
    <ListPeopleContext.Provider value={{ arrayHolder, setPeople }}>
      <ImageBackground style={styles.container} source={background}>
        <StatusBar barStyle="light-content" />
        <Title source={titulo} style={styles.strech}></Title>
        <Header></Header>
        {loading ? (
          <ActivityIndicator style={styles.actvity} size="large" color="#FFF" />
        ) : (
          <ListPeople
            data={people}
            keyExtractor={person => person.name}
            renderItem={({ item }) => (
              <BoxPeople
                name={item.name}
                height={item.height}
                gender={item.gender}
                mass={item.mass}
              ></BoxPeople>
            )}
          ></ListPeople>
        )}
      </ImageBackground>
    </ListPeopleContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  strech: {
    width: 200,
    height: 150,
    resizeMode: "contain"
  },
  actvity: {
    flex: 1
  }
});

registerRootComponent(App);
