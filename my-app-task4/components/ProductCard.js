import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ProductCard = ({ name, price, stock, pic, onPress }) => {
  const handlePress = () => {
    console.log('Product pressed:', name); // เพิ่ม log เพื่อตรวจสอบการกด
    if (onPress) {
      onPress(name); // ส่งชื่อสินค้าไปยังฟังก์ชัน onPress
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.5} // ลดค่าลงเพื่อให้เห็นการกดชัดเจนขึ้น
    >
      <Image
        source={{ uri: pic }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>จำนวนคงเหลือ {stock}</Text>
      <Text style={styles.price}>฿{price}</Text>
    </TouchableOpacity>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  onPress: PropTypes.func,
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
