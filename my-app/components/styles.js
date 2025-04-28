// components/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
  },
  price: {
    fontSize: 16,
    color: 'red',
    marginTop: 4,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'left',
  },
});

export default styles;