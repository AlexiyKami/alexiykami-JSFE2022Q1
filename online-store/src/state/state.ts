import { ISmartphone, IProduct } from './../types/types';
export type Data = {
  products: ISmartphone[] | IProduct[]
}

let data: Data = {
  products: [
    {
      id: 0,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi Note 11s',
      color: 'Grey',
      year: 2022,
      quantity: 12,
      price: 349.99,
      numberOfCameras: 4,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/redmi-note-11s.jpg',
      isPopular: true,
    },
    {
      id: 1,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi Note 10s',
      color: 'Onyx',
      year: 2021,
      quantity: 30,
      price: 229.99,
      numberOfCameras: 4,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/redmi-note-10s.jpg',
      isPopular: false,
    },
    {
      id: 2,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone 13',
      color: 'Dark Night',
      year: 2021,
      quantity: 10,
      price: 999.99,
      numberOfCameras: 2,
      RAM: '4GB',
      memory: '128GB',
      imgSrc: 'img/iphone13.jpg',
      isPopular: true,
    },
    {
      id: 3,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy A52 SM-A525F/DS',
      color: 'Black',
      year: 2021,
      quantity: 0,
      price: 299.99,
      numberOfCameras: 4,
      RAM: '4GB',
      memory: '128GB',
      imgSrc: 'img/galaxyA52.jpg',
      isPopular: true,
    },
    {
      id: 4,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone 11',
      color: 'Black',
      year: 2019,
      quantity: 3,
      price: 549.99,
      numberOfCameras: 2,
      RAM: '4GB',
      memory: '64GB',
      imgSrc: 'img/iphone11.jpg',
      isPopular: false,
    },
    {
      id: 5,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi 9A',
      color: 'Grey',
      year: 2020,
      quantity: 30,
      price: 129.99,
      numberOfCameras: 1,
      RAM: '2GB',
      memory: '32GB',
      imgSrc: 'img/redmi-9a.jpg',
      isPopular: false,
    },
    {
      id: 6,
      brand: 'HONOR',
      type: 'Smartphone',
      name: 'X9',
      color: 'Silver',
      year: 2022,
      quantity: 25,
      price: 339.99,
      numberOfCameras: 4,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/honor-x9.jpg',
      isPopular: true,
    },
    {
      id: 7,
      brand: 'Huawei',
      type: 'Smartphone',
      name: 'nova Y70',
      color: 'Blue',
      year: 2022,
      quantity: 0,
      price: 199.99,
      numberOfCameras: 3,
      RAM: '4GB',
      memory: '128GB',
      imgSrc: 'img/huawei-y70.jpg',
      isPopular: true,
    },
    {
      id: 8,
      brand: 'ZTE',
      type: 'Smartphone',
      name: 'Blade A31 NFC',
      color: 'Grey',
      year: 2021,
      quantity: 50,
      price: 99.99,
      numberOfCameras: 1,
      RAM: '2GB',
      memory: '32GB',
      imgSrc: 'img/zte-blade-a31.jpg',
      isPopular: false,
    },
    {
      id: 9,
      brand: 'ZTE',
      type: 'Smartphone',
      name: 'Blade A51 NFC',
      color: 'Blue',
      year: 2021,
      quantity: 0,
      price: 129.99,
      numberOfCameras: 2,
      RAM: '2GB',
      memory: '64GB',
      imgSrc: 'img/zte-blade-a51.jpg',
      isPopular: false,
    },
    {
      id: 10,
      brand: 'POCO',
      type: 'Smartphone',
      name: 'X3 Pro',
      color: 'Black',
      year: 2021,
      quantity: 31,
      price: 599.99,
      numberOfCameras: 4,
      RAM: '8GB',
      memory: '256GB',
      imgSrc: 'img/poco-x3-pro.jpg',
      isPopular: true,
    },
    {
      id: 11,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone 12',
      color: 'Black',
      year: 2020,
      quantity: 15,
      price: 999.99,
      numberOfCameras: 2,
      RAM: '4GB',
      memory: '128GB',
      imgSrc: 'img/iphone12.jpg',
      isPopular: true,
    },
    {
      id: 12,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone 13 Pro',
      color: 'Silver',
      year: 2021,
      quantity: 24,
      price: 129.99,
      numberOfCameras: 3,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/iphone13pro.jpg',
      isPopular: true,
    },
    {
      id: 13,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi Note 10 Pro',
      color: 'Grey',
      year: 2021,
      quantity: 0,
      price: 349.99,
      numberOfCameras: 4,
      RAM: '8GB',
      memory: '128GB',
      imgSrc: 'img/redmi-note-10pro.jpg',
      isPopular: true,
    },
    {
      id: 14,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: '11 Lite 5G NE',
      color: 'Black',
      year: 2021,
      quantity: 30,
      price: 399.99,
      numberOfCameras: 3,
      RAM: '8GB',
      memory: '128GB',
      imgSrc: 'img/xiaomi-11-lite.jpg',
      isPopular: true,
    },
    {
      id: 15,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy S21 5G',
      color: 'White',
      year: 2021,
      quantity: 5,
      price: 899.99,
      numberOfCameras: 3,
      RAM: '8GB',
      memory: '256GB',
      imgSrc: 'img/galaxyS21.jpg',
      isPopular: true,
    },
    {
      id: 16,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy A12',
      color: 'Black',
      year: 2021,
      quantity: 0,
      price: 229.99,
      numberOfCameras: 4,
      RAM: '4GB',
      memory: '64GB',
      imgSrc: 'img/galaxyA12.jpg',
      isPopular: false,
    },
    {
      id: 17,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi 9T',
      color: 'Grey',
      year: 2021,
      quantity: 10,
      price: 249.99,
      numberOfCameras: 4,
      RAM: '4GB',
      memory: '128GB',
      imgSrc: 'img/redmi-9t.jpg',
      isPopular: false,
    },
    {
      id: 18,
      brand: 'Realme',
      type: 'Smartphone',
      name: '8',
      color: 'Silver',
      year: 2021,
      quantity: 37,
      price: 299.99,
      numberOfCameras: 4,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/realme8.jpg',
      isPopular: true,
    },
    {
      id: 19,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy M12 SM-M127F/DSN',
      color: 'Black',
      year: 2021,
      quantity: 35,
      price: 229.99,
      numberOfCameras: 4,
      RAM: '3GB',
      memory: '32GB',
      imgSrc: 'img/galaxyM12.jpg',
      isPopular: false,
    },
    {
      id: 20,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy S20 FE SM-G780G',
      color: 'Blue',
      year: 2020,
      quantity: 5,
      price: 449.99,
      numberOfCameras: 3,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/galaxyS20.jpg',
      isPopular: false,
    },
    {
      id: 21,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone SE',
      color: 'Black',
      year: 2020,
      quantity: 10,
      price: 549.99,
      numberOfCameras: 1,
      RAM: '3GB',
      memory: '64GB',
      imgSrc: 'img/iphone-se.jpg',
      isPopular: true,
    },
    {
      id: 22,
      brand: 'Samsung',
      type: 'Smartphone',
      name: 'Galaxy M32',
      color: 'Black',
      year: 2021,
      quantity: 20,
      price: 389.99,
      numberOfCameras: 4,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/galaxyM32.jpg',
      isPopular: false,
    },
    {
      id: 23,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Mi 11 Lite',
      color: 'Black',
      year: 2021,
      quantity: 15,
      price: 129.99,
      numberOfCameras: 3,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/mi11-lite.jpg',
      isPopular: true,
    },
    {
      id: 24,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone 12 mini',
      color: 'Black',
      year: 2021,
      quantity: 12,
      price: 799.99,
      numberOfCameras: 2,
      RAM: '4GB',
      memory: '64GB',
      imgSrc: 'img/iphone12mini.jpg',
      isPopular: false,
    },
    {
      id: 25,
      brand: 'POCO',
      type: 'Smartphone',
      name: 'F3',
      color: 'Black',
      year: 2021,
      quantity: 36,
      price: 449.99,
      numberOfCameras: 3,
      RAM: '8GB',
      memory: '128GB',
      imgSrc: 'img/poco-f3.jpg',
      isPopular: false,
    },
    {
      id: 26,
      brand: 'HONOR',
      type: 'Smartphone',
      name: '50',
      color: 'Dark Night',
      year: 2021,
      quantity: 21,
      price: 349.99,
      numberOfCameras: 4,
      RAM: '8GB',
      memory: '128GB',
      imgSrc: 'img/honor50.jpg',
      isPopular: true,
    },
    {
      id: 27,
      brand: 'Xiaomi',
      type: 'Smartphone',
      name: 'Redmi Note 8',
      color: 'Blue',
      year: 2021,
      quantity: 0,
      price: 449.99,
      numberOfCameras: 4,
      RAM: '4GB',
      memory: '64GB',
      imgSrc: 'img/redmi-note-8.jpg',
      isPopular: false,
    },
    {
      id: 28,
      brand: 'Apple',
      type: 'Smartphone',
      name: 'iPhone XR',
      color: 'Black',
      year: 2018,
      quantity: 0,
      price: 719.99,
      numberOfCameras: 1,
      RAM: '3GB',
      memory: '64GB',
      imgSrc: 'img/iphone-xr.jpg',
      isPopular: false,
    },
    {
      id: 29,
      brand: 'POCO',
      type: 'Smartphone',
      name: 'M4 Pro 5G',
      color: 'Black',
      year: 2021,
      quantity: 18,
      price: 299.99,
      numberOfCameras: 2,
      RAM: '6GB',
      memory: '128GB',
      imgSrc: 'img/poco-m4-pro.jpg',
      isPopular: true,
    },
  ],
}

export default data;