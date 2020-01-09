import React, { Component } from 'react'
import {Platform, StyleSheet,Alert, Text, View,TextInput,TouchableOpacity,Image,Button,AsyncStorage} from 'react-native';


export default class ChatAuth extends Component {
    state={
        email:'',
        password:'',
        phone:'',
        name:''
    }
    setEmail=email=>this.setState({email})
    setPassword=password=>this.setState({password})
    
    handleChange=key=>value=>{
        this.setState({[key]:value})
    }

    signIn=()=>{
        console.log('signin worked out')
    }
    
    componentWillMount(){
        AsyncStorage.getItem('userPhone')
        .then(res=>{
            if(res){
                this.setState({phone:res})
            }
        })
    }
    submitForm=async ()=>{
       if(this.state.phone.length<8){
           Alert.alert('Error','Wrong phone number')
       }else if(this.state.name<8){
        Alert.alert('Error','Wrong name')
       }else{
           await AsyncStorage.setItem('userPhone',this.state.phone)
           console.log('PHONE NUM:',this.state.phone)
       }
    }

    render() {
        const {email,password,name,phone}=this.state
        console.log(this.state)
        return (
            <View style={styles.view}>
                   <Text style={styles.header}>Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={this.handleChange('name')}
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Text>Phone number:</Text>
                <TextInput
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
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#F5FCFF',

        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
      padding:10,
      borderWidth:1,
      borderColor:'#ccc',
      //width:'90%',
      width:300,
      marginBottom:1,
      borderRadius:5
    },
    btnText:{
        fontSize:20,
        color:'darkblue'
    }
   
  });