export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  category: string;
  rating: number;
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "floral print v-neck top",
    brand: "shaye",
    description: "A beautiful floral print v-neck top perfect for summer days",
    price: 2986,
    originalPrice: 4977,
    discountPercentage: 40,
    imageUrl: "https://assets.ajio.com/medias/sys_master/root/20240209/UUe4/65c6542805ac7d77bb4c05c5/-473Wx593H-467057476-peach-MODEL.jpg",
    category: "Tops",
    rating: 4.5
  },
  {
    id: "2",
    name: "morgan blouse",
    brand: "kazo",
    description: "Elegant morgan blouse with a modern twist",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0261/2386/2082/files/KZ01319YELLOWMULTI.jpg?v=1743161024",
    category: "Blouses",
    rating: 4.2
  },
  {
    id: "3",
    name: "white typographic printed regular tshirt",
    brand: "newme",
    description: "Casual white t-shirt with typographic print design",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://assets.newme.asia/wp-content/uploads/2025/03/041354491383b268/NM-IN-56-TSH-25-FEB-12787-WHITE_(1).webp",
    category: "T-Shirts",
    rating: 4.0
  },
  {
    id: "4",
    name: "women's grey cotton regular fit blouse",
    brand: "cotton world",
    description: "Comfortable grey cotton blouse with regular fit",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0261/2386/2082/files/KZ01319YELLOWMULTI.jpg?v=1743161024",
    category: "Blouses",
    rating: 4.3
  },
  {
    id: "5",
    name: "notch neck floral top",
    brand: "us polo",
    description: "Stylish notch neck top with floral pattern",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0617/2137/8986/files/1_3af581ca-5668-4c02-8237-7942cc9a9cd3.jpg?v=1713339496",
    category: "Tops",
    rating: 4.4
  },
  {
    id: "6",
    name: "spread collar chambray denim shirt",
    brand: "us polo",
    description: "Classic chambray denim shirt with spread collar",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0617/2137/8986/files/1_f5b86591-68dd-4cae-b315-66d67d262c87.jpg?v=1713339497",
    category: "Shirts",
    rating: 4.6
  },
  {
    id: "7",
    name: "cloudy grey women's denim jacket",
    brand: "freakins",
    description: "Trendy cloudy grey denim jacket for women",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0028/9806/7554/files/MadhuraJUry8167_03d9208c-eb7d-4952-98cf-25c972fcfe21.jpg?v=1732535428",
    category: "Jackets",
    rating: 4.7
  },
  {
    id: "8",
    name: "fiorella top ♡",
    brand: "girls dont dress for boys",
    description: "Cute and trendy fiorella top with heart design",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0796/2391/3771/files/A992E251-0BFC-4426-B131-FF84B9CF4BBC.jpg?v=1729621042",
    category: "Tops",
    rating: 4.8
  },
  {
    id: "9",
    name: "lapel collar drop shoulder cropped denim shirt",
    brand: "chemistry india",
    description: "Modern cropped denim shirt with lapel collar and drop shoulder design",
    price: 4500,
    originalPrice: 6000,
    discountPercentage: 25,
    imageUrl: "https://cdn.shopify.com/s/files/1/0605/1509/0592/files/CJ24AW005_2.jpg?v=1743502223",
    category: "Shirts",
    rating: 4.5
  },
  {
    id: "10",
    name: "black floral crop top",
    brand: "Casuals Inc.",
    description: "Stylish black crop top with floral pattern",
    price: 3200,
    originalPrice: 3200,
    discountPercentage: 0,
    imageUrl: "https://cdn.shopify.com/s/files/1/0539/7633/4528/products/image_36eb65a4-83bd-4a12-8fac-7d8189f0d564.jpg?v=1621949284",
    category: "Tops",
    rating: 4.3
  }
];

export const colors = {
  primary: "#ff444f",
  secondary: "#ff6666",
  tertiary: "#ff8888",
  quaternary: "#ffaaaa",
}