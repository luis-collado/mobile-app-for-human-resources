// src/controllers/admin/AdminProfilesScreenController.js

import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { Alert } from 'react-native';


const useAdminProfilesController = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readapplicants-2b2k6woktq-nw.a.run.app/readApplicants'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleGoBack = () => {
    setSelectedUser(null);
  };

  const handleOpenCv = (CV) => {
    // Comprueba si CV está vacío o es solo espacios en blanco
    if (!CV || CV.trim() === '') {
      Alert.alert('No contiene CV', 'El candidato aun no ha subido su CV.');  // Muestra una alerta si CV está vacío
      return;  // Sale de la función sin hacer nada más
    }
  
    // Intenta abrir el URL
    Linking.canOpenURL(CV).then(supported => {
      if (supported) {
        Linking.openURL(CV);
      } else {
        Alert.alert('Error', 'No se pudo abrir el CV: URL no válido');
      }
    }).catch(err => Alert.alert('Error', 'Ocurrió un error al abrir el CV'));
  };
  

  return {
    users,
    selectedUser,
    handleSelectUser,
    handleGoBack,
    handleOpenCv,
  };
};

export default useAdminProfilesController;
