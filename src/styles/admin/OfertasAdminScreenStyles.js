import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    createButton: {
      alignSelf: 'flex-end',
    },
    contentContainer: {
      paddingBottom: 20,
    },
    offerContainer: {
      backgroundColor: '#b5b3b3',
      borderRadius: 10,
      padding: 10,
    marginBottom: 10,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000000',
    },
    description: {
      fontSize: 20,
      marginBottom: 10,
    fontWeight: '500',
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
    deleteButton: {
      backgroundColor: '#d5bf19',
      borderRadius: 10,
    },
});

export default styles;