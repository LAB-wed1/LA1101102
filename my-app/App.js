// App.js
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Image } from 'react-native';

const ProductCard = ({ title, price, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: imageUrl || 'https://reactjs.org/logo-og.png' }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* แสดง ProductCard ซ้ำ 4 ครั้ง */}
        <ProductCard title="Product" price="999" imageUrl="https://reactjs.org/logo-og.png" />
        <ProductCard title="Product" price="999" imageUrl="https://reactjs.org/logo-og.png" />
        <ProductCard title="Product" price="999" imageUrl="https://reactjs.org/logo-og.png" />
        <ProductCard title="Product" price="999" imageUrl="https://reactjs.org/logo-og.png" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4e6',
  },
  scrollContent: {
    padding: 15,
    alignItems: 'center',
  },
  card: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ffffff',
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
});