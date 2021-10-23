import { StyleSheet } from 'react-native';
import { green, lightGreen, red, white } from '../utils/colors';

const styles = StyleSheet.create({
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
        flex: 1
    }
})

export default styles
