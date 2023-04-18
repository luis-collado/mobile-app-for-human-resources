import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking} from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview'; // Importa el paquete
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';



const MiPerfilScreen = ({route, navigation}) => {
  const {email} = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImagePress = () => {
    navigation.navigate('ImageZoomScreen', {
      imageUrl: userData && userData.foto_perfil ? userData.foto_perfil : 'Ruta de la imagen predeterminada',
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadPhoto(result.uri);
    }
  };

  // Función para manejar la selección de un nuevo PDF
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type !== 'cancel') {
      uploadPDF(result.uri);
    }
  };
   // Función para subir la foto al servidor
   const uploadPhoto = async (uri) => {
    // ... Código para subir la foto usando la API ...
  };

  // Función para subir el PDF al servidor
  const uploadPDF = async (uri) => {
    // ... Código para subir el PDF usando la API ...
  };

  useEffect(() => {
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

    fetchData();
  }, [email]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <View style={styles.actionButtonsContainer}>
        <Button
          style={styles.uploadPhotoButton}
          mode="contained"
          onPress={pickImage}
        >
          Subir foto
        </Button>
        {userData && userData.CV && (
          <Button
            style={styles.botonCV}
            mode="contained"
            onPress={() => Linking.openURL(userData.CV)}
          >
            Ver CV
          </Button>
        )}
        <Button
          style={styles.uploadPDFButton}
          mode="contained"
          onPress={pickDocument}
        >
          Subir PDF
        </Button>
      </View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.profileImage}
            source={
              userData && userData.foto_perfil
                ? { uri: userData.foto_perfil}
                : require('./logo.png') // Reemplaza con la ruta de la imagen predeterminada
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
          <Text style={styles.info}>Nombre: {userData.Nombre}</Text>
          <Text style={styles.info}>Correo electrónico: {email}</Text>
          <Text style={styles.info}>Referencia: {userData.Referencia}</Text>
          <Text style={styles.info}>Fecha de alta: {userData.Fecha_alta}</Text>
          <Text style={styles.info}>Apellidos: {userData.Apellido1 + userData.Apellido2}</Text>
          <Text style={styles.info}>NIF/NIE: {userData.NIF_NIE}</Text>
          <Text style={styles.info}>Sexo: {userData.Sexo}</Text>
          <Text style={styles.info}>Estado civil: {userData.Estado_Civil}</Text>
          <Text style={styles.info}>Fecha de nacimiento: {userData.Fecha_nacimiento}</Text>
          <Text style={styles.info}>Edad: {userData.Edad}</Text>
          <Text style={styles.info}>Provincia de nacimiento: {userData.Provincia_nacimiento}</Text>
          <Text style={styles.info}>País de nacimiento: {userData.Pais_nacimiento}</Text>
          <Text style={styles.info}>Dirección: {userData.Direccion}</Text>
          <Text style={styles.info}>Número: {userData.Numero}</Text>
          <Text style={styles.info}>Puerta: {userData.Puerta}</Text>
          <Text style={styles.info}>Código postal: {userData.Codigo_postal}</Text>
          <Text style={styles.info}>Municipio: {userData.Municipio}</Text>
          <Text style={styles.info}>Provincia: {userData.Provincia}</Text>
          <Text style={styles.info}>Teléfono: {userData.Telefono}</Text>
          <Text style={styles.info}>Teléfono 2: {userData.Telefono2}</Text>
          <Text style={styles.info}>Correo electrónico: {email}</Text>
          <Text style={styles.info}>Whatsapp: {userData.Whatsapp}</Text>
          <Text style={styles.info}>Fecha de inscripción SERVEF: {userData.Fecha_inscripcion_SERVEF}</Text>
          <Text style={styles.info}>NAF: {userData.NAF}</Text>
          <Text style={styles.info}>Estado: {userData.Estado}</Text>
          <Text style={styles.info}>Nivel formativo: {userData.Nivel_formativo}</Text>
          <Text style={styles.info}>Detalle del nivel formativo: {userData.Detalle_nivel_formativo}</Text>
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
    alignItems: 'flex-start', // Cambiar a 'flex-start' para alinear a la izquierda
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 60,
    flexDirection: 'column',
    paddingBottom: 80, // Agrega un espacio adicional al final del contenido
    paddingHorizontal: 20, // Agregar espacio horizontal
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Aumentar el margen inferior
    alignItems: 'flex-start',
    textAlign: 'left', // Cambiar a 'left' para alinear a la izquierda
  },
  info: {
    fontSize: 18,
    marginBottom: 15, // Aumentar el margen inferior para mayor separación entre campos
    alignItems: 'flex-start', // Alinear a la izquierda
    textAlign: 'left', // Alinear a la izquierda
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadPhotoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#d5bf19',
  },
  uploadPDFButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#d5bf19',
  },
});

export default MiPerfilScreen;


  