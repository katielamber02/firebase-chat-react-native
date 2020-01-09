import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity,Image} from 'react-native';

import events from './fixtures'


console.log(events)

export default class Events extends Component {
    render() {
        return (
            <View>
                <Text>{events[0].title}</Text>
            </View>
        )
    }
}
