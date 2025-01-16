import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CartScreen, FavoritesScreen, OrderHistoryScreen, SettingsScreen } from '../screens';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home' 
    screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.container,
      tabBarBackground() {
          return (
            <BlurView 
              overlayColor='transparent'
              blurAmount={15}
              style={styles.BlurViewStyle}
            />
          )
      },
      tabBarIconStyle: styles.iconStyle,
    }}>
    <Tab.Screen 
      name='Settings' 
      component={SettingsScreen}
      options={{
        tabBarIcon: ({focused,size}) => (
          <Ionicons
          name="settings-sharp"
          size={size}
          style={{ color: focused ? '#D17842' : '#52555A' }}
          />        
        )
      }}
      />
      <Tab.Screen 
        name='History' 
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused,size}) => (
            <CustomIcon 
            name="bell" 
            size={size} 
            style={{ color: focused ? '#D17842' : '#52555A' }}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Favorites' 
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused,size}) => (
            <CustomIcon 
            name="like" 
            size={size} 
            style={{ color: focused ? '#D17842' : '#52555A' }}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Cart' 
        component={CartScreen}
        options={{
          tabBarIcon: ({focused,size}) => (
            <CustomIcon 
            name="cart" 
            size={size} 
            style={{ color: focused ? '#D17842' : '#52555A' }}
            />
          )
        }}
      />
        <Tab.Screen 
          name='Home' 
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused,size}) => (
              <CustomIcon 
              name="home" 
              size={size}
              style={{ color: focused ? '#D17842' : '#52555A' }}
              />
            )
          }}
        />
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
  container: {
    height: 80,
    position: 'absolute',
    backgroundColor: 'rgba(12,15,20,0.5)',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
