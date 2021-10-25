import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { handleRestartQuiz, restartQuizAction } from "../actions";
import styles from "../styles";
import { white } from "../utils/colors";
import { restartQuiz } from "../utils/helpers";

class Score extends Component {
  render() {
    const { _selected_, backToDeck, restartQuiz } = this.props;

    const numQuestions = _selected_ ? _selected_.questions.length : 0;
    const correct = _selected_
      ? _selected_.answers.filter((answer) => answer.answer === "correct")
          .length
      : 0;

    return (
      <View style={[styles.center]}>
        <Text style={{ fontSize: 18 }}>Score:</Text>
        <Text style={{ fontSize: 40 }}>
          {correct}/{numQuestions}
        </Text>
        <View style={{ marginTop: 60 }}>
          <TouchableOpacity
            style={[styles.accentBtn, styles.center, { marginBottom: 8 }]}
            onPress={restartQuiz}
          >
            <Text style={[styles.btnFont, { color: white }]}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.outlineBtn, styles.center]}
            onPress={backToDeck}
          >
            <Text style={styles.btnFont}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ _selected_ }) {
  return { _selected_ };
}

export default connect(mapStateToProps)(Score);
