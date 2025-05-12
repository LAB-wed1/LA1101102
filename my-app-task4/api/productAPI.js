// api/productAPI.js
import { 
  getCollection, 
  addDocument, 
  updateDocument, 
  getDocument 
} from './firebase';

// ฟังก์ชันดึงข้อมูลสินค้าจาก API ภายนอก
export const fetchProducts = async (pageNo) => {
  try {
    const url = `http://it2.sut.ac.th/labexample/product.php?pageno=${pageNo}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // API returns data in format { products: [...] }
    if (data && Array.isArray(data.products)) {
      console.log(`Page ${pageNo} data: ${data.products.length} products`);
      return data.products;
    }
    
    return [];
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

// ฟังก์ชันดึงข้อมูลสินค้าทั้งหมดจาก API ภายนอก
export const fetchAllProducts = async () => {
  try {
    // ก่อนอื่นพยายามดึงข้อมูลจาก Firebase
    const firebaseProducts = await getProductsFromFirebase();
    
    // ถ้ามีข้อมูลใน Firebase แล้ว ให้คืนค่าจาก Firebase
    if (firebaseProducts && firebaseProducts.length > 0) {
      console.log('Retrieved products from Firebase:', firebaseProducts.length);
      return firebaseProducts;
    }
    
    // ถ้าไม่มีข้อมูลใน Firebase ให้ดึงจาก API ภายนอก
    let allProducts = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    // Loop until we don't get any more products or reach a reasonable limit
    while (hasMorePages && currentPage <= 10) { // Setting a max of 10 pages for safety
      const pageProducts = await fetchProducts(currentPage);
      
      // If we get no products or empty array, stop fetching
      if (!pageProducts || pageProducts.length === 0) {
        hasMorePages = false;
      } else {
        // เพิ่ม ID ให้สินค้าแต่ละชิ้น
        const productsWithId = pageProducts.map(product => ({
          ...product,
          id: `product_${product.name}_${Date.now()}`
        }));
        
        allProducts = [...allProducts, ...productsWithId];
        console.log(`Page ${currentPage} products: ${pageProducts.length}`);
        currentPage++;
      }
    }

    console.log('Total products loaded:', allProducts.length);
    const inStockProducts = allProducts.filter(item => parseInt(item.stock) > 0);
    console.log('Products in stock:', inStockProducts.length);
    
    // บันทึกข้อมูลสินค้าลง Firebase สำหรับใช้ในครั้งต่อไป
    if (allProducts.length > 0) {
      saveProductsToFirebase(allProducts);
    }
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

// ฟังก์ชันบันทึกข้อมูลสินค้าลง Firebase
export const saveProductsToFirebase = async (products) => {
  try {
    // ตรวจสอบว่ามีสินค้าหรือไม่
    if (!products || products.length === 0) {
      console.warn('No products to save to Firebase');
      return false;
    }
    
    console.log(`Saving ${products.length} products to Firebase...`);
    
    // บันทึกข้อมูลสินค้าลง Firebase
    for (const product of products) {
      await addDocument('products', product);
    }
    
    console.log('Products saved to Firebase successfully');
    return true;
  } catch (error) {
    console.error('Error saving products to Firebase:', error);
    return false;
  }
};

// ฟังก์ชันดึงข้อมูลสินค้าจาก Firebase
export const getProductsFromFirebase = async () => {
  try {
    const products = await getCollection('products');
    return products;
  } catch (error) {
    console.error('Error getting products from Firebase:', error);
    return [];
  }
};

// ฟังก์ชันค้นหาสินค้าตาม ID
export const getProductById = async (productId) => {
  try {
    const product = await getDocument('products', productId);
    return product;
  } catch (error) {
    console.error(`Error getting product with ID ${productId}:`, error);
    return null;
  }
};

// ฟังก์ชันอัปเดตข้อมูลสินค้า
export const updateProduct = async (productId, productData) => {
  try {
    await updateDocument('products', productId, productData);
    return true;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    return false;
  }
};
