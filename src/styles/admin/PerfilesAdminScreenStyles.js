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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
      },
      cvButton: {
        backgroundColor: '#d5bf19',
        alignSelf: 'center',
        borderRadius: 10,
      },
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
        backgroundColor: '#d5bf19',
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginBottom: 20,
      },
      });

      export default styles;