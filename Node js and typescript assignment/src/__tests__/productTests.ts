import request from "supertest";
import { app } from '../index';
import { products } from "../controllers/productController";
import { createProductDTO } from "../dto/productDto";

describe('Get All Products API', () => {
    beforeEach(() => {
        products.length = 0;
    });

    // Test Case 1: Test the GET /get-products endpoint when products are available
    test('should return all products when products are available', async () => {
        products.push(
            createProductDTO('Product 1', 'Description 1', 10.99),
            createProductDTO('Product 2', 'Description 2', 19.99)
        );

        const response = await request(app).get('/product/get-products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('products');
        expect(response.body.products).toEqual(products);
    });

    // Test Case 2: Test the GET /get-products endpoint when no products are available
    test('should return an empty array if no products are available', async () => {
        const response = await request(app).get('/product/get-products');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('No products available');
    });
});

describe('Product API', () => {
    // Test Case 1: Test the POST /create-product endpoint with valid data
    test('should create a new product with valid data', async () => {
        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 19.99,
        };

        const response = await request(app)
            .post('/product/create-product')
            .send(productData);

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('product');
        const createdProduct = response.body.product;
        expect(createdProduct).toHaveProperty('id');
        expect(createdProduct.name).toBe(productData.name);
        expect(createdProduct.description).toBe(productData.description);
        expect(createdProduct.price).toBe(productData.price);
        const productInArray = products.find((p: { id: any; }) => p.id === createdProduct.id);
        expect(productInArray).toEqual(createdProduct);
    });

    test('should return an error if data is missing', async () => {
        const incompleteProductData = {
            description: 'Incomplete Product',
            price: 9.99,
        };

        const response = await request(app)
            .post('/product/create-product')
            .send(incompleteProductData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(
            'Please provide values for name, description, and price.'
        );
    });

    // Test Case 3: Test the POST /create-product endpoint with invalid price
    test('should return an error if the price is not a valid number', async () => {
        const invalidPriceProduct = {
            name: 'Invalid Price Product',
            description: 'This product has an invalid price',
            price: 'not-a-number',
        };

        const response = await request(app)
            .post('/product/create-product')
            .send(invalidPriceProduct);

        expect(response.status).toBe(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Please provide a valid price.');
    });

    // Test Case 4: Test the POST /create-product endpoint with negative price
    test('should return an error if the price is a negative number', async () => {
        const negativePriceProduct = {
            name: 'Negative Price Product',
            description: 'This product has a negative price',
            price: -10.99,
        };

        const response = await request(app)
            .post('/product/create-product')
            .send(negativePriceProduct);

        expect(response.status).toBe(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Please provide a valid price.');
    });

    // Test Case 5: Test the POST /create-product endpoint with large description
    test('should return an error if the description is too long', async () => {
        const longDescriptionProduct = {
            name: 'Long Description Product',
            description: 'a'.repeat(1001),
            price: 29.99,
        };

        const response = await request(app)
            .post('/product/create-product')
            .send(longDescriptionProduct);

        expect(response.status).toBe(400);

        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Description is too long.');
    });
})

describe('Get Product Details API', () => {
    beforeEach(() => {
        products.length = 0;
    });

    // Test Case 1: Test the GET /get-product/:id endpoint when the product exists
    test('should return product details when the product exists', async () => {
        const existingProduct = createProductDTO('Product 1', 'Description 1', 10.99);
        console.log(existingProduct)
        products.push(existingProduct);
        const response = await request(app).get(`/product/get-product-details/${existingProduct.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(existingProduct);
    });

    // Test Case 2: Test the GET /get-product/:id endpoint when the product does not exist
    test('should return an error when the product does not exist', async () => {
        const nonExistentProductId = 'non-existent-id';
        const response = await request(app).get(`/product/get-product-details/${nonExistentProductId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

    // Test Case 3: Test the GET /get-product/:id endpoint with a valid but non-existent product ID format
    test('should return an error with invalid product ID format', async () => {
        const invalidProductId = 'invalid-format';
        const response = await request(app).get(`/product/get-product-details/${invalidProductId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });
});

describe('Update Product API', () => {
    beforeEach(() => {
        products.length = 0;
    });

    // Test Case 1: Test the PUT /update-product/:id endpoint when the product exists
    test('should update the product when the product exists', async () => {
        const existingProduct = createProductDTO('Product 1', 'Description 1', 10.99);
        products.push(existingProduct);

        const updatedProductData = {
            name: 'Updated Product',
            description: 'Updated Description',
            price: 15.99,
        };

        const response = await request(app)
            .put(`/product/update-product/${existingProduct.id}`)
            .send(updatedProductData);

        expect(response.status).toBe(200);
        expect(products[0]).toEqual({ id: existingProduct.id, ...updatedProductData });
    });

    // Test Case 2: Test the PUT /update-product/:id endpoint when the product does not exist
    test('should return an error when the product does not exist', async () => {
        const nonExistentProductId = 'non-existent-id';

        const updatedProductData = {
            name: 'Updated Product',
            description: 'Updated Description',
            price: 15.99,
        };

        const response = await request(app)
            .put(`/product/update-product/${nonExistentProductId}`)
            .send(updatedProductData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

    // Test Case 3: Test the PUT /update-product/:id endpoint with invalid product ID format
    test('should return an error with invalid product ID format', async () => {
        const invalidProductId = 'invalid-format';
        const updatedProductData = {
            name: 'Updated Product',
            description: 'Updated Description',
            price: 15.99,
        };
        const response = await request(app)
            .put(`/product/update-product/${invalidProductId}`)
            .send(updatedProductData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

});

describe('Delete Product API', () => {
    beforeEach(() => {
        products.length = 0;
    });

    // Test Case 1: Test the DELETE /delete-product/:id endpoint when the product exists
    test('should delete the product when the product exists', async () => {
        const existingProduct = createProductDTO('Product 1', 'Description 1', 10.99);
        products.push(existingProduct);
        const response = await request(app).delete(`/product/delete-product/${existingProduct.id}`);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(0);
        expect(response.body).toEqual(existingProduct);
    });

    // Test Case 2: Test the DELETE /delete-product/:id endpoint when the product does not exist
    test('should return an error when the product does not exist', async () => {
        const nonExistentProductId = 'non-existent-id';

        const response = await request(app).delete(`/product/delete-product/${nonExistentProductId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

    // Test Case 3: Test the DELETE /delete-product/:id endpoint with invalid product ID format
    test('should return an error with invalid product ID format', async () => {
        const invalidProductId = 'invalid-format';
        const response = await request(app).delete(`/product/delete-product/${invalidProductId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

});