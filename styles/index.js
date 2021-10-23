import { StyleSheet } from 'react-native';
import { gray, green, lightGreen, red, veryLightGreen, white } from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: veryLightGreen
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckListItem: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 4
    },
    primaryBtn: {
        backgroundColor: white,
        borderColor: green,
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
        paddingLeft: 100,
        paddingRight: 100
    },
    accentBtn: {
        backgroundColor: green,
        borderColor: green,
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
        paddingLeft: 100,
        paddingRight: 100
    },
    outlineBtn: {
        borderColor: green,
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
        paddingLeft: 40,
        paddingRight: 40
    },
    incorrectBtn: {
        backgroundColor: red,
        borderColor: red,
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
        paddingLeft: 100,
        paddingRight: 100
    },
    btnFont: {
        fontSize: 16
    },
    input: {
        height: 40,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: white
    },
    newDeckTitle: {
        fontSize: 28,
        alignItems: 'center',
        marginBottom: 24,
        textAlign: 'center'
    },
    newDeckActions: {
        flex: 1,
        justifyContent: 'end',
        paddingBottom: 40
    },
    quizCounter: {
        alignItems: 'start',
        justifyContent: 'start'
    },
    quizCard: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
        padding: 20,
        height: 400,
        borderStyle: 'solid',
        borderColor: green,
        borderRadius: 3,
        backgroundColor: '#BED1B6',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'
    }
})

export default styles
