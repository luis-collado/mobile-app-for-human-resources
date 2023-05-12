import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 30,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d5bf19',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderColor: '#d5bf19',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  dateInputContainer: {
    fontSize: 16,
    borderColor: '#d5bf19',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  dateInput: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#d5bf19',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonBack: {
    backgroundColor: '#d5bf19',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    color:"#ffffff",
  },
});

export default styles;


