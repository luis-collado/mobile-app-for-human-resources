import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
      paddingTop: 60,
      flexDirection: 'column',
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignItems: 'flex-start',
      textAlign: 'left',
    },
    fieldContainer: {
      flexDirection: 'column',
      borderBottomColor: '#d5bf19',
      borderBottomWidth: 1,
      marginBottom: 15,
    },
    fieldLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomColor: '#d5bf19',
      marginRight: 10,
    },
    fieldValue: {
      fontSize: 20,
      borderBottomColor: '#d5bf19',
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
      width: '45%',
      marginRight: '5%',
    },
    updateCVButton: {
      backgroundColor: '#d5bf19',
        width: '45%',
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
    updateProfilePhotoButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#d5bf19',
      marginBottom: 20,
      width: '45%'
    },
  });

  
  export default styles;