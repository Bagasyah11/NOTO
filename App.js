import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React,{useState,useEffect} from "react";
import {firebase} from './config';
import themeContext from './config2/themeconteks';
import theme from "./config2/theme";
import { EventRegister } from 'react-native-event-listeners';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Edit from "./src/edit";

const Stack = createStackNavigator();
function App(){
  const [initializing, setInitializing] = useState(true);
  const [user,setUser] = useState();
  const [mode, setMode] = useState(false);

  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() =>{
    let eventListener = EventRegister.addEventListener(
      "changeTheme", 
      (data)=>{
      setMode(data);
    });
    return()=>{
      EventRegister.removeEventListener(eventListener);
    }
  });
  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);
  if (initializing) return null;

  if (!user){
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Login" component={Login} />
         <Stack.Screen name = "Registration" component={Registration} />
      </Stack.Navigator>
    );
  }
    return (
      <themeContext.Provider value ={mode === true ? theme.dark : theme.light}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name = "Dashboard" component={Dashboard}/>
       <Stack.Screen name = "Edit" component={Edit}/>
      </Stack.Navigator>
      </themeContext.Provider>
);}
export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}