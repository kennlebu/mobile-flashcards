import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import styles from "../styles";
import { red, white } from "../utils/colors";
import { handleAnswerQuestion, handleRestartQuiz } from "../actions";
import Score from "./Score";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    screen: "question",
    animatedValue: new Animated.Value(0),
    currentQn: { question: "", answer: "Anser" },
    ready: true,
    deck: null,
    numAnswered: 0,
  };
  value = 0;

  toggleView = (screen) => {
    this.setState((prevState) => ({
      screen: screen,
    }));

    this.state.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    if (this.value >= 90) {
      Animated.spring(this.state.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.state.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  backToDeck = () => {
    this.props.navigation.navigate("Deck");
  };

  restartQuiz = () => {
    const { _selected_ } = this.props;
    const title = _selected_.title;

    this.props.dispatch(handleRestartQuiz(title));
    this.props.navigation.navigate("Quiz");
  };

  answerQuestion = (question, answer, numAnswered) => {
    const { _selected_, dispatch } = this.props;
    const answerObject = { question, answer };
    const title = _selected_.title;

    this.toggleView("question");

    dispatch(handleAnswerQuestion(title, answerObject));

    // Clear notification if all questions have been answered
    if (numAnswered + 1 > _selected_.questions.length) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  render() {
    const { _selected_ } = this.props;

    let numAnswered = 0;
    const currentQn = _selected_.questions.find((question) => {
      if (_selected_.answers.length <= 0) {
        return question;
      }
      for (let answer of _selected_.answers) {
        if (question.question === answer.question) {
          numAnswered += 1;
          continue;
        }
        return question;
      }
    });

    // Animation stuff
    const frontInterpolation = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"],
    });
    const backInterpolation = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"],
    });
    const frontAnimationStyle = {
      transform: [{ rotateY: frontInterpolation }],
    };
    const backAnimationStyle = {
      transform: [{ rotateY: backInterpolation }],
    };

    return (
      <View style={styles.container}>
        {_selected_ !== undefined ? (
          <View>
            {_selected_.questions.length <= 0 ? (
              <NoQuestions />
            ) : _selected_.answers.length >= _selected_.questions.length ? (
              <Score
                backToDeck={this.backToDeck}
                restartQuiz={this.restartQuiz}
              />
            ) : (
              <View>
                <View style={styles.quizCounter}>
                  <Text>
                    Question {numAnswered + 1} of {_selected_.questions.length}
                  </Text>
                </View>

                {this.state.screen === "question" ? (
                  <Animated.View
                    style={[
                      styles.quizCard,
                      { backfaceVisibility: "hidden" },
                      frontAnimationStyle,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        marginBottom: 14,
                        textAlign: "center",
                      }}
                    >
                      {currentQn.question}
                    </Text>
                  </Animated.View>
                ) : (
                  <Animated.View style={[styles.quizCard, backAnimationStyle]}>
                    <Text
                      style={{
                        fontSize: 24,
                        marginBottom: 14,
                        textAlign: "center",
                      }}
                    >
                      {currentQn.answer}
                    </Text>
                  </Animated.View>
                )}

                <TouchableOpacity
                  style={[
                    styles.outlineBtn,
                    styles.center,
                    { marginTop: 4, marginBottom: 50 },
                  ]}
                  onPress={() =>
                    this.toggleView(
                      this.state.screen === "question" ? "answer" : "question"
                    )
                  }
                >
                  <Text style={{ color: red, fontSize: 16 }}>
                    Show{" "}
                    {this.state.screen === "question" ? "Answer" : "Question"}
                  </Text>
                </TouchableOpacity>

                <View style={[styles.center, { marginBottom: 40 }]}>
                  <TouchableOpacity
                    style={[
                      styles.accentBtn,
                      styles.center,
                      { width: 300, marginBottom: 8 },
                    ]}
                    onPress={() =>
                      this.answerQuestion(currentQn.question, "correct")
                    }
                  >
                    <Text style={[styles.btnFont, { color: white }]}>
                      Correct
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.incorrectBtn, styles.center, { width: 300 }]}
                    onPress={() =>
                      this.answerQuestion(currentQn.question, "Incorrect")
                    }
                  >
                    <Text style={[styles.btnFont, { color: white }]}>
                      Incorrect
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

function NoQuestions() {
  return (
    <View style={styles.center}>
      <Text style={{ textAlign: "center", fontSize: 26 }}>
        This deck does not have any questions yet.
      </Text>
    </View>
  );
}

function mapStateToProps({ _selected_ }) {
  return {
    _selected_,
  };
}

export default connect(mapStateToProps)(Quiz);
