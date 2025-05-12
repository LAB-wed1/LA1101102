import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
  useWindowDimensions,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useCart } from '../context/CartContext';
import { getCurrentUser } from '../api/firebase';

const CartScreen = ({ navigation }) => {
  const { 
    cartItems, 
    updateQuantity, 
    setDirectQuantity, 
    calculateTotal,
    saveCartToFirebase,
    removeFromCart,
    createOrder,
    loadCartFromFirebase,
    loading
  } = useCart();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    const refreshCart = async () => {
      try {
        console.log('Loading cart from Firebase...');
        await loadCartFromFirebase();
        console.log('Cart loading complete');
      } catch (error) {
        console.error('Error during cart refresh:', error);
        // Don't set loading to false here, as loadCartFromFirebase handles that
      }
    };
    
    refreshCart();
    
    const unsubscribe = navigation.addListener('focus', () => {
      refreshCart();
    });
    
    return unsubscribe;
  }, [navigation]);

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCartFromFirebase();
    setRefreshing(false);
  };

  const handleItemPress = (item) => {
    console.log("กำลังจะลบรายการสินค้า:", item);
    
    Alert.alert(
      "ลบสินค้า",
      `ต้องการลบ "${item.name}" ออกจากตะกร้าสินค้าหรือไม่?`,
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        {
          text: "ลบ",
          style: "destructive",
          onPress: () => {
            console.log("ผู้ใช้ยืนยันการลบสินค้า");
            
            // แสดงข้อความกำลังดำเนินการ
            const loadingAlert = Alert.alert(
              "กำลังลบสินค้า",
              "กำลังดำเนินการลบสินค้า โปรดรอสักครู่...",
              [{ text: "กำลังดำเนินการ...", style: "cancel" }]
            );
            
            // เรียกฟังก์ชันลบสินค้า
            handleRemoveItem(item);
          }
        }
      ]
    );
  };
  
  const handleRemoveItem = async (item) => {
    console.log("เริ่มกระบวนการลบสินค้า:", item);
    
    try {
      if (!item || !item.id) {
        console.error('Cannot remove item: Invalid item data', item);
        Alert.alert(
          "ข้อผิดพลาด",
          "ไม่สามารถลบสินค้าได้เนื่องจากข้อมูลไม่ถูกต้อง",
          [{ text: "ตกลง" }]
        );
        return;
      }

      setIsSaving(true);
      
      // Try to remove the item from the cart
      console.log("กำลังเรียกฟังก์ชัน removeFromCart...");
      const result = await removeFromCart(item);
      console.log('ผลลัพธ์การลบสินค้า:', result);
      
      setIsSaving(false);
      
      // Always refresh the cart from Firebase to ensure UI is consistent
      console.log("กำลังรีเฟรชข้อมูลตะกร้าสินค้า...");
      await loadCartFromFirebase();
      
      if (result) {
        console.log('ลบสินค้าสำเร็จ');
        Alert.alert(
          "ลบสินค้าสำเร็จ",
          `ลบ "${item.name || 'รายการสินค้า'}" ออกจากตะกร้าสินค้าแล้ว`,
          [{ 
            text: "ตกลง",
            onPress: () => {
              console.log('รีเฟรชข้อมูลตะกร้าอีกครั้งหลังลบสำเร็จ');
              // Force refresh cart from Firebase
              loadCartFromFirebase();
            }
          }]
        );
      } else {
        console.log('ลบสินค้าไม่สำเร็จ');
        Alert.alert(
          "ข้อผิดพลาด",
          "ไม่สามารถลบสินค้าได้ กรุณาลองใหม่อีกครั้ง",
          [{ text: "ตกลง" }]
        );
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบ:", error);
      
      setIsSaving(false);
      
      // Refresh the cart to ensure UI is consistent
      await loadCartFromFirebase();
      
      Alert.alert(
        "ข้อผิดพลาด",
        `เกิดข้อผิดพลาดในการลบสินค้า: ${error.message || error}`,
        [{ text: "ตกลง" }]
      );
    }
  };

  const handleSaveCart = async () => {
    const user = getCurrentUser();
    
    if (!user) {
      Alert.alert(
        "ต้องเข้าสู่ระบบก่อน",
        "กรุณาเข้าสู่ระบบก่อนทำการบันทึกตะกร้าสินค้า",
        [
          { 
            text: "ยกเลิก", 
            style: "cancel" 
          },
          { 
            text: "ไปที่หน้าเข้าสู่ระบบ", 
            onPress: () => navigation.navigate('Login') 
          }
        ]
      );
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("ตะกร้าว่าง", "กรุณาเพิ่มสินค้าในตะกร้าก่อนบันทึก");
      return;
    }

    try {
      setIsSaving(true);
      await saveCartToFirebase(cartItems);
      
      setIsSaving(false);
      Alert.alert(
        "บันทึกสำเร็จ",
        "บันทึกข้อมูลตะกร้าสินค้าลง Firebase สำเร็จแล้ว",
        [{ text: "ตกลง" }]
      );
    } catch (error) {
      setIsSaving(false);
      Alert.alert(
        "เกิดข้อผิดพลาด",
        "ไม่สามารถบันทึกข้อมูลตะกร้าสินค้าได้ กรุณาลองใหม่อีกครั้ง",
        [{ text: "ตกลง" }]
      );
    }
  };
  const handleOrder = async () => {
    console.log("เริ่มกระบวนการสั่งซื้อสินค้า");
    const user = getCurrentUser();
    
    if (!user) {
      console.log("ผู้ใช้ยังไม่ได้เข้าสู่ระบบ");
      Alert.alert(
        "ต้องเข้าสู่ระบบก่อน",
        "กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ",
        [
          { 
            text: "ยกเลิก", 
            style: "cancel" 
          },
          { 
            text: "ไปที่หน้าเข้าสู่ระบบ", 
            onPress: () => navigation.navigate('Login') 
          }
        ]
      );
      return;
    }

    if (cartItems.length === 0) {
      console.log("ตะกร้าสินค้าว่างเปล่า");
      Alert.alert("ตะกร้าว่าง", "กรุณาเพิ่มสินค้าในตะกร้าก่อนสั่งซื้อ");
      return;
    }

    console.log("แสดงกล่องยืนยันการสั่งซื้อ");
    Alert.alert(
      "ยืนยันการสั่งซื้อ",
      `คุณต้องการสั่งซื้อสินค้าทั้งหมด ${cartItems.length} รายการ เป็นเงิน ฿${formatPrice(calculateTotal())} ใช่หรือไม่?`,
      [
        {
          text: "ยกเลิก",
          style: "cancel",
          onPress: () => console.log("ผู้ใช้ยกเลิกการสั่งซื้อ")
        },
        {
          text: "ยืนยัน",
          onPress: async () => {
            try {
              console.log("ผู้ใช้ยืนยันการสั่งซื้อ");
              setIsOrdering(true);
              
              // Show processing alert
              Alert.alert(
                "กำลังดำเนินการ",
                "กำลังสร้างคำสั่งซื้อและบันทึกข้อมูล กรุณารอสักครู่...",
                [{ text: "กำลังดำเนินการ...", style: "cancel" }]
              );
              
              console.log("กำลังเรียกฟังก์ชัน createOrder...");
              const result = await createOrder();
              console.log("ผลลัพธ์การสร้างคำสั่งซื้อ:", result);
              
              setIsOrdering(false);
              
              if (result) {
                console.log("สร้างคำสั่งซื้อสำเร็จ");
                // Force reload cart data from Firebase to ensure it's empty
                console.log("กำลังรีเฟรชข้อมูลตะกร้าสินค้า...");
                await loadCartFromFirebase();
                
                Alert.alert(
                  "สั่งซื้อสำเร็จ",
                  "ระบบได้บันทึกคำสั่งซื้อของคุณเรียบร้อยแล้ว และลบสินค้าออกจากตะกร้าแล้ว",
                  [{ 
                    text: "ตกลง",
                    onPress: () => {
                      console.log("รีเฟรชข้อมูลตะกร้าอีกครั้งหลังสั่งซื้อสำเร็จ");
                      loadCartFromFirebase();
                    }
                  }]
                );
              } else {
                console.log("สร้างคำสั่งซื้อไม่สำเร็จ");
                Alert.alert(
                  "เกิดข้อผิดพลาด",
                  "ไม่สามารถสร้างคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง",
                  [{ text: "ตกลง" }]
                );
              }
            } catch (error) {
              console.error("เกิดข้อผิดพลาดในการสั่งซื้อ:", error);
              setIsOrdering(false);
              Alert.alert(
                "เกิดข้อผิดพลาด",
                `เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ: ${error.message || error}`,
                [{ text: "ตกลง" }]
              );
            }
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => {
    if (!item || !item.id) {
      console.log('Skipping invalid cart item:', item);
      return null;
    }

    const itemName = item.name || 'รายการสินค้า';
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;

    return (
      <View style={styles.cartItem}>
        <View style={styles.itemImageContainer}>
          {item.pic ? (
            <Image 
              source={{ uri: item.pic }} 
              style={styles.itemImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImagePlaceholder}>
              <Text style={styles.noImageText}>ไม่มีรูป</Text>
            </View>
          )}
        </View>
        
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{itemName}</Text>
          <Text style={styles.itemPrice}>฿{formatPrice(itemPrice)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <View style={styles.quantityControl}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.quantityInput}
              value={itemQuantity.toString()}
              onChangeText={(value) => setDirectQuantity(item.id, value)}
              keyboardType="numeric"
              maxLength={3}
              selectTextOnFocus
            />
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.deleteButtonText}>ลบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // Add local error state handling from CartContext
  const { error: cartError } = useCart();
  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูลตะกร้าสินค้า...</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            console.log('Manually retrying cart load');
            loadCartFromFirebase();
          }}
        >
          <Text style={styles.retryText}>ลองใหม่</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (cartError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{cartError}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            console.log('Retrying after error');
            loadCartFromFirebase();
          }}
        >
          <Text style={styles.retryText}>ลองใหม่</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>ตะกร้าสินค้า</Text>
        
        {cartItems.length > 0 ? (
          <>
            <Text style={styles.helperText}>กดปุ่ม "ลบ" เพื่อลบสินค้าออกจากตะกร้า</Text>
            
            <FlatList
              data={cartItems.filter(item => item && item.id)}
              renderItem={renderCartItem}
              keyExtractor={(item) => {
                // Use a combination of IDs to ensure uniqueness
                if (!item) return `unknown_${Math.random()}`;
                return item.docId || item.cartId || item.id || `item_${Math.random()}`;
              }}
              style={styles.cartList}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                  <Text style={styles.emptyListText}>ไม่พบรายการสินค้าในตะกร้า</Text>
                </View>
              )}
            />
            
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>รวมทั้งสิ้น:</Text>
                <Text style={styles.totalAmount}>฿{formatPrice(calculateTotal())}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveCart}
                disabled={isSaving || cartItems.length === 0}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>บันทึกตะกร้าสินค้า</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.orderButton}
                onPress={handleOrder}
                disabled={isOrdering || cartItems.length === 0}
              >
                {isOrdering ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.orderButtonText}>สั่งซื้อสินค้า</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>ไม่มีสินค้าในตะกร้า</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>เลือกซื้อสินค้า</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  actionButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityInput: {
    textAlign: 'center',
    width: 40,
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
    marginTop: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#ff9500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },  
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  noImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 12,
    color: '#888',
  },
  emptyListContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CartScreen;
