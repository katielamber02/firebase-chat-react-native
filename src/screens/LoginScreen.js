import React, { Component } from 'react'
import { Platform, Alert, Text, View, TextInput, TouchableOpacity, Image, Button, AsyncStorage } from 'react-native';
import User from '../components/User'
import styles from '../constants/styles'
import firebase from 'firebase'

export default class ChatAuth extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        email: '',
        password: '',
        phone: '',
        name: ''
    }
    setEmail = email => this.setState({ email })
    setPassword = password => this.setState({ password })

    handleChange = key => value => {
        this.setState({ [key]: value })
    }

    signIn = () => {
        console.log('signin worked out')
    }

    componentWillMount() {
        AsyncStorage.getItem('userPhone')
            .then(res => {
                if (res) {
                    this.setState({ phone: res })
                }
            })
    }
    submitForm = async () => {
        if (this.state.phone.length < 8) {
            Alert.alert('Error', 'Wrong phone number')
        } else if (this.state.name < 8) {
            Alert.alert('Error', 'Wrong name')
        } else {
            await AsyncStorage.setItem('userPhone', this.state.phone)
            console.log('PHONE NUM:', this.state.phone)
            User.phone = this.state.phone
            firebase.database().ref('users/' + User.phone).set({ name: this.state.name })
            this.props.navigation.navigate('App')
        }
    }

    render() {
        const { email, password, name, phone } = this.state
        console.log(this.state)
        return (
            <View style={styles.view}>
                <Text style={styles.header}>Name:</Text>
                <TextInput
                    placeholder='Enter you name'
                    value={name}
                    onChangeText={this.handleChange('name')}
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Text>Phone number:</Text>
                <TextInput
                    placeholder='enter your phone number'
                    value={phone}
                    onChangeText={this.handleChange('phone')}
                    secureTextEntry
                    style={styles.input}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity onPress={this.submitForm}>
                    <Text style={styles.btnText}>submit</Text>
                </TouchableOpacity>

                <Text style={styles.header}>Email:</Text>
                <TextInput
                    value={email}
                    onChangeText={this.setEmail}
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Text>Password:</Text>
                <TextInput
                    value={password}
                    onChangeText={this.setPassword}
                    secureTextEntry
                    style={styles.input}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity onPress={this.signIn} >
                    <Text style={styles.btnText}>submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
