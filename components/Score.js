import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles";
import { white } from "../utils/colors";

class Score extends Component {
    render () {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={{fontSize: 18}}>Score:</Text>
                <Text style={{fontSize: 40}}>4/5</Text>
                <View style={{marginTop: 60}}>
                    <TouchableOpacity style={[styles.accentBtn, styles.center, {marginBottom: 8}]}>
                        <Text style={[styles.btnFont, {color: white}]}>Restart Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.outlineBtn, styles.center]}>
                        <Text style={styles.btnFont}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Score;