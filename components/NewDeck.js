import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addDeckTitle, selectDeck } from "../actions";
import styles from "../styles";
import { white } from "../utils/colors";
import { saveDeckTitle } from "../utils/helpers";

class NewDeck extends Component {
    state = {
        title: ''
    }

    createDeck = () => {
        const { title } = this.state;

        if(title.length <= 0) {
            alert('You must enter a title')
        }
        else {
            saveDeckTitle(title)
                .then(() => {
                    this.props.dispatch(addDeckTitle(title));
                    this.props.dispatch(selectDeck(title));
                    this.props.navigation.navigate('Deck', { title, refresh: true })
                    this.setState(() => ({title: ''}));
                })
                .catch((error) => console.warn('Failed to add Deck title: ', error))
            
        }        
    }

    render() {
        const { title } = this.state;
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.newDeckTitle}>
                        Enter the title of your new deck.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Title'
                        onChangeText={(title) => this.setState(() => ({title}))}
                        value={title}
                    />
                </View>
                <View style={styles.newDeckActions}>
                    <TouchableOpacity 
                        style={[styles.accentBtn, styles.center]}
                        onPress={this.createDeck}
                    >
                        <Text style={[styles.btnFont, {color: white}]}>Create Deck</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default connect()(NewDeck)