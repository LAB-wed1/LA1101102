// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, View, Text, ActivityIndicator } from 'react-native';
import ProductCard from './components/ProductCard';
import { fetchProducts } from './api/productAPI';

// App Component หลัก
const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setError('ไม่พบข้อมูลสินค้า');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e91e63',
    textAlign: 'center',
  },
});

export default App;
