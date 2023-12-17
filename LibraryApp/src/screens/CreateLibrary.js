import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {postLibrary} from "../service/RequestsService";

const MakeLibraryScreen = ({ navigation }) => {
    const [libraryName, setLibraryName] = useState('');
    const [libraryAddress, setLibraryAddress] = useState('');
    const [libraryOpenTime, setLibraryOpenTime] = useState('');
    const [libraryCloseTime, setLibraryCloseTime] = useState('');
    const [libraryOpenDays, setLibraryOpenDays] = useState('');

    const handleSubmit = async() => {
        try {
            await postLibrary(libraryName, libraryAddress, libraryOpenTime, libraryCloseTime, libraryOpenDays)
        } catch (error) {
            throw error
        }
        navigation.navigate('Admin')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Library Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryName(text)}
                value={libraryName}
                placeholder={"Isep Library"}
            />

            <Text style={styles.text}>Library Address</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryAddress(text)}
                value={libraryAddress}
                placeholder={"R. Dr António Bernardino"}
            />

            <Text style={styles.text}>Library Open Time</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryOpenTime(text)}
                value={libraryOpenTime}
                placeholder={"08:00:00"}
            />

            <Text style={styles.text}>Library Close Time</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryCloseTime(text)}
                value={libraryCloseTime}
                placeholder={"22:00:00"}
            />

            <Text style={styles.text}>Library Open Days</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryOpenDays(text)}
                value={libraryOpenDays}
                placeholder={"Everyday"}
            />
            <Button style={styles.submitButton} title="Submit" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        color: 'black',
    },
    input: {
        color: 'black',
    },
    submitButton: {
        backgroundColor: "blue",
    },
})

export default MakeLibraryScreen
