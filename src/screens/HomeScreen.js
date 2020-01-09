import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import User from '../components/User'
import styles from '../constants/styles';

import firebase from 'firebase'
import { SafeAreaView } from 'react-navigation';


export default class HomeScreen extends Component {
    static navigationOptions =({navigation})=>{
        return  {
            title: 'Chats',
            headerRight:(
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <Text>Your Profile</Text>
                </TouchableOpacity>
            )
        }
    }
    
    state = {
        users: []
    }
    componentWillMount() {
        var database = firebase.database();
        let dbRef = database.ref('users')
        dbRef.on('child_added', val => {
            let person = val.val()
            person.phone = val.key
            if(person.phone===User.phone){
                User.name=person.name
            }else{
                this.setState(prevState => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
          
        })
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ borderBottomColor: '#ccc', padding: 10, borderBottomWidth: 1 }}
                onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Text style={{ fontSize: 20 }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    render() {
        console.log('state:', this.state)
        return (

            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.phone}
                />
            </SafeAreaView>

        )
    }
}
