<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['email'], $input['otp'])) {
    $email = $input['email'];
    $otp = $input['otp'];
    $tempFile = "../database/temp_" . md5($email) . ".json";

    if (!file_exists($tempFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Data pendaftaran tidak ditemukan']);
        exit;
    }

    $data = json_decode(file_get_contents($tempFile), true);

    if ($data['otp'] === $otp && time() <= $data['expires']) {
        // Save to permanent users file
        $usersFile = "../database/users.json";
        $users = [];
        if (file_exists($usersFile)) {
            $users = json_decode(file_get_contents($usersFile), true);
        }

        $users[$email] = [
            'email' => $email,
            'password' => $data['password']
        ];

        file_put_contents($usersFile, json_encode($users));
        unlink($tempFile); // Remove temp file

        echo json_encode(['status' => 'success', 'message' => 'Akun berhasil diverifikasi']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Kode OTP salah atau kedaluwarsa']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
