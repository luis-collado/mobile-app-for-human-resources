import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import BlankScreen from './src/BlankScreen';
//import OfferDetailsScreen from './src/OfferDetailsScreen';
import WelcomeScreen from './src/WelcomeScreen'; // Asegúrate de importar correctamente el archivo WelcomeScreen
import ImageZoomScreen from './src/ImageZoomScreen';
import ActualizarPerfilScreen from './src/ActualizarPerfilScreen'; // Importa la pantalla creada
import PerfilScreen from './src/PerfilScreen';
import MyoffersScreen from './src/MyOffers';
import AdminScreen from './src/AdminScreen';
import OfertasAdmin from './src/admin/OfertasAdmin';
import PerfilesAdmin from './src/admin/PerfilesAdmin';
import CrearOfertas from './src/admin/CrearOfertas';



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
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ImageZoomScreen" 
          component={ImageZoomScreen} 
        />
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen}
          options={{ title: 'Perfil Screen' }}
        />
        <Stack.Screen
          name="ActualizarPerfilScreen"
          component={ActualizarPerfilScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyoffersScreen"
          component={MyoffersScreen}
          options={{ title: 'Mis Ofertas' }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{ title: 'Pantalla admin' ,headerShown: false}}
        />
        <Stack.Screen
          name="OfertasAdmin"
          component={OfertasAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PerfilesAdmin"
          component={PerfilesAdmin}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="CrearOfertas"
          component={CrearOfertas}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

