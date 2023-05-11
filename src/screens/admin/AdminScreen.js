import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AdminOffersScreen from './AdminOffersScreen';
import AdminProfilesScreen from './AdminProfilesScreen';

import styles from '../../styles/admin/AdminStyles';




const Tab = createMaterialBottomTabNavigator();

const AdminScreen = (route) => {
  //const {email} = route.params;
  return (
    <PaperProvider>
      <Tab.Navigator
        initialRouteName="AdminOffersScreen"
        activeColor="#fff"
        inactiveColor="#A1A1A1"
        //initialParams={{email: email}}
        barStyle={{
          backgroundColor: '#d5bf19',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 0,
          width: '90%',
        }}
        shifting={false}>
        <Tab.Screen
          name="AdminOffersScreen"
          component={AdminOffersScreen}
          //initialParams={{email: email}}
          options={{
            tabBarLabel: 'AdminOffersScreen',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="sale"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AdminProfilesScreen"
          component={AdminProfilesScreen}
          options={{
            tabBarLabel: 'AdminProfilesScreen',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};


export default AdminScreen;
