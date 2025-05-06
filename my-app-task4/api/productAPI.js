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
    let pageNo = 1;
    let hasMoreProducts = true;

    while (hasMoreProducts) {
      const pageProducts = await fetchProducts(pageNo);
      if (pageProducts.length === 0) {
        hasMoreProducts = false;
      } else {
        allProducts = [...allProducts, ...pageProducts];
        console.log(`Page ${pageNo} products:`, pageProducts.length);
        pageNo++;
      }
    }

    console.log('Total products loaded:', allProducts.length);
    const inStockProducts = allProducts.filter(item => parseInt(item.stock) > 0);
    console.log('Products in stock:', inStockProducts.length);
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
