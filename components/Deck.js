import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { handleDeleteDeck } from '../actions'
import styles from '../styles'
import { red, white } from '../utils/colors'

class Deck extends Component {
    state = {
        ready: false,
        deck: null
    }

    deleteDeck = (title) => {
        this.props.dispatch(handleDeleteDeck(title))
        this.props.navigation.navigate('Home')
    }

    render () {
        const { _selected_ } = this.props

        if(_selected_ === null || _selected_ === 'undefined') {
            return <Text>Loading...</Text>
        }

        return (
            <View style={styles.container}>
                <View style={[styles.center, {height: 400}]}>
                    <Text style={{fontSize: 28}}>{_selected_.title}</Text>
                    <Text style={{fontSize: 18}}>{_selected_.questions.length} cards</Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity 
                        style={[styles.center, styles.primaryBtn, {marginBottom: 16}]}
                        onPress={() => this.props.navigation.navigate('AddCard', {title: _selected_.title}) }>
                        <Text style={styles.btnFont}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.center, styles.accentBtn, {marginBottom: 16}]}
                        onPress={() => this.props.navigation.navigate('Quiz') }>
                        <Text style={[styles.btnFont, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.center, styles.deleteBtn, {padding: 6}]}
                        onPress={() => this.deleteDeck(_selected_.title)} >
                        <Text style={[styles.btnFont, {color: red}]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text>DECK</Text> */}
            </View>
        )
    }
}

function mapStateToProps({ _selected_ }) {
    return { _selected_ }
}

export default connect(mapStateToProps)(Deck)