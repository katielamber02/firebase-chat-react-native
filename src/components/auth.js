import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity,Image} from 'react-native';


export default class Auth extends Component {
    state={
        email:'',
        password:''
    }
    setEmail=email=>this.setState({email})
    setPassword=password=>this.setState({password})
    signIn=()=>{
        console.log('signin worked out')
    }
    render() {
        const {email,password}=this.state
        //console.log(email,password,this.state)
        return (
            <View>
      
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
                <TouchableOpacity onPress={this.signIn}>
                    <Image
                        style={styles.button}
                        source={require('./MyButton.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
      fontSize:20,
      fontWeight:'bold'
    },
    input: {
      width:150,
      borderBottomColor:'#000',
      borderBottomWidth:2
    },
    button:{
        width:60,
        height:30
    }
  });