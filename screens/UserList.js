import React, { useState, useEffect } from 'react'
import { Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
            const usersArray = [];
            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();
                usersArray.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });
            setUsers(usersArray);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                onPress={() => props.navigation.navigate('CreateUser')}
                title="Create User"
            />
            {
                users.map((user) => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            props.navigation.navigate('UserDetail', {
                                userId: user.id,
                            });
                        }}
                        >
                            <Avatar title={user.name.charAt(0).toUpperCase()} rounded source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg" }} />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default UserList
