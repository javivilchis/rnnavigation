import React, { createRef, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Keychain from 'react-native-keychain'
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AlertModal from './src/components/Modal';
import DrawerNavigator from './src/navigation/DrawerNavigator'


import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import i18n from './src/locales'

import firebase from "@react-native-firebase/app";

const navigationRef = createRef()
const nav = () => navigationRef.current


const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [bologinType, setBologinType] = useState("");
  const [generatedToken, setGeneratedToken] = useState();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //console.log("USER: ", user)
  //console.log("FIREBASE: ", JSON.stringify(firebase, null, 2) )
  //console.log("MESSAGING: ", JSON.stringify(firebase.messaging(), null, 2))
  //console.log('PERMISSION: ', JSON.stringify(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, null, 2))

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const androidConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,

    // enable persistence by adding the below flag
    persistence: true,
  };

  const authorizeSubscribe = () => {
    auth().onAuthStateChanged(onAuthStateChanged);
    return authorizeSubscribe
  }




  const unsubscribe = NetInfo.addEventListener(state => { });

  NetInfo.fetch().then(state => {
    //console.log("Connection type", state.type);
    setIsConnected(state.isConnected);
    setConnectionType(state.type);
  });

  const newmessage = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  // get fmc token
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      const user = await AsyncStorage.getItem("user", (error, result) => {
        console.log("result", result )
      });
      if (user !== null) {
        setUserID(user)
        console.log("DONE SETTING USERID")
      }
      console.log("", user)

      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    authorizeSubscribe();
    unsubscribe();
    newmessage();
    getFCMToken();
  }, []);


  const MainNavigation = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
          <AlertModal showalert={isConnected} content={"You are connected to " + connectionType + "!"} />
          <DrawerNavigator nav={nav} />
        </NavigationContainer>
      </SafeAreaView>
    )
  }

  const LoginNavigation = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeremail, setregisterEmail] = useState('');
    const [registerpassword, setregisterPassword] = useState('');
    const [userID, setUserID] = useState('');
    // create username
    console.log("USER ID: ", JSON.stringify(userID, null, 2))
    const createUser = () => {
      //   console.log("email: ", email, " password: ", password)
      // return
      auth()
        .createUserWithEmailAndPassword(registeremail, registerpassword)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }

    const resetForms = () => {
      setEmail('');
      setPassword('');
    }

    const signIn = () => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          
          setUserID(response.user.uid)
          console.log('User account created & signed in!');
          
          resetForms();
          try {
            async () => await AsyncStorage.setItem("user", JSON.stringify(response.user.uid))
            alert('Data successfully saved')
            const user = await AsyncStorage.getItem("user").then(console.log("hello"));
            console.log("USER: ", user)
            if (user !== null) {
              setUserID(user)
            }
          } catch (error) {
            console.log(error)
          }


        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }

    const logOut = () => {
      console.log("signed out")
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    return (
      <SafeAreaView>
        <View style={{ padding: 10 }}>
          <View><Text>Firebase Login</Text></View>
          <View><Text>{userID ? 'hi userID ' + JSON.stringify(userID) : ''}</Text></View>
          <View style={{ padding: 10 }}>
            <Text style={{ paddingVertical: 10, fontSize: 18, marginVertical: 5 }}>Register</Text>
            <TextInput
              style={{ padding: 10, borderWidth: 1, borderColor: 'gray', marginVertical: 5 }}
              placeholder="Email"
              onChangeText={text => setregisterEmail(text)}
              value={registeremail}
            />
            <TextInput
              style={{ padding: 10, borderWidth: 1, borderColor: 'gray', marginVertical: 5 }}
              placeholder="Password"
              onChangeText={text => setregisterPassword(text)}
              value={registerpassword}
              secureTextEntry
            />
            <TouchableOpacity onPress={createUser} style={{ backgroundColor: "purple", padding: 10, alignContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#ffffff' }}>Register</Text>
            </TouchableOpacity>

          </View>

          <View style={{ padding: 10 }}>
            <Text style={{ paddingVertical: 10, fontSize: 18, marginVertical: 5 }}>Sign In</Text>
            <TextInput
              style={{ padding: 10, borderWidth: 1, borderColor: 'gray', marginVertical: 5 }}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TextInput
              style={{ padding: 10, borderWidth: 1, borderColor: 'gray', marginVertical: 5 }}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
            />
            <TouchableOpacity onPress={signIn} style={{ backgroundColor: "purple", padding: 10, alignContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#ffffff' }}>Register</Text>
            </TouchableOpacity>

          </View>

          <View style={{ padding: 10 }}>
            <Text style={{ paddingVertical: 10, fontSize: 18, marginVertical: 5 }}>Logout</Text>

            <TouchableOpacity onPress={logOut} style={{ backgroundColor: "purple", padding: 10, alignContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#ffffff' }}>Log Out</Text>
            </TouchableOpacity>

          </View>


        </View>
      </SafeAreaView>
    )
  }


  return (<LoginNavigation />)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <AlertModal showalert={isConnected} content={"You are connected to " + connectionType + "!"} />
        <DrawerNavigator nav={nav} />
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default App