import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Button,
    View,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetail = (props) => {

    const initialState = {
        id: "",
        name: "",
        email: "",
        phone: "",
    };

    const [user, setUser] = useState(initialState);
    const [loader, setLoader] = useState(true);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    }

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const docUser = await dbRef.get();
        const user = docUser.data();
        console.log("Viajando ordenadamente desde firebase: ", user)

        setUser({
            ...user,
            id: docUser.id
        });
        setLoader(false);
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        });

        setUser(initialState);
        props.navigation.navigate('UserList');
    }

    const deleteUser = async () => {
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId);
        await dbRef.delete();

        //navegacion hacia user list
        props.navigation.navigate('UserList');
    };

    const confirmationAlert = () => {
        Alert.alert('Remove the user', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log("Cancel") }
        ])
    }

    useEffect(() => {
        getUserById(props.route.params.userId);
        console.log("Viaja el id: ", props.route.params.userId);

        //No traera los datos ya que se ejecutara antes
        // console.log("Viaja en el state: ", user);
    }, []);


    if (loader) {
        return (
            <View style={styles.loader} >
                <ActivityIndicator color="#9E9E9E" size="large" />
            </View>
        )
    }
    return (
        <ScrollView style={styles.container} >
            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Name User"
                    autoCompleteType="username"
                    value={user.name}
                    onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>

            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Email User"
                    autoCompleteType="email"
                    value={user.email}
                    onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>

            <View style={styles.inputGroup} >
                <TextInput
                    placeholder="Phone User"
                    autoCompleteType="tel"
                    value={user.phone}
                    onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>

            <View style={styles.btnGroup} >
                <Button
                    title="Update User" onPress={() => updateUser()}
                    color="#17c5e8"
                />
            </View>

            <View style={styles.btnGroup} >
                <Button
                    title="Delete  User" onPress={() => confirmationAlert()}
                    color="#f2463c"
                />
            </View>
        </ScrollView>
    );
};

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
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    btnGroup: {
        flex: 1,
        padding: 2
    }
});

export default UserDetail;