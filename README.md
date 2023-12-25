## Task 7: API Documentation

### Running the Server Locally

1. Make sure you have Node.js and npm installed on your machine.
2. Clone the repository.
3. Navigate to the project directory.
4. Run the following commands in the terminal:

```bash
npm install
npm run dev
```

The server will start at http://localhost:8888.

### Available Endpoints

#### 1. Get All Products

- **Endpoint:** `GET /product`
- **Description:** Retrieve a list of all products.
- **Example Request:**
  ```bash
  curl http://localhost:8888/product
  ```
- **Example Response:**
  ```json
  {
    "success": true,
    "products": [
      {
        "id": "1a2b3c4d",
        "name": "Sample Product",
        "description": "This is a sample product.",
        "price": 19.99
      },
      // ... other products
    ]
  }
  ```

#### 2. Get Product Details

- **Endpoint:** `GET /product/:id`
- **Description:** Retrieve details of a specific product.
- **Example Request:**
  ```bash
  curl http://localhost:8888/product/1a2b3c4d
  ```
- **Example Response:**
  ```json
  {
    "id": "1a2b3c4d",
    "name": "Sample Product",
    "description": "This is a sample product.",
    "price": 19.99
  }
  ```

#### 3. Create a Product

- **Endpoint:** `POST /product`
- **Description:** Create a new product.
- **Example Request:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"New Product","description":"A new product.","price":29.99}' http://localhost:8888/product
  ```
- **Example Response:**
  ```json
  {
    "success": true,
    "product": {
      "id": "4e5f6g7h",
      "name": "New Product",
      "description": "A new product.",
      "price": 29.99
    }
  }
  ```

#### 4. Update a Product

- **Endpoint:** `PUT /product/:id`
- **Description:** Update an existing product.
- **Example Request:**
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Product","description":"An updated product.","price":39.99}' http://localhost:8888/product/4e5f6g7h
  ```
- **Example Response:**
  ```json
  {
    "id": "4e5f6g7h",
    "name": "Updated Product",
    "description": "An updated product.",
    "price": 39.99
  }
  ```

#### 5. Delete a Product

- **Endpoint:** `DELETE /product/:id`
- **Description:** Delete a product.
- **Example Request:**
  ```bash
  curl -X DELETE http://localhost:8888/product/4e5f6g7h
  ```
- **Example Response:**
  ```json
  {
    "id": "4e5f6g7h",
    "name": "Updated Product",
    "description": "An updated product.",
    "price": 39.99
  }
  ```

### Error Handling

- If an error occurs, the API will respond with a JSON object containing the `success` flag set to `false` and an error message.

### Note

- Ensure that you have valid JSON data in the request body for creating and updating products.
- The `id` parameter in the URL should be a valid UUID for product details, updating, and deleting.

This documentation provides a basic overview of the API. For detailed information, refer to the source code and comments in the respective files.

## Postman Collection: Return Journey

### Introduction

This Postman collection provides a set of requests to interact with the "Return Journey" API. The API allows you to manage products, including retrieving product lists, getting product details, creating, updating, and deleting products.

### Collection Details

- **Name:** Return Journey
- **Postman ID:** 2f195770-dae8-4ef4-bf75-4cd300a1b1f7
- **Schema:** [Postman Collection Schema v2.1.0](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)

### Requests

#### 1. Get Products

- **Endpoint:** `GET /product/get-products`
- **URL:** [http://localhost:8888/product/get-products](http://localhost:8888/product/get-products)
- **Method:** GET

#### 2. Get Product Details

- **Endpoint:** `GET /product/get-product-details/{productId}`
- **URL:** [http://localhost:8888/product/get-product-details/aa234f21-6551-482b-8d6e-cd475d0ff6a7](http://localhost:8888/product/get-product-details/aa234f21-6551-482b-8d6e-cd475d0ff6a7)
- **Method:** GET

#### 3. Create Product

- **Endpoint:** `POST /product/create-product`
- **URL:** [http://localhost:8888/product/create-product](http://localhost:8888/product/create-product)
- **Method:** POST
- **Body:**
  ```json
  {
    "name": "product 1 name",
    "description": "product 1 description",
    "price": "100"
  }
  ```

#### 4. Delete Product

- **Endpoint:** `DELETE /product/delete-product/{productId}`
- **URL:** [http://localhost:8888/product/delete-product/3cf3285c-db18-4c51-83a1-af7a59275e7b](http://localhost:8888/product/delete-product/3cf3285c-db18-4c51-83a1-af7a59275e7b)
- **Method:** DELETE

#### 5. Update Product

- **Endpoint:** `PUT /product/update-product/{productId}`
- **URL:** [http://localhost:8888/product/update-product/3cf3285c-db18-4c51-83a1-af7a59275e7b](http://localhost:8888/product/update-product/3cf3285c-db18-4c51-83a1-af7a59275e7b)
- **Method:** PUT
- **Body:**
  ```json
  {
    "description": "product 6666 description",
    "price": "100"
  }
  ```

### Instructions

1. Open Postman.
2. Import this collection using the Postman ID: `2f195770-dae8-4ef4-bf75-4cd300a1b1f7`.
3. Update the environment variables or request parameters if needed.
4. Execute the requests to interact with the "Return Journey" API.

Feel free to explore and test the API using these requests. If you encounter any issues, refer to the API documentation for more details.

The provided code includes Jest test cases for testing the API endpoints using the `supertest` library. The tests cover various scenarios for the "Get All Products," "Product," "Get Product Details," "Update Product," and "Delete Product" APIs. Below is an overview of the test cases:

### Get All Products API

1. **Test Case 1:** Checks the response when products are available.
2. **Test Case 2:** Checks the response when no products are available.

### Product API

1. **Test Case 1:** Tests the creation of a new product with valid data.
2. **Test Case 2:** Tests error handling when data is missing during product creation.
3. **Test Case 3:** Tests error handling when the price is not a valid number.
4. **Test Case 4:** Tests error handling when the price is a negative number.
5. **Test Case 5:** Tests error handling when the description is too long.

### Get Product Details API

1. **Test Case 1:** Checks the response when the product exists.
2. **Test Case 2:** Checks the response when the product does not exist.
3. **Test Case 3:** Checks the response with an invalid product ID format.

### Update Product API

1. **Test Case 1:** Tests the update of an existing product.
2. **Test Case 2:** Tests error handling when updating a non-existent product.
3. **Test Case 3:** Tests error handling with an invalid product ID format.

### Delete Product API

1. **Test Case 1:** Tests the deletion of an existing product.
2. **Test Case 2:** Tests error handling when deleting a non-existent product.
3. **Test Case 3:** Tests error handling with an invalid product ID format.

### Recommendations

1. Ensure that the test environment is set up correctly.
2. Review the error messages and responses to ensure they provide meaningful information.
3. Consider adding more test cases for edge cases or additional scenarios.
4. Update the test descriptions or comments for clarity if needed.
5. Regularly review and update the tests as the codebase evolves.

By following these recommendations, you can maintain a robust test suite to validate the functionality of your API endpoints.