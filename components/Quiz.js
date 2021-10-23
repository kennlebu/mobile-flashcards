import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles";
import { red, white } from "../utils/colors";

class Quiz extends Component {
    state = {
        screen: 'question',
        animatedValue: new Animated.Value(0)
    }
    value = 0;

    toggleView = () => {
        if(this.value >= 90) {
            Animated.spring(this.state.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
        } else {
            Animated.timing(this.state.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
        }

        this.setState((prevState) => ({
            screen: prevState.screen === 'question' ? 'answer' : 'question'
        }))
    }

    render() {
        this.state.animatedValue.addListener(({value}) => {
            this.value = value
        })      
        const frontInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        }),
        backInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        const frontAnimationStyle = {
            transform: [
                {rotateY: frontInterpolate}
            ]
        }
        const backAnimationStyle = {
            transform: [
                {rotateY: backInterpolate}
            ]
        }

        return (
            <View style={styles.container}>
                <View style={styles.quizCounter}>
                    <Text>Question 2 of 2</Text>
                </View>
                
                {this.state.screen === 'question' ?
                <View>
                    <Animated.View style={[styles.quizCard, {backfaceVisibility: 'hidden'}, frontAnimationStyle]}>
                        <Text style={{fontSize: 24, marginBottom: 14, textAlign: 'center'}}>
                            Does React Native work with Android?
                        </Text>

                        <TouchableOpacity style={styles.outlineBtn} onPress={this.toggleView}>
                            <Text style={{color: red, fontSize: 16}}>
                                Show Answer
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                :

                <View>
                    <Animated.View style={[styles.quizCard, backAnimationStyle]}>
                        <Text style={{fontSize: 24, marginBottom: 14, textAlign: 'center'}}>
                            Yes!
                        </Text>

                        <TouchableOpacity style={styles.outlineBtn} onPress={this.toggleView}>
                            <Text style={{color: red, fontSize: 16}}>
                                Show Question
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>}

                <View style={[styles.center, {marginBottom: 40}]}>
                    <TouchableOpacity style={[styles.accentBtn, {width: 300, marginBottom: 8}]}>
                        <Text style={[styles.btnFont, {color: white}]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.incorrectBtn, {width: 300}]}>
                        <Text style={[styles.btnFont, {color: white}]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Quiz;
