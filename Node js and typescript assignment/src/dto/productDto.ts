import { v4 as uuidv4 } from 'uuid';

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const createProductDTO = (name: string, description: string, price: number): ProductDTO => {
  return {
    id: uuidv4(),
    name,
    description,
    price,
  };
};