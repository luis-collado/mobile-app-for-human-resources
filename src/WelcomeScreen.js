import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MisOfertas from './MyOffers';
import Ofertas from './BlankScreen';
import MiPerfil from './PerfilScreen';

const Tab = createMaterialBottomTabNavigator();


const WelcomeText = ({route}) => {
  // const { email } = route.params;
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>¡Bienvenido a la app!</Text>
    </View>
  );
};

const WelcomeScreen = ({route}) => {
  const {email} = route.params;
  return (
    <PaperProvider>
      <Tab.Navigator
        initialRouteName="MisOfertas"
        activeColor="#fff"
        inactiveColor="#A1A1A1"
        barStyle={{
          backgroundColor: '#d5bf19',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 0, // Para Android
          width: '90%', // Ancho personalizado del menú de navegación, como porcentaje del ancho de la pantalla
        }}
        shifting={false}>
        <Tab.Screen
          name="MisOfertas"
          component={MisOfertas}
          options={{
            tabBarLabel: 'Mis Ofertas',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="cards-heart"
                color={color}
                size={24}
              />
            ),
            headerTitle: WelcomeText,
          }}
        />
        <Tab.Screen
          name="Ofertas"
          component={Ofertas}
          options={{
            tabBarLabel: 'Ofertas',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="sale"
                color={color}
                size={24}
              />
            ),
            headerTitle: WelcomeText,
          }}
        />
        <Tab.Screen
          name="MiPerfil"
          component={MiPerfil}
          initialParams={{email: email}}
          options={{
            tabBarLabel: 'Mi Perfil',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={24}
              />
            ),
            headerTitle: WelcomeText,
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;