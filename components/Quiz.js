import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import styles from "../styles";
import { red, white } from "../utils/colors";
import { handleAnswerQuestion } from '../actions'
import Score from "./Score";
import { clearLocalNotification, getDeck, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
    state = {
        screen: 'question',
        animatedValue: new Animated.Value(0),
        currentQn: {question: '', answer: ''},
        ready: false,
        deck: null,
        numAnswered: 0
    }
    value = 0;

    componentDidMount() {
        this.getNextQuestion()
    }

    toggleView = () => {
        this.setState((prevState) => ({
            screen: prevState.screen === 'question' ? 'answer' : 'question'
        }))
    }

    answerQuestion = (question, answer) => {
        const answerObject = {question, answer}
        const title = this.state.deck.title
        
        this.props.dispatch(handleAnswerQuestion(title, answerObject))
        this.getNextQuestion()
    }

    getNextQuestion = () => {
        const { route } = this.props;
        const { deck } = route.params;

        if(deck.questions.length <= 0) {
            this.setState(() => ({
                screen: 'empty',
                ready: true
            }))
        } else {
            let numAnswered = 0;
            const current = deck.questions.find((question) => {
                if(deck.answers.length <= 0) {
                    return question
                }
                for(let answer of deck.answers) {
                    if(answer.question === question.question) {
                        numAnswered += 1
                        continue
                    }
                    this.setState(() => ({
                        numAnswered
                    }));
                    return question
                }
            });
    
            if((numAnswered + 1) >= deck.questions.length) {
                // this.props.navigation.navigate('Score', {deck})
                this.setState(() => ({
                    screen: 'score',
                    ready: true
                }))
            }
            else {
                this.setState(() => ({
                    screen: 'question',
                    currentQn: current,
                    ready: true,
                    deck
                }))
            }  
        }
    }

    render() {
        const { currentQn, ready, deck, numAnswered } = this.state;

        return (
            <View style={styles.container}>
                {ready
                ? <View>
                    {this.state.screen === 'empty'
                    ? <NoQuestions />
                    : this.state.screen === 'score' ?
                    <Score deck={deck} />
                    :
                    <View>
                        <View style={styles.quizCounter}>
                            <Text>Question {numAnswered + 1} of {deck.questions.length}</Text>
                        </View>
                        
                        {this.state.screen === 'question' ?
                        <View style={styles.quizCard}>
                            <Text style={{fontSize: 24, marginBottom: 14, textAlign: 'center'}}>
                                {currentQn.question}
                            </Text>
                        </View>

                        :

                        <View>
                            <View style={styles.quizCard}>
                                <Text style={{fontSize: 24, marginBottom: 14, textAlign: 'center'}}>
                                    {currentQn.answer}
                                </Text>
                            </View>
                        </View>}                        

                        <TouchableOpacity 
                            style={[styles.outlineBtn, styles.center, {marginTop: 4, marginBottom: 50}]} 
                            onPress={this.toggleView}>
                            <Text style={{color: red, fontSize: 16}}>
                                Show {this.state.screen === 'question' ? 'Answer' : 'Question'}
                            </Text>
                        </TouchableOpacity>

                        <View style={[styles.center, {marginBottom: 40}]}>
                            <TouchableOpacity 
                                style={[styles.accentBtn, styles.center, {width: 300, marginBottom: 8}]}
                                onPress={() => this.answerQuestion(currentQn.question, 'correct')}>
                                <Text style={[styles.btnFont, {color: white}]}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.incorrectBtn, styles.center, {width: 300}]}
                                onPress={() => this.answerQuestion(currentQn.question, 'Incorrect')}>
                                <Text style={[styles.btnFont, {color: white}]}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
                :
                <Text>Loading...</Text>}
            </View>
        );
    }
}

function NoQuestions () {
    return (
        <View style={styles.center}>
            <Text style={{textAlign: 'center', fontSize: 26}}>
                This deck does not have any questions yet.
            </Text>
        </View>
    )
}

export default connect()(Quiz);
