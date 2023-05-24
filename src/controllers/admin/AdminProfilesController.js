import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useAdminProfilesController = (incomingUser) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(incomingUser || null);
  const navigation = useNavigation();

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

    if(incomingUser!=null){
    navigation.goBack();
    //setSelectedUser(null);
    incomingUser=null;
    }
    else{
    setSelectedUser(null);
    }
    
  };

  const handleOpenCv = (CV) => {
    if (!CV || CV.trim() === '') {
      Alert.alert('No contiene CV', 'El candidato aun no ha subido su CV.');
      return;
    }
  
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
