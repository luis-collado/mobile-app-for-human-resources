import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
    title: {
      fontSize: 28,
      fontWeight: '600',
      marginBottom: 30,
      color: '#333',
      top: 20,
    },
    fieldContainer: {
      flexDirection: 'column',
      borderBottomColor: '#d5bf19',
      borderBottomWidth: 1,
      marginBottom: 20,
      paddingTop: 10,
    },
    fieldLabel: {
      fontSize: 18,
      fontWeight: '500',
      color: '#666',
      marginBottom: 10,
    },
    fieldValue: {
      fontSize: 22,
      color: '#444',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
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
      width: '50%',
      marginRight: '5%',
      padding: 10,
      borderRadius: 20,
    },
    updateCVButton: {
      backgroundColor: '#d5bf19',
      width: '50%',
      padding: 10,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginRight: '5%',
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#d5bf19', 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 116,
      height: 116,
      borderRadius: 58,
    },
    pdfWebView: {
      width: '100%',
      height: 400, 
      marginBottom: 30,
    },
    actualizarPerfilButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#d5bf19',
      marginBottom: 20,
      width: '50%',
      marginRight: '5%',
      padding: 10,
      borderRadius: 20,
    },
    updateProfilePhotoButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#d5bf19',
      marginBottom: 20,
      width: '50%',
      marginRight: '5%',
      padding: 10,
      borderRadius: 20,
    },
});

export default styles;
