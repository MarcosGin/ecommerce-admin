export class Products {
  id: number;
  title: string;
  description?: string;
  category = {
    id: '',
    name: '',
    icon: ''
  };
  mark = {
    id: '',
    name: ''
  };
  price: number;
  folder?: string;
  image?: string;
  stock: number;
  created_at = {
    date: '',
    timestamp: ''
  };
  updated_at = {
    date: '',
    timestamp: ''
  };
}
