import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AddCard from './components/AddCard';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import decks from './reducers';
import { green } from './utils/colors';
import middleware from './middleware';

export default function App() {
  return (
    <Provider store={createStore(decks, middleware)}>
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor={green} barStyle='default' />
        
        <AddCard />
      </View>
    </Provider>
    
  );
}
