import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Platform, StatusBar, Alert } from 'react-native';
import ProductCard from './components/ProductCard';
import { fetchAllProducts } from './api/productAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
          // Log total products and in-stock products for debugging
          console.log('Total products:', data.length);
          const inStockCount = data.filter(item => parseInt(item.stock) > 0).length;
          console.log('Products in stock:', inStockCount);
        } else {
          console.log('No products loaded');
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    // ดึงข้อมูลสินค้าที่เคยบันทึกไว้
    const getSelectedProduct = async () => {
      try {
        const savedProduct = await AsyncStorage.getItem('selectedProduct');
        if (savedProduct !== null) {
          setSelectedProduct(savedProduct);
          console.log('พบสินค้าที่บันทึกไว้:', savedProduct);
        }
      } catch (error) {
        console.error('Error getting saved product:', error);
      }
    };

    loadProducts();
    getSelectedProduct();
  }, []);

  // Filter products based on stock
  const filteredProducts = filter === 'All'
    ? products
    : products.filter(product => parseInt(product.stock) > 0);

  // Create a function to handle product selection
  const handleProductPress = async (productName) => {
    try {
      // บันทึกชื่อสินค้าลงใน AsyncStorage
      await AsyncStorage.setItem('selectedProduct', productName);
      // อัพเดต state เพื่อแสดงผลทันที
      setSelectedProduct(productName);
      console.log('บันทึกสินค้า:', productName);
      
      // แสดง Alert เพื่อแจ้งผู้ใช้
      Alert.alert(
        'สำเร็จ',
        `บันทึกสินค้า "${productName}" ลงในอุปกรณ์แล้ว`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error saving product to AsyncStorage:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกชื่อสินค้าได้');
    }
  };

  // เพิ่มฟังก์ชันสำหรับลบข้อมูลสินค้าที่เลือกไว้
  const handleClearSelectedProduct = async () => {
    try {
      await AsyncStorage.removeItem('selectedProduct');
      setSelectedProduct(null);
      console.log('ลบข้อมูลสินค้าที่เลือกไว้แล้ว');
      
      // แสดง Alert เพื่อแจ้งผู้ใช้
      Alert.alert(
        'สำเร็จ',
        'ลบข้อมูลสินค้าที่เลือกไว้แล้ว',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error clearing selected product:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลสินค้าได้');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ส่วนปุ่มการคัดกรอง (Filter) */}
      <View style={styles.filterSection}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
          onPress={() => setFilter('All')}
        >
          <Text style={[styles.filterText, filter === 'All' && styles.activeFilterText]}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'IN STOCK' && styles.activeFilter]}
          onPress={() => setFilter('IN STOCK')}
        >
          <Text style={[styles.filterText, filter === 'IN STOCK' && styles.activeFilterText]}>IN STOCK</Text>
        </TouchableOpacity>
      </View>

      {/* ส่วนแสดงรายการสินค้า */}
      <View style={styles.productsSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                pic={product.pic}
                onPress={() => handleProductPress(product.name)}
              />
            ))
          ) : (
            <Text style={styles.noProductsText}>ไม่พบสินค้า</Text>
          )}
        </ScrollView>
      </View>

      {/* ส่วนแสดงรายการที่ผู้ใช้เลือก */}
      <View style={styles.selectedProductSection}>
        {selectedProduct ? (
          <Text style={styles.selectedProductText}>สินค้าที่เลือก: {selectedProduct}</Text>
        ) : (
          <Text style={styles.selectedProductText}>ยังไม่มีสินค้าที่เลือก</Text>
        )}
        {selectedProduct && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSelectedProduct}
          >
            <Text style={styles.clearButtonText}>CLEAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  // ส่วนของปุ่มคัดกรอง
  filterSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  activeFilter: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // ส่วนแสดงรายการสินค้า
  productsSection: {
    flex: 7,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 10,
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  // ส่วนแสดงรายการที่ผู้ใช้เลือก
  selectedProductSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  selectedProductText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
