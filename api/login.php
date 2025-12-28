<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['email'], $input['password'])) {
    $email = $input['email'];
    $password = $input['password'];
    $usersFile = "../database/users.json";

    if (!file_exists($usersFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Akun tidak ditemukan']);
        exit;
    }

    $users = json_decode(file_get_contents($usersFile), true);

    if (isset($users[$email]) && password_verify($password, $users[$email]['password'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login berhasil']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email atau password salah']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
