import React, { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';


export const usePerfilScreenController = (route, navigation) => {
  const {email} = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  // Aquí van todas tus funciones como onRefresh, handleImagePress, pickImage, uploadPhoto, fetchData, handleLogout, handleUpdateProfilePhoto, getPermissionAsync, updateCV, handleUpdateCV
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
    const apiUrl = 'https://uploadphotos-5eplrc7dka-nw.a.run.app/uploadPhotos';
    //const email = 'test@gmail.com'; 
  
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
          "https://uploadphotos-5eplrc7dka-nw.a.run.app/uploadPhotos",
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
        alert('Foto actualizada correctamente');
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
  const response = await fetch('https://uploadcv-5eplrc7dka-nw.a.run.app/uploadCV', {
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
        console.log('Archivo leído por android');
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
      Alert.alert("Su CV se ha actualizado con éxito")
    } catch (error) {
      console.error('Error al actualizar el CV:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  }
};

// Mover la llamada a useEffect aquí fuera de handleUpdateCV
useEffect(() => {
  if (isFocused) {
    fetchData();
  }
}, [email, isFocused]);

  return {
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
  };
};
