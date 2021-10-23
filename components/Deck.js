import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../styles'
import { red, white } from '../utils/colors'

class Deck extends Component {
    render () {
        return (
            <View style={{flex: 1}}>
                <View style={[styles.center, {height: 400}]}>
                    <Text style={{fontSize: 28}}>Deck 1</Text>
                    <Text style={{fontSize: 18}}>2 cards</Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity style={[styles.center, styles.primaryBtn, {marginBottom: 16}]}>
                        <Text style={styles.btnFont}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.center, styles.accentBtn, {marginBottom: 16}]}>
                        <Text style={[styles.btnFont, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.center, styles.deleteBtn, {padding: 6}]}>
                        <Text style={[styles.btnFont, {color: red}]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>             
            </View>
        )
    }
}

export default Deck