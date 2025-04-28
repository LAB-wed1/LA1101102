import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// ProductCard component รับ props ตามที่โจทย์กำหนด
const ProductCard = ({ id, name, price, stock, cate, pic }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pic }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.category}>{cate}</Text>
        <Text style={styles.price}>ราคา: ฿{price}</Text>
        <Text style={styles.stock}>สินค้าคงเหลือ: {stock}</Text>
      </View>
    </View>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  cate: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
};

// กำหนดสไตล์ของ ProductCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#e91e63',
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;
