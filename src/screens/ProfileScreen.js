import React, { Component } from 'react'
import {View,Text,Image,SafeAreaView,AsyncStorage,TouchableOpacity} from 'react-native'
import User from '../components/User'
import styles from '../constants/styles';

export default class ProfileScreen extends Component {
    static navigationOptions={
        
            title:'my profile'
        
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    render() {
        return (
            <SafeAreaView style={styles.view}>
                <Text style={{fontSize:20}}>{User.phone}</Text>
                <Text style={{fontSize:20}}>{User.name}</Text>
                <TouchableOpacity onPress={this._signOutAsync}>
                <Text style={{fontSize:20}} >Log out</Text>
                </TouchableOpacity>
               
            </SafeAreaView>
        )
    }
}
