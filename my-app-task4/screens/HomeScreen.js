import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  // Sample product data - in a real app, this would come from an API
  const products = [
    { id: '1', name: 'Smartphone', price: '799', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Laptop', price: '1299', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Headphones', price: '199', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Smartwatch', price: '299', image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Tablet', price: '499', image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Camera', price: '699', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Featured Products</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;
