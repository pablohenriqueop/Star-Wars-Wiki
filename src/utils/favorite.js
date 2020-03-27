import { AsyncStorage } from 'react-native';

export async function addFavorite(newPeople) {
    const favoritePeople = (await getFavoritePeople()) || [];
    await setFavoritePeople([ ...favoritePeople, newPeople ]);
}

export async function removeFavorite(peopleName) {
    const favoritePeople = await getFavoritePeople();
    await setFavoritePeople(filterAndRemoveByName(favoritePeople, peopleName));
}

export async function isFavorited(peopleName) {
    const favoritePeople = await getFavoritePeople();
    return favoritePeople.indexOf(peopleName) != -1;
}



/* 
*  MANAGER FUNCTIONS
*/

export async function getFavoritePeople() {
    return await getFromAsyncStorage('favoritePeople')  || [];
}

async function setFavoritePeople(favoritePeople) {
    return await saveOnAsyncStorage('favoritePeople', favoritePeople);
}

function filterAndRemoveByName(array, name) {
    return array.filter(index => (index !== name) ? true : false);
}

/* MANAGER ASYNCSTORAGE */

async function getFromAsyncStorage(item) {
    const itemFromAsyncStorage = await AsyncStorage.getItem(item);
    return parse(itemFromAsyncStorage);
}

async function saveOnAsyncStorage(item, content) {
    return await AsyncStorage.setItem(item, stringify(content))
}


/* 
*  BASE FUNCTIONS
*/

function parse(string) {
    return JSON.parse(string);
}

function stringify(object) {
    return JSON.stringify(object);
}