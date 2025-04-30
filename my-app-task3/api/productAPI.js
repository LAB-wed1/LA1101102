// productAPI.js
export const fetchProducts = async () => {
  try {
    const url = 'https://it2.sut.ac.th/labexample/product.php';
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched data:', data);
    
    // API returns data in format { products: [...] }
    if (data && data.products && Array.isArray(data.products)) {
      return data.products;
    }
    
    
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}; 