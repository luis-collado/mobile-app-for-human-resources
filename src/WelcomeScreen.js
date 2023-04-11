import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MisOfertas from './MyOffers';
import Ofertas from './BlankScreen';
import MiPerfil from './PerfilScreen';

const Tab = createBottomTabNavigator();

const WelcomeText = ({ route }) => {
   // const { email } = route.params;
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>¡Bienvenido a la app!</Text>
      </View>
    );
  }
  

const WelcomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MisOfertas"
        component={MisOfertas}
        options={{headerTitle: WelcomeText}}
      />
      <Tab.Screen
        name="Ofertas"
        component={Ofertas}
        options={{headerTitle: WelcomeText}}
      />
      <Tab.Screen
        name="MiPerfil"
        component={MiPerfil}
        options={{headerTitle: WelcomeText}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
