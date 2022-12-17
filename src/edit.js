import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React,{ useState,useContext }from 'react'
import {firebase} from '../config';
import { useNavigation } from '@react-navigation/native';
import themeContext from "../config2/themeconteks";

const Edit = ({route}) => {
  const todoRef = firebase.firestore().collection('users');
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const updateTodo = () => {
    if (textHeading && textHeading.length > 0){
      todoRef
      .doc(route.params.item.id)
      .update({
        heading : textHeading,
      }).then (()=>{
        navigation.navigate('Dashboard')
      }).catch((error)=> {
        alert(error.message)
      })
    }
  }

  return (
    <View style = {[{flex:1, backgroundColor:theme.background }]}>
      <View style = {{marginTop :50 }}>
    <View style={styles.container }>
        <TextInput
            style={styles.textField}
            onChangeText={onChangeHeadingText}
            value={textHeading}
            placeholder="Isi Kegiatan Baru"
        />
        <Pressable style={styles.buttonUpdate} onPress={() => {updateTodo()}}>
            <Text style={styles.teksUpdateKata}>
              UPDATE KATA
            </Text>
        </Pressable>
    </View>
    </View>
    </View>
  )
}
export default Edit
const styles = StyleSheet.create({
  container :{
    marginTop:40,
    marginLeft:15,
    marginRight:15,
  },
  textField:{
    marginBottom:10,
    padding:10,
    fontSize:15,
    color:'#000000',
    backgroundColor:'#e0e0e0',
    borderRadius:5,
  },
  buttonUpdate:{
    marginTop:25,
    justifyContent:'center',
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:4,
    elevation:10,
    backgroundColor:'#9acd32',
  },
  teksUpdateKata:{
    fontSize : 14,
    left:'32%',
  }
})
