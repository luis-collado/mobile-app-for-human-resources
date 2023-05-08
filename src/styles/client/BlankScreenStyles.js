import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    offerContainer: {
      backgroundColor: '#b5b3b3',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    titleContainer: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000000',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 10,
    },
    description: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: '500',
    },
    detailsContainer: {
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
    info: {
      fontSize: 16,
      marginBottom: 5,
    },
    button: {
      alignSelf: 'stretch',
      marginBottom: 20,
      borderRadius: 10,
      
    },
    applyButtonColor: {
      alignSelf: 'stretch',
      backgroundColor: '#d5bf19', // Cambiar el color de fondo a verde
      marginBottom: 20,
      borderRadius: 10,
      color: 'white', // Cambiar el color del texto a blanco
    }
  });

  export default styles;