import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center', // Centra los elementos en el eje vertical
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24, // Reducido el tamaño de la fuente
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
    fontSize: 16, // Reducido el tamaño de la fuente
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  fieldValue: {
    fontSize: 18, // Reducido el tamaño de la fuente
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
    width: '50%', // Reducido el ancho del botón
    marginRight: '5%',
    padding: 10,
    borderRadius: 20,
  },
  updateCVButton: {
    backgroundColor: '#d5bf19',
    width: '45%', // Reducido el ancho del botón
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
    width: '45%',
    marginRight: '5%',
    padding: 10,
    borderRadius: 20,
  },


  updateProfilePhotoButton:{
      alignSelf: 'flex-start',
      backgroundColor: '#d5bf19',
      marginBottom: 20,
      width: '50%',
      marginRight: '5%',
      padding: 10,
      borderRadius: 20,
    },
    buttonText: {
      fontSize: 12, // Comenzamos con un tamaño más pequeño
      flex: 1, // Aseguramos que el texto ocupe todo el espacio disponible
      textAlign: 'center', // Centramos el texto
      flexWrap: 'wrap', // Permitimos que el texto se envuelva en varias líneas si es necesario
    },
    
    
});

export default styles;
