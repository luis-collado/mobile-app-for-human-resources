import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    backButton: {
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      alignSelf: 'center',
      marginBottom: 20,
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
  });

  export default styles;