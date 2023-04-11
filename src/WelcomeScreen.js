import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MisOfertas from './BlankScreen';
import Ofertas from './BlankScreen';
import MiPerfil from './BlankScreen';

const Stack = createNativeStackNavigator();

const WelcomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MisOfertas" component={MisOfertas} />
        <Stack.Screen name="Ofertas" component={Ofertas} />
        <Stack.Screen name="MiPerfil" component={MiPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeScreen;
