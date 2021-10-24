import React, { Component } from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";
import { addCardToDeck as persistDeck } from "../utils/helpers";
import styles from "../styles";
import { white } from "../utils/colors";

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        title: ''
    }

    componentDidMount () {
        const { route } = this.props;
        const { title } = route.params;

        
        this.setState(() => ({
            title
        }))
    }

    submitCard = () => {
        const { question, answer, title } = this.state

        if(question.length <= 0) {
            alert('Please enter a question')
        } else if(answer.length <= 0) {
            alert('Please enter an answer')
        } else {
            this.props.dispatch(addCardToDeck(title, {question, answer}));
            persistDeck(title, {question, answer})
                .then(() => {
                    this.props.navigation.navigate('Deck', { title, refresh: true });
                })
                .catch((error) => console.log('There was an error persisting the card: ', error))
        }
    }

    render () {
        const { question, answer } = this.state
        return (
            <View style={[styles.center, styles.container]}>
                <View style={{marginBottom: 40}}>
                    <View style={{marginBottom: 12}}>
                        <Text style={{marginBottom: 4, fontSize: 18}}>Question:</Text>
                        <TextInput 
                            style={[styles.input, {minWidth: 300}]} 
                            placeholder='Enter a question'
                            onChangeText={(question) => this.setState(() => ({ question }))}
                            value={question}
                        />
                    </View>
                    <View style={{marginBottom: 12}}>
                        <Text style={{marginBottom: 4, fontSize: 18}}>Answer:</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Enter an answer'
                            onChangeText={(answer) => this.setState(() => ({ answer }))}
                            value={answer}
                        />
                    </View>
                </View>

                <View style={styles.center}>
                    <TouchableOpacity style={styles.accentBtn}>
                        <Text 
                            style={[styles.btnFont, {color: white}]}
                            onPress={this.submitCard}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
}

function mapStateToProps({title}) {
    return {
        title
    }
}

export default connect(mapStateToProps)(AddCard)