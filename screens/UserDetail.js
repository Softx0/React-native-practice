import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetail = (props) => {

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }

    const [user, setUser] = useState(initialState)
    const [loader, setLoader] = useState(true)

    const getUserById = async id => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const userData = doc.data();
        console.log(userData)
        setUser({
            ...userData,
            id: doc.id,
        })
        setLoader(false)
    }

    useEffect(() => {
        getUserById(props.route.params.UserId)
    }, []);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    if (loader) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }
    return (
        <ScrollView style={styles.container} >

            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Name User"
                    autoCompleteType="username"
                    onChangeText={(value) => handleChangeText('name', value)}
                    value={user.name}
                />
            </View>

            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Email User"
                    autoCompleteType="Email"
                    onChangeText={(value) => handleChangeText('email', value)}
                    value={user.email} />
            </View>

            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Phone User"
                    autoCompleteType="tel"
                    onChangeText={(value) => handleChangeText('phone', value)}
                    value={user.phone}
                />
            </View>

            <View style={styles.buttonStyle} >
                <Button title="Update User" color="#41CB8A"
                // onPress={() => saveNewUser()} 
                />
            </View>

            <View style={styles.buttonStyle} >
                <Button title="Delete User" color="#e76f51"
                // onPress={() => saveNewUser()} 
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    inputGroup: {
        flex: 1,
        padding: 2,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    buttonStyle: {
        padding: 3,
        flex: 1,
        margin: 1
    }
})
export default UserDetail
