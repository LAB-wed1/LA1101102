import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from './styles';  // Fixed import path

const ProductCard = ({ title, price, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

export default ProductCard;