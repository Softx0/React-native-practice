import React, { useState, useEffect } from 'react'
import { ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UserList = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        return firebase.db.collection('users').onSnapshot(querySnapshot => {

            const users = [];
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });
            setUsers(users);
        });
    }, [])

    return (
        <>
            <ScrollView>
                <Button
                    title="Create User"
                    onPress={() => props.navigation.navigate('CreateUser')}
                />

                {
                    users.map(user => {
                        console.log(user.name);
                        <ListItem key={user.id} >
                            <Avatar rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    })
                }

            </ScrollView>
        </>
    )
}

export default UserList
