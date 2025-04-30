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
    
    // Using optional chaining for cleaner code
    return Array.isArray(data?.products) ? data.products : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}; 