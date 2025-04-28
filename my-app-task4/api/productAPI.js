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
    
    if (Array.isArray(data)) {
      return data;
    }

    // Fallback to mock data if API response is not as expected
    return getMockData(pageNo);
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return getMockData(pageNo);
  }
};

const getMockData = (pageNo) => {
  switch (pageNo) {
    case 1:
      return [
        {
          "id": "1",
          "name": "Pantene แพนทีน มิราเคิล คริสตัล สมูท แชมพู+ครีมนวดผม 500 มล.",
          "price": "599",
          "stock": "2",
          "cate": "ผลิตภัณฑ์ดูแลผม",
          "pic": "https://medias.watsons.co.th/publishing/WTCTH-307348-front-prodcat.jpg?version=1733863582"
        },
        {
          "id": "2",
          "name": "ลอรีอัล ปารีส เอลแซฟ เอ็กซ์ตรอว์ดินารี่ ออยล์ 100 มล.",
          "price": "259",
          "stock": "10",
          "cate": "ผลิตภัณฑ์ดูแลผม",
          "pic": "https://www.kaceebest.com/media/cache/27/6f/276f552b16f7feb09c18af8fe8b43929.webp"
        },
        {
          "id": "3",
          "name": "Microsoft Surface Pro 7 Laptop with Type Cover",
          "price": "38900",
          "stock": "5",
          "cate": "Computer",
          "pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxD1UwgMhO0ho8pF-XUHqu7HmA45GC3MrzsA&s"
        },
        {
          "id": "4",
          "name": "Desktop PC DELL Optiplex 3080SFF-SNS38SF001",
          "price": "14400",
          "stock": "3",
          "cate": "Computer",
          "pic": "https://itsolution.co.th/pub/media/catalog/product/cache/72300cec7bf174e0262804536ee1e9f4/d/e/desktop_pc_dell_optiplex_3080sff-sns38sf001_vst_.jpg"
        },
        {
          "id": "5",
          "name": "ซัมซุง ตู้เย็น 2 ประตู รุ่น RT20HAR1DSA/ST ขนาด 7.4 คิว",
          "price": "6990",
          "stock": "10",
          "cate": "เครื่องใช้ไฟฟ้า",
          "pic": "https://inwfile.com/s-g/2x3a5s.jpg"
        }
      ];
    case 2:
      return [
        {
          "id": "6",
          "name": "กระติกน้ำร้อนไฟฟ้า KT-1320",
          "price": "599",
          "stock": "8",
          "cate": "เครื่องใช้ไฟฟ้า",
          "pic": "https://media-cdn.bnn.in.th/157347/SHARP-KP-A28S-B-1-square_medium.jpg"
        },
        {
          "id": "7",
          "name": "ครีมบำรุงผิวหน้า OLAY Regenerist Micro-Sculpting Cream 50g.",
          "price": "1290",
          "stock": "11",
          "cate": "ผลิตภัณฑ์ดูแลผิวหน้า",
          "pic": "https://cf.shopee.co.th/file/c7d3f3c7b7e1a5e79a9c1b7d0b1c1d1f"
        },
        {
          "id": "8",
          "name": "โคคา-โคล่า แพ็ค 12 กระป๋อง",
          "price": "156",
          "stock": "15",
          "cate": "เครื่องดื่ม",
          "pic": "https://backend.tops.co.th/media/catalog/product/8/8/8851959132012.jpg"
        },
        {
          "id": "9",
          "name": "เครื่องซักผ้าฝาหน้า LG รุ่น FM1208N6W",
          "price": "11990",
          "stock": "2",
          "cate": "เครื่องใช้ไฟฟ้า",
          "pic": "https://www.powerbuy.co.th/media/catalog/product/1/4/140023401001_1_1.jpg"
        },
        {
          "id": "10",
          "name": "น้ำดื่มเนสท์เล่เพียวไลฟ์ 1.5 ลิตร แพ็ค 6 ขวด",
          "price": "55",
          "stock": "0",
          "cate": "เครื่องดื่ม",
          "pic": "https://www.nestle.co.th/sites/g/files/pydnoa486/files/asset-library/publishingimages/brands/water/pure%20life/product_nestle-pure-life_6-bottles.png"
        }
      ];
    case 3:
      return [
        {
          "id": "11",
          "name": "สมาร์ททีวี Samsung 55 นิ้ว รุ่น UA55AU7700KXXT",
          "price": "15990",
          "stock": "4",
          "cate": "เครื่องใช้ไฟฟ้า",
          "pic": "https://images.samsung.com/is/image/samsung/p6pim/th/ua55au7700kxxt/gallery/th-uhd-au7000-ua55au7700kxxt-531825793?$650_519_PNG$"
        },
        {
          "id": "12",
          "name": "แอร์ Mitsubishi Electric รุ่น MS-JS13VF",
          "price": "12900",
          "stock": "0",
          "cate": "เครื่องใช้ไฟฟ้า",
          "pic": "https://www.mitsubishi-kye.com/wp-content/uploads/2020/01/MSZ-LN-VG-W-1.png"
        },
        {
          "id": "13",
          "name": "เฟนต้า น้ำอัดลม 1.45 ลิตร",
          "price": "28",
          "stock": "20",
          "cate": "เครื่องดื่ม",
          "pic": "https://static.bigc.co.th/media/catalog/product/cache/2/image/17f82f742ffe127f42dca9de82fb58b1/8/8/8851959142011_1.jpg"
        }
      ];
    default:
      return [];
  }
};

export const fetchAllProducts = async () => {
  try {
    let allProducts = [];
    let pageNo = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const products = await fetchProducts(pageNo);
      if (products && products.length > 0) {
        allProducts = [...allProducts, ...products];
        pageNo++;
      } else {
        hasMoreData = false;
      }
    }

    // Log the results for verification
    console.log('Total products loaded:', allProducts.length);
    const inStockProducts = allProducts.filter(item => parseInt(item.stock) > 0);
    console.log('Products in stock:', inStockProducts.length);
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
