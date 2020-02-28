import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";

if (__DEV__) {
  import("../ReactotronConfig");
}

import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  View
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
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  
  useEffect(() => {
    fechData();
  }, []);

  async function fechData() {
    setLoading(true);
    const response = await api.get("/people");
    setLoading(false);
    setPeople(response.data.results);
    setArrayHolder(response.data.results);
    setNextPage(response.data.next);
  }

  const handleLoadPeople = async () => {
     if (loadingMoreData) return;
     setLoadingMoreData(true);
     const response = await api.get(nextPage);
     setPeople([ ...people, ...response.data.results]);
     setArrayHolder([...people, ...response.data.results]);
     setNextPage(response.data.next);
     setLoadingMoreData(false);

  } 

  const renderFooter = () => {
    if (!loadingMoreData) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <ListPeopleContext.Provider value={{ arrayHolder, setPeople, setIsFiltered }}>
      <ImageBackground style={styles.container} source={background}>
        <StatusBar barStyle="light-content" />
        <Title source={titulo} style={styles.strech}></Title>
        <Header></Header>
        { loading ? (
          <ActivityIndicator style={styles.actvity} size="large" color="#FFF" />
        ) : (
          <ListPeople
            data={people}
            keyExtractor={person => person.name}
            onEndReached={() => nextPage && !isFiltered ? handleLoadPeople() : '' }
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <BoxPeople
                name={item.name}
                height={item.height}
                gender={item.gender}
                mass={item.mass}
              ></BoxPeople>
            )}
            ListFooterComponent={ () => renderFooter() }
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
  }, 
  loadingFooter: {
    marginTop: 15,
  }
});

registerRootComponent(App);
