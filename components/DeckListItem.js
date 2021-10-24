import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles";

export default function DeckListItem(props) {
    const { title, questions } = props.deck
    const { navigate } = props
    console.log("ITEM:: ", props)


    return (
        <TouchableOpacity onPress={() => navigate()}>
            <View style={styles.deckListItem}>
                <Text style={{fontSize: 26}}>{title}</Text>
                {questions  && <Text style={{fontSize: 16}}>
                    {questions.length} card{(questions.length > 1 || questions.length === 0) && 's'}
                </Text>}
            </View>
        </TouchableOpacity>        
    )
}