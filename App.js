import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OffersScreen from './src/screens/client/OffersScreen';
//import OfferDetailsScreen from './src/OfferDetailsScreen';
import WelcomeScreen from './src/screens/client/WelcomeScreen'; // Asegúrate de importar correctamente el archivo WelcomeScreen
import ImageZoomScreen from './src/screens/client/ImageZoomScreen';
import UpdateProfileScreen from './src/screens/client/UpdateProfileScreen'; // Importa la pantalla creada
import PerfilScreen from './src/screens/client/PerfilScreen';
import MyOffersScreen from './src/screens/client/MyOffersScreen';
import AdminScreen from './src/screens/admin/AdminScreen';
import OfertasAdmin from './src/screens/admin/OfertasAdmin';
import PerfilesAdmin from './src/screens/admin/PerfilesAdmin';
import CrearOfertas from './src/screens/admin/CrearOfertas';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';




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
          name="OffersScreen"
          component={OffersScreen}
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
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
          options={{ title: 'Pantalla actualizar perfil',headerShown: false}}
        />
        <Stack.Screen
          name="MyOffersScreen"
          component={MyOffersScreen}
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
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

