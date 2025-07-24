export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  specs: Record<string, string>;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
