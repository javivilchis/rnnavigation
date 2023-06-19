import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'

import DropDownPicker from 'react-native-dropdown-picker';
import '../../locales/index';
import { useTranslation } from 'react-i18next';
import News from '../../components/News'
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

const Home = () => {
  const { t, i18n } = useTranslation(); // destructure i18n here
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('en');
  const [items, setItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
  ]);
  useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);

  return (

    <SafeAreaView>
      <View style={{ paddingVertical: 10, paddingHorizontal: 10, zIndex: 10 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          autoScroll={true}
          stickyHeader={true}
          placeholder="Select an item"
        />
      </View>
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 50 }}>
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>{t('home.title')}</Text>

          <News />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={Home} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
