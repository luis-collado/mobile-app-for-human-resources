import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PerfilesAdmin = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Perfiles de usuarios</Text>
      </View>
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
    backgroundColor: '#fff',
    paddingTop: 60,
    flexDirection: 'column',
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 20,
    backgroundColor: '#d5bf19',
  },
});

export default PerfilesAdmin;