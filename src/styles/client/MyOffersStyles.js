import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    },
    offerContainer: {
    backgroundColor: '#b5b3b3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    },
    pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    },
    titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    },
    title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    },
    contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    },
    description: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
    },
    detailsContainer: {
    alignSelf: 'flex-start',
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
    unsubscribeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderRadius: 10,
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
        fontSize: 15, // Reducido el tamaño de la fuente
        color: '#444',
      },
  
    });

    export default styles;