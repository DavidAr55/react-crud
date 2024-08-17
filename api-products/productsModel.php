<?php
class ProductsModel {
    public $connection;

    public function __construct() {
        $this->connection = new mysqli('localhost', 'root', '', 'products');
        mysqli_set_charset($this->connection, 'utf8');
    }

    public function getProducts($id = null) {
        $where = ($id == null) ? "" : " WHERE id='$id'";
        $products = [];
        $sql = "SELECT * FROM products " . $where;
        $records = mysqli_query($this->connection, $sql);
        while($row = mysqli_fetch_assoc($records)) {
            array_push($products, $row);
        }
        return $products;
    }

    public function saveProduct($name, $description, $price) {
        $validation = $this->validateProduct($name, $description, $price);
        $result = ['error', 'A product with the same characteristics already exists'];
        if(count($validation) == 0) {
            $sql = "INSERT INTO products(name, description, price) VALUES('$name', '$description', '$price')";
            mysqli_query($this->connection, $sql);
            $result = ['success', 'Product saved'];
        }
        return $result;
    }

    public function updateProduct($id, $name, $description, $price) {
        $exists = $this->getProducts($id);
        $result = ['error', 'The product with ID ' . $id . ' does not exist'];
        if(count($exists) > 0) {
            $validation = $this->validateProduct($name, $description, $price);
            $result = ['error', 'A product with the same characteristics already exists'];
            if(count($validation) == 0) {
                $sql = "UPDATE products SET name='$name', description='$description', price='$price' WHERE id='$id'";
                mysqli_query($this->connection, $sql);
                $result = ['success', 'Product updated'];
            }
        }
        return $result;
    }
    
    public function deleteProduct($id) {
        $validation = $this->getProducts($id);
        $result = ['error', 'The product with ID ' . $id . ' does not exist'];
        if(count($validation) > 0) {
            $sql = "DELETE FROM products WHERE id='$id'";
            mysqli_query($this->connection, $sql);
            $result = ['success', 'Product deleted'];
        }
        return $result;
    }
    
    public function validateProduct($name, $description, $price) {
        $products = [];
        $sql = "SELECT * FROM products WHERE name='$name' AND description='$description' AND price='$price'";
        $records = mysqli_query($this->connection, $sql);
        while($row = mysqli_fetch_assoc($records)) {
            array_push($products, $row);
        }
        return $products;
    }
}
?>
