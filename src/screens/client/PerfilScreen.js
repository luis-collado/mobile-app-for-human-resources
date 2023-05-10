import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import styles from '../../styles/client/PerfilScreenStyles';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { usePerfilScreenController } from '../../controllers/client/PerfilScreenController';

const MiPerfilScreen = ({ route, navigation }) => {
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
  } = usePerfilScreenController(route, navigation);;

  // Aquí va todo tu código de renderizado JSX
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.profileImage}
            source={
              userData && userData.foto_perfil
                ? { uri: userData.foto_perfil}
                : require('../../assets/logo.png') // Reemplaza con la ruta de la imagen predeterminada
            }
            //onError={(error) => console.log('Error al cargar la imagen:', error)}
          />
        </TouchableOpacity>
      </View>
      {userData && userData.CV && (
        <Button style={styles.botonCV}
          mode="contained"
          onPress={() => Linking.openURL(userData.CV)}
        >
          Ver CV
        </Button>        
      )}

        <Button
          style={styles.updateProfilePhotoButton}
          mode="contained"
          onPress={handleUpdateProfilePhoto}
        >
          Actualizar foto
        </Button>

        <Button
          style={styles.updateCVButton}
          mode="contained"
          onPress={handleUpdateCV}
        >
          Actualizar CV
        </Button>


        <Button
          style={styles.actualizarPerfilButton}
          mode="contained"
          onPress={() => navigation.navigate('ActualizarPerfilScreen', { email, userData })}
        >
          Actualizar perfil
        </Button>
      {loading && <Text>Cargando datos del usuario...</Text>}
      {error && <Text>Error al cargar los datos del usuario: {error}</Text>}
      {userData && (
        <>
          {/* Agrega la información y elementos de perfil aquí */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <Text style={styles.fieldValue}>{userData.Nombre}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo electrónico:</Text>
            <Text style={styles.fieldValue}>{email}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Referencia:</Text>
            <Text style={styles.fieldValue}>{userData.Referencia}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de alta:</Text>
            <Text style={styles.fieldValue}>{userData.Fecha_alta}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Apellidos:</Text>
            <Text style={styles.fieldValue}>{userData.Apellido1} {userData.Apellido2}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>NIF/NIE:</Text>
            <Text style={styles.fieldValue}>{userData.NIF_NIE}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Sexo:</Text>
            <Text style={styles.fieldValue}>{userData.Sexo}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Estado civil:</Text>
            <Text style={styles.fieldValue}>{userData.Estado_Civil}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de nacimiento:</Text>
            <Text style={styles.fieldValue}>{userData.Fecha_nacimiento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Edad:</Text>
            <Text style={styles.fieldValue}>{userData.Edad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Provincia de nacimiento:</Text>
            <Text style={styles.fieldValue}>{userData.Provincia_nacimiento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>País de nacimiento:</Text>
            <Text style={styles.fieldValue}>{userData.Pais_nacimiento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Dirección:</Text>
            <Text style={styles.fieldValue}>{userData.Direccion}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Número:</Text>
            <Text style={styles.fieldValue}>{userData.Numero}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Puerta:</Text>
            <Text style={styles.fieldValue}>{userData.Puerta}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Código postal:</Text>
            <Text style={styles.fieldValue}>{userData.Codigo_postal}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Municipio:</Text>
            <Text style={styles.fieldValue}>{userData.Municipio}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Provincia:</Text>
            <Text style={styles.fieldValue}>{userData.Provincia}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <Text style={styles.fieldValue}>{userData.Telefono}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono 2:</Text>
            <Text style={styles.fieldValue}>{userData.Telefono2}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo electrónico:</Text>
            <Text style={styles.fieldValue}>{email}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Whatsapp:</Text>
            <Text style={styles.fieldValue}>{userData.Whatsapp}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de inscripción SERVEF:</Text>
            <Text style={styles.fieldValue}>{userData.Fecha_inscripcion_SERVEF}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>NAF:</Text>
            <Text style={styles.fieldValue}>{userData.NAF}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Estado:</Text>
            <Text style={styles.fieldValue}>{userData.Estado}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nivel formativo:</Text>
            <Text style={styles.fieldValue}>{userData.Nivel_formativo}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Detalle del nivel formativo:</Text>
            <Text style={styles.fieldValue}>{userData.Detalle_nivel_formativo}</Text>
          </View>


          {/* Agrega aquí otros campos que desees mostrar */}
        </>
      )}
      
 
      <FAB
        style={styles.fab}
        icon="logout"
        onPress={handleLogout}
        label="Cerrar sesión"
      />
    </ScrollView>
  );
};
  
export default MiPerfilScreen;
  