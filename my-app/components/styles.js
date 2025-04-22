// components/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});

export default styles;