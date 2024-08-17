<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header('content-type: application/json; charset=utf-8');
require 'productsModel.php';
$productsModel = new productsModel();
switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $response = (!isset($_GET['id'])) ? $productsModel->getProducts() : $productsModel->getProducts($_GET['id']);
        echo json_encode($response);
    break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input', true));
        if(!isset($_POST->name) || is_null($_POST->name) || empty(trim($_POST->name)) || strlen($_POST->name) > 80) {
            $response = ['error', 'The product name must not be empty and must not exceed 80 characters'];
        }
        else if(!isset($_POST->description) || is_null($_POST->description) || empty(trim($_POST->description)) || strlen($_POST->description) > 150) {
            $response = ['error', 'The product description must not be empty and must not exceed 150 characters'];
        }
        else if(!isset($_POST->price) || is_null($_POST->price) || empty(trim($_POST->price)) || !is_numeric($_POST->price) || strlen($_POST->price) > 20) {
            $response = ['error', 'The product price must not be empty, must be numeric, and must not exceed 20 characters'];
        }
        else {
            $response = $productsModel->saveProducts($_POST->name, $_POST->description, $_POST->price);
        }
        echo json_encode($response);
    break;

    case 'PUT':
        $_PUT = json_decode(file_get_contents('php://input', true));
        if(!isset($_PUT->id) || is_null($_PUT->id) || empty(trim($_PUT->id))) {
            $response = ['error', 'The product ID must not be empty'];
        }
        else if(!isset($_PUT->name) || is_null($_PUT->name) || empty(trim($_PUT->name)) || strlen($_PUT->name) > 80) {
            $response = ['error', 'The product name must not be empty and must not exceed 80 characters'];
        }
        else if(!isset($_PUT->description) || is_null($_PUT->description) || empty(trim($_PUT->description)) || strlen($_PUT->description) > 150) {
            $response = ['error', 'The product description must not be empty and must not exceed 150 characters'];
        }
        else if(!isset($_PUT->price) || is_null($_PUT->price) || empty(trim($_PUT->price)) || !is_numeric($_PUT->price) || strlen($_PUT->price) > 20) {
            $response = ['error', 'The product price must not be empty, must be numeric, and must not exceed 20 characters'];
        }
        else {
            $response = $productsModel->updateProducts($_PUT->id, $_PUT->name, $_PUT->description, $_PUT->price);
        }
        echo json_encode($response);
    break;

    case 'DELETE':
        $_DELETE = json_decode(file_get_contents('php://input', true));
        if(!isset($_DELETE->id) || is_null($_DELETE->id) || empty(trim($_DELETE->id))) {
            $response = ['error', 'The product ID must not be empty'];
        }
        else {
            $response = $productsModel->deleteProducts($_DELETE->id);
        }
        echo json_encode($response);
    break;
}
?>
