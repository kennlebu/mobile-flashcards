import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addDeckTitle } from "../actions";
import styles from "../styles";
import { white } from "../utils/colors";

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
            this.props.dispatch(addDeckTitle(title));

            this.setState(() => ({title: ''}));
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