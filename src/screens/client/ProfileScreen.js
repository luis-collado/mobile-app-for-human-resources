import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import styles from '../../styles/client/ProfileStyles';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useProfileScreenController } from '../../controllers/client/ProfileController';

const MiProfileScreen = ({ route, navigation }) => {
  const {
    userData,
    loading,
    error,
    refreshing,
    onRefresh,
    handleImagePress,
    pickImage,
    uploadPhoto,
    fetchData,
    handleLogout,
    handleUpdateProfilePhoto,
    getPermissionAsync,
    updateCV,
    handleUpdateCV,
    email,
  } = useProfileScreenController(route, navigation);;

  // Aquí va todo tu código de renderizado JSX
  return (
      
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <FAB
        style={styles.fab}
        icon="logout"
        onPress={handleLogout}
        label="Cerrar sesión"
      />
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              style={styles.profileImage}
              source={
                userData && userData.foto_perfil
                  ? { uri: userData.foto_perfil}
                  : require('../../assets/logo.png') // Reemplaza con la ruta de la imagen predeterminada
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          {userData && userData.CV && (
            <Button style={styles.botonCV}
              mode="contained"
              onPress={() => Linking.openURL(userData.CV)}
            >
             <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>Ver CV</Text>

            </Button>        
          )}

          <Button
            style={styles.updateCVButton}
            mode="contained"
            onPress={handleUpdateCV}
          >
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>Subir CV</Text>
          </Button>
        </View>

        <View style={styles.buttonRow}>
          <Button
          
            style={styles.updateProfilePhotoButton}
            mode="contained"
            onPress={handleUpdateProfilePhoto}
          >
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>Actualizar foto</Text>


          </Button>

          <Button
            style={styles.actualizarPerfilButton}
            mode="contained"
            onPress={() => navigation.navigate('UpdateProfileScreen', { email, userData })}
          >
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>Editar perfil</Text>
          </Button>
        </View>
        {loading && <Text>Cargando datos del usuario...</Text>}
            {error && <Text>Error al cargar los datos del usuario: {error}</Text>}
            {userData && (
            Object.entries(userData).map(([key, value]) => {
              // Filtra las claves que no deseas mostrar
              if (['mis_ofertas', 'foto_perfil', 'CV','Edad','Referencia','Fecha_alta'].includes(key)) {
                return null;
              }
              return (
                <View style={styles.fieldContainer} key={key}>
                  <Text style={styles.fieldLabel}>{key}:</Text>
                  <Text style={styles.fieldValue}>{value}</Text>
                </View>
              );
            })
          )}
      
    </ScrollView>
  );
};
  
export default MiProfileScreen;
  