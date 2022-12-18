import {  Text,StyleSheet,SafeAreaView,TouchableOpacity,View,Image,Switch,Pressable,Keyboard,TextInput,FlatList,Button,StatusBar } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import {firebase} from '../config'
import { Feather, FontAwesome, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../config2/themeconteks";
import DateTimePicker from '@react-native-community/datetimepicker';

const Dashboard = () => {
    const [name,setName]= useState('')
    const [email, setEmail] = useState([]);
    const todoRef = firebase.firestore().collection('users');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();
    const theme = useContext(themeContext);
    const[mode, setMode]=useState(false);

    const [date,setDate]=useState(new Date());
    const [mode2,setMode2]=useState('date');
    const [show,setShow]=useState(false);
    const [text,setText]=useState('Empty');

    const onChange = (event,selectedDate)=>{
      const currentDate = selectedDate || date;
      setShow(Platform.OS==='ios');
      setDate(currentDate);
  
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setText(fDate )
      console.log(fDate )
    }
  
    const showMode= (currentMode)=>{
      setShow(true);
      setMode2(currentMode);
    }

    useEffect(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot)=>{
          if(snapshot.exists){
            setName(snapshot.data())
          }else{
            console.log('user does not exist')
          }
    
        })
      },[])
    
    useEffect(() =>{
      todoRef
      .orderBy('createdAt','desc')
      .onSnapshot(
        querySnapshot => {
          const email =[]
          querySnapshot.forEach((doc)=>{
            const {heading}= doc.data()
            email.push({
              id: doc.id,
              heading,
            })
          })
          setEmail(email)
        }
      )
    },[])
    //delete a todo from firestore db
    const deleteTodo = (email) => {
      todoRef
        .doc(email.id)
        .delete()
        .then(()=> {
          //pemberitahuan berhasil menghapus
          alert("berhasil menghapus")
        })
        .catch (error => {
          alert(error);
        })
    }
    //add todo
    const addTodo = () => {
      //mengecek jika kita punya todo
      if (addData && addData.length > 0 ){
        //get the timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          heading : addData,
          createdAt : timestamp
        };
        todoRef
          .add(data)
          .then(() => {
            setAddData(' ');
            //release keyboard
            Keyboard.dismiss();
          })
          .catch ((error) => {
            alert(error);
          })
      }
    };
  useEffect(()=>{
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=>{
      if(snapshot.exists){
        setName(snapshot.data())
      }else{
        console.log('user does not exist')
      }

    })
  },[])
  return (
    
    <View style = {[{flex:1, backgroundColor:theme.background }]}>
    
    <Image source={require('../assets/noto5.png')} 
         style={styles.imageLogin}
        />
    <View style = {styles.container}>
    
        <TextInput
          style ={styles.input}
          placeholder='Isi kegiatan'
          placeholderTextColor= '#aaaaaa'
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity style ={styles.button} onPress={addTodo}>
            <Text style ={styles.buttonText}>Save</Text>
        </TouchableOpacity>
    </View>
    <FlatList
        data={email}
        numColumns={1}
        renderItem={({item}) => (
          <View>
            <Pressable style ={styles.container} >
            <Feather
                name='edit-3'
                color='green'
                onPress={() => navigation.navigate('Edit', {item})}
                style ={styles.todoIcon2}/>
            <FontAwesome 
                name='trash-o'
                color='red'
                onPress={() => deleteTodo(item)}
                style ={styles.todoIcon}
                />
                <View style={styles.innerContainer}>
                    <Text style={styles.itemHeading}>
                      {item.heading[0].toUpperCase() + item.heading.slice(1)}
                    </Text>
                </View>
            </Pressable>
            <View style={styles.container3}>
      <Text style={{fontWeight:'bold',fontSize:20, marginTop:5}}>{text}</Text>
      <View style={{margin:5}}>
          <Button title='Date Picker' onPress={() => showMode('date')}/>
      </View>
      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode2}
        is24Hour={true}
        display='default'
        onChange={onChange}
      />)}
      <StatusBar style="auto" />
    </View>
          </View>
          
        )}
    /><View>
    <View>
      <Pressable style ={styles.con}>
      <Octicons
                name='moon'
                color='black'
                style ={styles.todoIcon5}/>
       <Feather
                name='sun'
                color='orange'
                style ={styles.todoIcon4}/>
        <Feather
                name='log-out'
                color='red'
                onPress={() => {firebase.auth().signOut()}}
                style= {styles.logout}/>
                
        
      <Switch  style={styles.switch} value = {mode} onValueChange = {(value) => { setMode(value); EventRegister.emit("changeTheme",value); }}/>
      </Pressable>
      </View>
    </View>
  </View>
)
}

export default Dashboard
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    padding:15,
    borderRadius:10,
    margin:5,
    elevation:10,
    marginHorizontal:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius:10,
    marginHorizontal:10,
    margin:5,
    elevation:10,
    alignItems: 'center',
    justifyContent: 'center',
  },container2:{
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    padding:10,
    borderRadius:10,
    margin:1,
    elevation:10,
    marginHorizontal:10,
    flexDirection: 'row',
    alignItems: 'center',
  },con:{
    backgroundColor:'white',
    elevation:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginLeft:10,
  },itemHeading:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
  },formContainer:{
    flexDirection:'row',
    height:80,
    marginLeft:10,
    marginRight:10,
    marginTop:100,
  },input:{
    height: 48,
    borderRadius:5,
    overflow:'hidden',
    backgroundColor:'#e0e0e0',
    paddingLeft:16,
    flex:1,
    marginRight:5,
  },button:{
    height:47,
    borderRadius:5,
    backgroundColor:'#788eec',
    width:80,
    alignItems:'center',
    justifyContent:'center',
  },buttonText:{
    color:'white',
    fontSize:20,
  },todoIcon:{
    marginTop:5,
    fontSize: 20,
    marginLeft:10,
  },todoIcon2:{
    marginTop:5,
    fontSize: 20,
  },imageLogin: {
    alignSelf: 'center',
    width: 150,
    height: 150,    
  },switch:{
    alignSelf : 'center',
    left : '175%'
  },todoIcon4:{
    alignSelf : 'center',
    fontSize :30,
    left:'240%'
  },todoIcon5:{
    fontSize :30,
    left : '450%'
  },logout:{
    fontSize :30,
    left : '600%'
  }
})
