import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles";

export default function DeckListItem(props) {
    const { title, questions } = props.deck

    return (
        <TouchableOpacity>
            <View style={styles.deckListItem}>
                <Text style={{fontSize: 16}}>{title}</Text>
                <Text style={{fontSize: 12}}>
                    {questions.length} Card{questions.length > 1 && 's'}
                </Text>
            </View>
        </TouchableOpacity>        
    )
}