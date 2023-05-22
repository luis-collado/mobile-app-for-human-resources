import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 80,
    },
    contentContainer: {
      flexGrow: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    userContainer: {
      backgroundColor: '#b5b3b3',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    fieldLabel: {
      fontSize: 16, // Reducido el tamaño de la fuente
      fontWeight: '500',
      color: '#666',
      marginBottom: 10,
    },
    fieldContainer: {
      flexDirection: 'column',
      borderBottomColor: '#d5bf19',
      borderBottomWidth: 1,
      marginBottom: 20,
      paddingTop: 10,
    },
    userName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000000',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      description: {
        fontSize: 16,
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
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#d5bf19', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-60,
    marginBottom: 30,
    top: 15,
  },
  cvButton: {
    top: 60,
    position: 'absolute',
    backgroundColor: '#d5bf19',
    alignSelf: 'center',
    right: 30,
    borderRadius: 10,
    width: 150,  // Ancho del botón
    height: 50,  // Alto del botón
  },
  
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
        backgroundColor: '#d5bf19',
      },
      profileImage: {
        width: 116,
        height: 116,
        borderRadius: 58,
      },
      pageTitle: {
        fontSize: 24,
        top: -20,
        fontWeight: 'bold',
      },
      });

      export default styles;