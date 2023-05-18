import React,{useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, StyleSheet, View } from 'react-native'

import HomeStackNavigator from './stack-navigators/HomeStackNavigator'
import BookStackNavigator from './stack-navigators/BookStackNavigator'
import ContactStackNavigator from './stack-navigators/ContactStackNavigator'
import MyRewardsStackNavigator from './stack-navigators/MyRewardsStackNavigator'
import LocationsStackNavigator from './stack-navigators/LocationsStackNavigator'
import { routes, screens } from './RouteItems'

import '../locales/index';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator()

const tabOptions = ({ route }) => {
  const item = routes.find(routeItem => routeItem.name === route.name)
  const {t} = useTranslation();
  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{ width: 0 }} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: ()=> {t('navigation.'+ item.title)},
    }
  }

  return {
    tabBarIcon: ({ focused }) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{t('navigation.'+ item.title) || ''}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  }
}

const BottomTabNavigator = () => {
// adding loacalization here
const {t, i18n} = useTranslation(); // destructure i18n here
const [open, setOpen] = useState(false);
const [value, setValue] = useState('en');
const [items, setItems] = useState([
  {label: 'English', value: 'en'},
  {label: 'Español', value: 'es'},
]);
useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name={screens.HomeStack} component={HomeStackNavigator} />
      <Tab.Screen name={screens.BookStack} component={BookStackNavigator} />
      <Tab.Screen name={screens.ContactStack} component={ContactStackNavigator} />
      <Tab.Screen name={screens.MyRewardsStack} component={MyRewardsStackNavigator} />
      <Tab.Screen name={screens.LocationsStack} component={LocationsStackNavigator} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  tabContainer: {
    height: 60,
  }
})

export default BottomTabNavigator
