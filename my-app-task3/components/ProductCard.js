import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// ProductCard component รับ props ตามที่โจทย์กำหนด
const ProductCard = ({ id, name, price, stock, cate, pic }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: pic }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{name}</Text>
        <Text style={styles.category}>{cate}</Text>
        <Text style={styles.price}>฿{price}</Text>
        <Text style={styles.stock}>สินค้าคงเหลือ: {stock} ชิ้น</Text>
      </View>
    </View>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cate: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
};

// กำหนดสไตล์ของ ProductCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 6,
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;
