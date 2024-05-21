<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    signUp();
}

function signUp()
{
    $servername = "localhost";
    $username = "root";
    $password = "240699";
    $dbname = "weatherapp";

    $response = array('success' => false, 'message' => '');

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $signupUser = $_POST['signupUser'];
        $signupPassword = $_POST['signupPassword'];

        $stmt = $conn->prepare("INSERT INTO user (name, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $signupUser, $signupPassword);

        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['message'] = "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $response['message'] = "Exception: " . $e->getMessage();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
