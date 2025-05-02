// api/productAPI.js
export const fetchProducts = async (pageNo) => {
  try {
    const url = `https://it2.sut.ac.th/labexample/product.php?pageno=${pageNo}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Page ${pageNo} data:`, data);
    
    // API returns data in format { products: [...] }
    if (data && Array.isArray(data.products)) {
      return data.products;
    }
    
    return [];
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

export const fetchAllProducts = async () => {
  try {
    let allProducts = [];
    
    // Fetch first page
    const page1Products = await fetchProducts(1);
    allProducts = [...allProducts, ...page1Products];
    console.log('Page 1 products:', page1Products.length);
    
    // Fetch second page
    const page2Products = await fetchProducts(2);
    allProducts = [...allProducts, ...page2Products];
    console.log('Page 2 products:', page2Products.length);
    
    // Fetch third page
    const page3Products = await fetchProducts(3);
    allProducts = [...allProducts, ...page3Products];
    console.log('Page 3 products:', page3Products.length);

    console.log('Total products loaded:', allProducts.length);
    const inStockProducts = allProducts.filter(item => parseInt(item.stock) > 0);
    console.log('Products in stock:', inStockProducts.length);
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
