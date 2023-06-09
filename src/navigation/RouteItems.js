import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useTranslation} from 'react-i18next';
// import { i18n } from 'i18next';
export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  BookStack: 'BookStack',
  Book: 'Book',
  ContactStack: 'ContactStack',
  Contact: 'Contact',
  MyRewardsStack: 'MyRewardsStack',
  MyRewards: 'MyRewards',
  LocationsStack: 'LocationsStack',
  Locations: 'Locations',
  PreferencesStack: 'PreferencesStack',
  Preferences: 'Preferences'
}

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: "Home",
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? 'orange' : '#000'} />,
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: "Home",
    showInTab: true,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: "Home",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? 'purple' : '#000'} />,
  },

  {
    name: screens.BookStack,
    focusedRoute: screens.BookStack,
    title: 'Book Room',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="bed" size={30} color={focused ? 'purple' : '#000'} />,
  },

  {
    name: screens.Book,
    focusedRoute: screens.BookStack,
    title: 'Book Room',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="bed" size={30} color={focused ? 'purple' : '#000'} />,
  },

  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'Contact Us',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="phone" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.Contact,
    focusedRoute: screens.ContactStack,
    title: 'Contact Us',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="phone" size={30} color={focused ? 'purple' : '#000'} />,
  },

  {
    name: screens.MyRewardsStack,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.MyRewards,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? 'purple' : '#000'} />,
  },

  {
    name: screens.LocationsStack,
    focusedRoute: screens.LocationsStack,
    title: 'Locations',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.Locations,
    focusedRoute: screens.LocationsStack,
    title: 'Locations',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.PreferencesStack,
    focusedRoute: screens.PreferencesStack,
    title: 'Preferences',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? 'purple' : '#000'} />,
  },
  {
    name: screens.Preferences,
    focusedRoute: screens.PreferencesStack,
    title: 'Preferences',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? 'purple' : '#000'} />,
  },
]
