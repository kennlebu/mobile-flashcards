import React, { Component } from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";
import styles from "../styles";
import { white } from "../utils/colors";

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    submitCard = () => {
        const { question, answer } = this.state
        const { title } = this.props
        
        this.props.dispatch(addCardToDeck(title, {question, answer}));

        this.setState(() => ({
            question: '',
            answer: ''
        }))
    }

    render () {
        const { question, answer } = this.state
        return (
            <View style={[{flex: 1, justifyContent: 'space-between'}, styles.center]}>
                <View style={{marginBottom: 40}}>
                    <View style={{marginBottom: 12}}>
                        <Text style={{marginBottom: 4}}>Question: {question}</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Enter a question'
                            onChangeText={(question) => this.setState(() => ({ question }))}
                            value={question}
                        />
                    </View>
                    <View style={{marginBottom: 12}}>
                        <Text style={{marginBottom: 4}}>Answer:</Text>
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