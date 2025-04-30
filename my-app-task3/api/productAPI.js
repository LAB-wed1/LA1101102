// productAPI.js
export const fetchProducts = async () => {
  try {
    const url = 'http://it2.sut.ac.th/labexample/product.php';
    console.log('Fetching from URL:', url);

    console.log('Starting fetch request...');
    const response = await fetch(url);
    console.log('Response received:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    const data = JSON.parse(text);
    console.log('Parsed data:', data);
    
    // Return the parsed data
    console.log('Returning data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}; 