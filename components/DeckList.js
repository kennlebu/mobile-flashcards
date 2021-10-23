import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import DeckListItem from "./DeckListItem";

class DeckList extends Component {
  render() {
    const decks = {
      React: {
        title: "React",
        questions: [
          {
            question: "What is React?",
            answer: "A library for managing user interfaces",
          },
          {
            question: "Where do you make Ajax requests in React?",
            answer: "The componentDidMount lifecycle event",
          },
        ],
      },
      JavaScript: {
        title: "JavaScript",
        questions: [
          {
            question: "What is a closure?",
            answer:
              "The combination of a function and the lexical environment within which that function was declared.",
          },
        ],
      },
    };
    return (
      <View>
        {Object.keys(decks).map((key) => (
            <DeckListItem key={key} deck={decks[key]} />
        ))}
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
