import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import BlankScreen from './src/BlankScreen';
import OfferDetailsScreen from './src/OfferDetailsScreen';
import WelcomeScreen from './src/WelcomeScreen'; // Asegúrate de importar correctamente el archivo WelcomeScreen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlankScreen"
          component={BlankScreen}
          options={{headerShown: false}}
        />
        
        
        <Stack.Screen
          name="OfferDetailsScreen"
          component={OfferDetailsScreen}
          options={{title: 'Detalles de la oferta'}}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

