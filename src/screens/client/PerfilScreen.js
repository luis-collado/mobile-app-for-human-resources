import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { FAB, Button } from 'react-native-paper';
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
//import ApiService from "./ApiService";
import { useIsFocused } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
//import * as Permissions from 'expo-permissions';





import { WebView } from 'react-native-webview'; // Importa el paquete



const MiPerfilScreen = ({route, navigation}) => {
  const {email} = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [email]);

  const handleImagePress = () => {
    navigation.navigate('ImageZoomScreen', {
      imageUrl: userData && userData.foto_perfil ? userData.foto_perfil : 'Ruta de la imagen predeterminada',
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadPhoto(result.assets[0]);
    }
  };

   // Función para subir la foto al servidor
   const uploadPhoto = async (uri) => {
    // ... Código para subir la foto usando la API ...
    if (!uri) {
      alert('Por favor, selecciona una foto primero');
      return;
    }
  
    console.log(uri);
    const apiUrl = 'https://uploadphotos-2b2k6woktq-nw.a.run.app/uploadPhotos';
    const email = 'test@gmail.com'; 
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', {
      uri: uri,
      type: 'image/jpg',
      name: 'file.jpg',
    });

    console.log(formData);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert('Foto actualizada correctamente');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al actualizar la foto:', error);
      alert(`Error al actualizar la foto: ${error.message}`);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://readuserdata-2b2k6woktq-nw.a.run.app/readUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [email, isFocused]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  
  //Actualizar foto
  const handleUpdateProfilePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      const { base64 } = result.assets[0];
      const base64Image = `data:image/jpeg;base64,${base64}`;
  
      const updateProfilePhoto = async (email, base64Image) => {
        const response = await fetch(
          "https://uploadphotos-2b2k6woktq-nw.a.run.app/uploadPhotos",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              photo: base64Image,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(
            `Error al actualizar la foto de perfil: ${response.statusText}`
          );
        }
  
        const data = await response.json();
        console.log("Foto de perfil actualizada", data);
        return data;
      };
  
      try { 
        await updateProfilePhoto(email,base64Image);
        await fetchData(); 
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };


  async function getPermissionAsync() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la biblioteca de medios');
    }
  }
  


 // Actualizar CV
 const updateCV = async (email, base64PDF) => {
  const response = await fetch('https://uploadcv-2b2k6woktq-nw.a.run.app/uploadCV', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      CV: base64PDF,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar el CV: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('CV actualizado', data);
  return data;
};

const handleUpdateCV = async () => {
  await getPermissionAsync();
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
  });

  if (result.type !== 'cancel') {
    try {
      if (Platform.OS === 'android') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Se necesitan permisos para leer el almacenamiento externo');
          return;
        }
      }

      console.log('Leyendo archivo como base64');
      let base64;

      if (Platform.OS === 'android') {
        // Leer el archivo en Android utilizando un Blob y FileReader
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        await new Promise((resolve) => {
          reader.onload = () => {
            base64 = reader.result.split(',')[1];
            resolve();
          };
        });
      } else {
        // Leer el archivo en iOS utilizando expo-file-system
        base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      console.log('Archivo leído como base64');

      const base64PDF = `data:application/pdf;base64,${base64}`;

      await updateCV(email, base64PDF);
      await fetchData();
    } catch (error) {
      console.error('Error al actualizar el CV:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  }
};





  
  
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    flexDirection: 'column',
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  fieldContainer: {
    flexDirection: 'column',
    borderBottomColor: '#d5bf19',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#d5bf19',
    marginRight: 10,
  },
  fieldValue: {
    fontSize: 20,
    borderBottomColor: '#d5bf19',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 20,
    backgroundColor: '#d5bf19',
  },
  botonCV: {
    alignSelf: 'flex-start',
    backgroundColor: '#d5bf19',
    marginBottom: 20,
    width: '45%',
    marginRight: '5%',
  },
  updateCVButton: {
    backgroundColor: '#d5bf19',
      width: '45%',
  },
  profileImageContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: '#d5bf19', // Color del borde (cámbialo según tus necesidades)
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pdfWebView: {
    width: '100%',
    height: 400, // Ajusta la altura según tus necesidades
    marginBottom: 20,
  },
  actualizarPerfilButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#d5bf19',
    marginBottom: 20,
    right: -190,
    top: -59,
    
  },
  updateProfilePhotoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#d5bf19',
    marginBottom: 20,
    width: '45%'
  },
});

export default MiPerfilScreen;


  