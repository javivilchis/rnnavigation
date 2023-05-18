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

  const unsubscribe = NetInfo.addEventListener(state => {});

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    setIsConnected(state.isConnected);
    setConnectionType(state.type);
  });

  useEffect(() => {
    unsubscribe();
}, []);

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
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