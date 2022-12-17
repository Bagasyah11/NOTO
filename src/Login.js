import { View, Text,TouchableOpacity,TextInput,StyleSheet,Image } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const Login = () => {
    const navigation = useNavigation()
    const [email,setEmail]= useState (' ')
    const [password,setPassword] = useState (' ')
    loginUser = async (email,password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password)
        } catch (error){
            alert(error.message)
        }
    }
    return (
         <View style = {[{flex:1, backgroundColor:'#62ccb7' }]}>
    <Image source={{uri:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjN0M1LUu-0CxWLpawF7ZBPQ_NfDMWYuK7vQStFexO3X8YGMQonRBMZHdmiO0ZPC-FBuEwPjLmwCEdXwzzD7pqJ7PSuLFq1gCeLbBDYWbm6FK_yHEpteTanSPGpfQ96MNmdXN0iAhwUAf3SacubLjdLFS9lwdL9M5Ad6H99BkDWNz4Ukkk3g2lidhY5/s320/dsads.png'}}
         style={styles.imageLogin}
        />
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        LOGIN
      </Text>
      <View style={{marginTop:10}}>
        <TextInput
            style={styles.textInput}
            placeholder="  Email"
            onChangeText={(email)=> setEmail(email)}
            autoCapitalize ="none"
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="  Password"
            onChangeText={(password)=> setPassword(password)}
            autoCapitalize ="none"
            autoCorrect={false}
            secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={()=> loginUser(email,password)} style={styles.button}>
        <Text style={{fontWeight:'bold',fontSize:22}}>LOGIN</Text>

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Registration')} style={{marginTop:20}}>
        <Text style={{fontWeight:'bold',fontSize:15}}>
            Don't have an account ? Register Now
        </Text>

      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    }, imageLogin: {
      marginTop:100,
      alignSelf: 'center',
      width: 150,
      height: 150,
    },textTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000000',
    },
    textInput:{
      width: 250,
      height: 50,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      alignSelf: 'center',
      fontWeight: 'bold',
      marginVertical: 10,
    },
    button:{
        marginTop:20,
        height:50,
        width:250,
        backgroundColor:'#026efd',
        alignItems :'center',
        justifyContent:'center',
        borderRadius:10,
    }
})