# React CRUD Application with PHP API

This project is a full CRUD (Create, Read, Update, Delete) application built with React for the frontend and PHP for the backend. The backend API manages product data and is designed to be consumed by the React application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [PHP](https://www.php.net/)
- A web server like [Apache](https://httpd.apache.org/) or [XAMPP](https://www.apachefriends.org/index.html) (optional, for easier PHP script management)
- [MySQL](https://www.mysql.com/) or any other compatible database

## Getting Started

### 1. Setting Up the React Frontend

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DavidAr55/react-crud.git
    cd react-crud
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the React development server:**

    ```bash
    npm start
    ```

    The React application will be served at `http://localhost:3000`.

### 2. Setting Up the PHP Backend API

1. **Clone or copy the PHP scripts to your server directory:**

    Place your PHP files (including the `productsModel.php` and the main script) in your server's document root, such as `htdocs` for XAMPP or `/var/www/html` for Apache.

2. **Create the MySQL Database and Table:**

    Run the following SQL commands in your MySQL database to set up the `products` table:

    ```sql
    CREATE DATABASE products_db;
    USE products_db;

    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(150) NOT NULL,
        price DECIMAL(10,2) NOT NULL
    );
    ```

3. **Run the PHP server:**

    If you're not using a full server stack like Apache or XAMPP, you can run the PHP built-in server in the directory containing your PHP files:

    ```bash
    php -S localhost:777
    ```

    Your API will be available at `http://localhost:777`.

## Consuming the API

### 1. GET: Retrieve Products

To retrieve a list of all products or a specific product by ID:

- **All Products:**

    ```http
    GET http://localhost:777/?id=
    ```

- **Specific Product:**

    ```http
    GET http://localhost:777/?id=PRODUCT_ID
    ```

### 2. POST: Create a New Product

To add a new product:

- **Request:**

    ```http
    POST http://localhost:777
    Content-Type: application/json

    {
        "name": "Product Name",
        "description": "Product Description",
        "price": "99.99"
    }
    ```

### 3. PUT: Update an Existing Product

To update a product by ID:

- **Request:**

    ```http
    PUT http://localhost:777
    Content-Type: application/json

    {
        "id": "PRODUCT_ID",
        "name": "Updated Product Name",
        "description": "Updated Product Description",
        "price": "99.99"
    }
    ```

### 4. DELETE: Delete a Product

To delete a product by ID:

- **Request:**

    ```http
    DELETE http://localhost:777
    Content-Type: application/json

    {
        "id": "PRODUCT_ID"
    }
    ```

## Conclusion

This project provides a basic foundation for a CRUD application using React for the frontend and a PHP-based API for the backend. Feel free to extend the functionality by adding more features or improving the existing ones. 

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.
