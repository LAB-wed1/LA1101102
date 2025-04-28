// App.js
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

// App Component หลัก
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* วนลูปแสดงสินค้าทั้งหมดโดยใช้ ProductCard */}
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            stock={item.stock}
            cate={item.cate}
            pic={item.pic}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// กำหนดสไตล์ของ App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6e9',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    padding: 10,
  },
});

export default App;
