import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const useUpdateProfileController = (route, navigation) => {
  const { email, userData: initialUserData } = route.params;
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData]);

  const updateProfile = async () => {
    setError(null);

    const { mis_ofertas, foto_perfil, CV, ...updatedUserData } = userData;

    const requestBody = {
      email: email,
      userData: updatedUserData,
    };

    console.log('JSON enviado:', JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch('https://updateuserdata-2b2k6woktq-nw.a.run.app/updateUserData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody, null, 2),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      Alert.alert(
        'Perfil Modificado',
        'El perfil ha sido modificado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setError(error.message);
      console.log('Error al actualizar los datos:', error);
    }
  };

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return {
    userData,
    setUserData,
    error,
    setError,
    updateProfile,
    handleChange,
  };
};
