import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Platform, StatusBar } from 'react-native';
import ProductCard from './components/ProductCard';
import { fetchAllProducts } from './api/productAPI';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      if (products.length === 0) {
        setLoading(true);
        const data = await fetchAllProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setError('ไม่พบข้อมูลสินค้า');
        }
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFilter = (filterType) => {
    setFilter(filterType);
    if (filterType === 'All') {
      setFilteredProducts(products);
    } else {
      const inStockProducts = products.filter(product => parseInt(product.stock) > 0);
      setFilteredProducts(inStockProducts);
    }
  };

  const totalProducts = products.length;
  const inStockProducts = products.filter(p => parseInt(p.stock) > 0).length;

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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
          onPress={() => handleFilter('All')}
        >
          <Text style={filter === 'All' ? styles.activeFilterText : styles.filterText}>
            All ({totalProducts})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'IN STOCK' && styles.activeFilter]}
          onPress={() => handleFilter('IN STOCK')}
        >
          <Text style={filter === 'IN STOCK' ? styles.activeFilterText : styles.filterText}>
            IN STOCK ({inStockProducts})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              pic={product.pic}
            />
          ))
        ) : (
          <Text style={styles.noProductsText}>ไม่พบสินค้าตามเงื่อนไขที่เลือก</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6e9',
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
  scrollContent: {
    padding: 15,
    paddingTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    fontWeight: '500',
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default App;
