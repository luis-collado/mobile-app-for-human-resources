import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles/admin/AdminProfilesStyles';

import useAdminProfilesController from '../../controllers/admin/AdminProfilesController';

const AdminProfilesScreen = () => {
  const {
    users,
    selectedUser,
    handleSelectUser,
    handleGoBack,
    handleOpenCv,
  } = useAdminProfilesController();

  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };


  if (selectedUser) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Detalles del usuario seleccionado */}
          <Text style={styles.title}>{selectedUser.nombre}</Text>
          <Text style={styles.description}>{selectedUser.correo}</Text>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: selectedUser.foto_perfil }}
            />
            <Button onPress={() => handleOpenCv(selectedUser.CV)} style={styles.cvButton} color="#d5bf19">
              Ver CV
            </Button>
          </View>
          {Object.entries(selectedUser)
            .filter(([key]) => key !== 'nombre' && key !== 'correo' && key !== 'foto_perfil' && key !== 'CV' && key !== 'mis_ofertas')
            .map(([key, value]) => (
              <Text style={styles.info} key={key}>
                {key}: {value}
              </Text>
          ))}
          <Button onPress={handleGoBack} style={styles.button}>
            Volver
          </Button>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Perfiles de usuarios</Text>
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.userContainer}
              onPress={() => handleSelectUser(user)}
            >
              <Text style={styles.userName}>{user.Nombre+" "+user.Apellido1 + " " + user.Apellido2}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FAB
          style={styles.fab}
          icon="logout"
          onPress={handleLogout}
          label="Cerrar sesión"
        />
      </ScrollView>
    );
  }
};


    
    export default AdminProfilesScreen;
