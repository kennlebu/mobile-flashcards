import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { restartQuizAction } from "../actions";
import styles from "../styles";
import { white } from "../utils/colors";
import { restartQuiz } from "../utils/helpers";

class Score extends Component {
    doRestartQuiz = (deck) => {
        restartQuiz(deck.title)
            .then(this.props.dispatch(restartQuizAction(deck.title)))
            .then(this.props.navigation.navigate('Quiz', {deck}))
    }

    render () {
        // const { route, navigation } = this.props;
        // const { deck } = route.params; 
        const { deck } = this.props
        
        const numQuestions = deck.questions.length
        const correct = deck.answers.filter((answer) => answer.answer === 'correct').length

        return (
            <View style={[styles.container, styles.center]}>
                <Text style={{fontSize: 18}}>Score:</Text>
                <Text style={{fontSize: 40}}>{correct}/{numQuestions}</Text>
                <View style={{marginTop: 60}}>
                    <TouchableOpacity 
                        style={[styles.accentBtn, styles.center, {marginBottom: 8}]}
                        onPress={this.doRestartQuiz(deck)}>
                        <Text style={[styles.btnFont, {color: white}]}>Restart Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.outlineBtn, styles.center]}
                        onPress={() => navigation.navigate('Deck', { title: deck.title})}>
                        <Text style={styles.btnFont}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps({deck}) {
    return {
        deck
    }
}

export default connect(mapStateToProps)(Score);