import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BlankScreen from './src/screens/client/BlankScreen';
//import OfferDetailsScreen from './src/OfferDetailsScreen';
import WelcomeScreen from './src/screens/client/WelcomeScreen'; // Asegúrate de importar correctamente el archivo WelcomeScreen
import ImageZoomScreen from './src/screens/client/ImageZoomScreen';
import ActualizarPerfilScreen from './src/screens/client/ActualizarPerfilScreen'; // Importa la pantalla creada
import PerfilScreen from './src/screens/client/PerfilScreen';
import MyoffersScreen from './src/screens/client/MyOffers';
import AdminScreen from './src/screens/admin/AdminScreen';
import OfertasAdmin from './src/screens/admin/OfertasAdmin';
import PerfilesAdmin from './src/screens/admin/PerfilesAdmin';
import CrearOfertas from './src/screens/admin/CrearOfertas';
import RecuperarContraseñaScreenEmail from './src/screens/RecuperarContraseñaScreenEmail';




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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActualizarPerfilScreen"
          component={ActualizarPerfilScreen}
          options={{ title: 'Pantalla actualizar perfil',headerShown: false}}
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
        <Stack.Screen
          name="RecuperarContraseñaScreenEmail"
          component={RecuperarContraseñaScreenEmail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

