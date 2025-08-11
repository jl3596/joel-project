export interface Product {
  id: number;
  category: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  categoryColor: string;
}


export interface ProductsData {
  lastUpdate: string;
  products: Product[];
}