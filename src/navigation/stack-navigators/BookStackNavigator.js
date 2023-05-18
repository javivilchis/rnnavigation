import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import '../../locales/index';
import {useTranslation} from 'react-i18next';
import { screens } from '../RouteItems'

const Stack = createStackNavigator()

const Book = () => {
  const {t} = useTranslation();
  return(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Book screen!</Text>
    <Text>{t('dummyNamespace.medium')}</Text>
  </View>
)
}

const BookStackNavigator = () => {
  
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Book} component={Book} />
    </Stack.Navigator>
  )
}

export default BookStackNavigator
