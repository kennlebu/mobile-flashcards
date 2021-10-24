import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions";
import styles from "../styles";
import DeckListItem from "./DeckListItem";

class DeckList extends Component {
  state = {
    loading: true,
    decks: []
  }

  componentDidMount() {
    const { dispatch } = this.props
      dispatch(handleReceiveDecks())
  }

  render() {
    const { decks } = this.props

    const myKeyExtractor = (deck) => {
      return deck.title
    }

    const renderItem = ({item}) => {
       return <DeckListItem
        key={item.title}
        deck={item} 
        navigate={() => this.props.navigation.navigate('Deck', { title: item.title })} />
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).length >= 1
          ? <FlatList
            data={Object.values(decks)} 
            keyExtractor={myKeyExtractor} 
            renderItem={renderItem} 
            extraData={this.props.decks} />
          :
          <Text style={[styles.center, {fontSize: 28, textAlign: 'center'}]}>
            You have not added any decks yet.
          </Text>}
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
