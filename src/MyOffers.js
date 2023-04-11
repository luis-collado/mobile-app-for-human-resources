import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyoffersScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Mis Ofertas</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
});

export default MyoffersScreen;
