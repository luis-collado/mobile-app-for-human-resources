import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    logo: {
      width: 150,
      height: 150,
    },
    title: {
      marginTop: 10,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    formContainer: {
      flexGrow: 2,
      paddingHorizontal: 30,
    },
    input: {
      marginBottom: 15,
    },
    button: {
      marginTop: 15,
      paddingVertical: 10,
      backgroundColor: '#d5bf19',
    },
    buttonLabel: {
      fontSize: 18,
    },
    backButton: {
      marginTop: 10,
    },
    backButtonLabel: {
      fontSize: 16,
      color: '#d5bf19',
    },
  });

  export default styles;