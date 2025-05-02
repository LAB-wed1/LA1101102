import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ProductCard = ({ name, price, stock, pic }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: pic }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>จำนวนคงเหลือ {stock}</Text>
      <Text style={styles.price}>฿{price}</Text>
    </View>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    marginTop: 5,
  },
});

export default ProductCard;
