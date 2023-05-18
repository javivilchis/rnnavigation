import React, { createRef, useState, useEffect } from 'react'
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AlertModal from './src/components/Modal';
import DrawerNavigator from './src/navigation/DrawerNavigator'

const navigationRef = createRef()
const nav = () => navigationRef.current

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState("")
  // Subscribe
 
  const unsubscribe = NetInfo.addEventListener(state => {});
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    setIsConnected(state.isConnected);
    setConnectionType(state.type);
  });
  // NetInfo.fetch().then(state => {
  //   console.log("2 - Connection type", state.type);
  //   console.log("2 - Is connected?", state.isConnected);
  // });

  // NetInfo.fetch("3 - wifi").then(state => {
  //   console.log("3 - SSID", state.details.ssid);
  //   console.log("3 - BSSID", state.details.bssid);
  //   console.log("3 - Is connected?", state.isConnected);
  // });
  // Unsubscribe
  // unsubscribe();
 
  // const IsConnected = (isConnected) => {
  //   return isConnected ? AlertModal : "";
  // }

  useEffect(() => {
    unsubscribe();
}, []);

  //console.log("isConnected: ", isConnected)
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
     
      {/* <IsConnected /> */}
      <NavigationContainer ref={navigationRef}>
        <AlertModal showalert={isConnected} content={ "You are connected to " + connectionType + "!"} />
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