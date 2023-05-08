import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      paddingTop: 60,
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left',
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      fontSize: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      paddingBottom: 4,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#d5bf19',
      alignSelf: 'flex-start',
    },
    buttonback: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left',
    },
  });

  export default styles;