import React, { useState } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";

const CreateUser = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    //devuelve una promesa por lo que debe ser async await o debemos poner abajo Promise.resolve(........)
    const saveNewUser = async () => {
        console.log(user)
        if (user.name === '' || user.email === '' || user.phone === '') {
            alert('Por favor no dejar campos vacios')
        } else {
            // Añadiendo un objeto a la db nosql
            await firebase.db.collection('users').add({
                name: user.name,
                email: user.email,
                phone: user.phone
            })
            alert('Los datos han sido guardados exitosamente!')
        }

    }

    return (
        <ScrollView style={styles.container} >
            <View style={styles.inputGroup} >
                {/* Con el spread operator guardamos el estado sin borrar los anteriores, asi usamos lo que necesitamos sin afectar mas alla */}
                <TextInput placeholder="Name User" onChangeText={(value) => handleChangeText('name', value)} />
            </View>

            <View style={styles.inputGroup} >
                <TextInput placeholder="Email User" onChangeText={(value) => handleChangeText('email', value)} />
            </View>

            <View style={styles.inputGroup} >
                <TextInput placeholder="Phone User" onChangeText={(value) => handleChangeText('phone', value)} />
            </View>

            <View>
                <Button title="Save User" onPress={() => saveNewUser()} />
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
    }
})

export default CreateUser
