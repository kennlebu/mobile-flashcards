import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { handleDeleteDeck } from '../actions'
import styles from '../styles'
import { red, white } from '../utils/colors'
import { getDeck } from '../utils/helpers'

class Deck extends Component {
    state = {
        ready: false,
        deck: null
    }

    componentDidMount () {
        const { route } = this.props;
        const { title } = route.params;

        getDeck(title)
            .then((deck) => {
                this.setState(() => ({
                deck,
                ready: true
            }))
        })
    }

    deleteDeck = (title) => {
        this.props.dispatch(handleDeleteDeck(title))
        this.props.navigation.navigate('Home')
    }

    render () {
        const { ready, deck } = this.state

        if(ready === false) {
            return <Text>Loading...</Text>
        }

        return (
            <View style={styles.container}>
                <View style={[styles.center, {height: 400}]}>
                    <Text style={{fontSize: 28}}>{deck.title}</Text>
                    <Text style={{fontSize: 18}}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity 
                        style={[styles.center, styles.primaryBtn, {marginBottom: 16}]}
                        onPress={() => this.props.navigation.navigate('AddCard', {title: deck.title}) }>
                        <Text style={styles.btnFont}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.center, styles.accentBtn, {marginBottom: 16}]}
                        onPress={() => this.props.navigation.navigate('Quiz', {deck}) }>
                        <Text style={[styles.btnFont, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.center, styles.deleteBtn, {padding: 6}]}
                        onPress={() => this.deleteDeck(deck.title)} >
                        <Text style={[styles.btnFont, {color: red}]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>             
            </View>
        )
    }
}

export default connect()(Deck)