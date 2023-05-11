import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    contentContainer: {
      paddingBottom: 20,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#e8e8e8',
      paddingHorizontal: 10,
      borderRadius: 5,
      height: 40,
    },
    dateInputContainer: {
      backgroundColor: '#e8e8e8',
      paddingHorizontal: 10,
      borderRadius: 5,
      height: 40,
      justifyContent: 'center',
    },
    dateInput: {
      fontSize: 16,
    },
    button: {
      alignSelf: 'stretch',
      marginBottom: 20,
      borderRadius: 10,
    },
  });

  export default styles;