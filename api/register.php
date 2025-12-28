<?php
header('Content-Type: application/json');

// Memuat file konfigurasi yang diabaikan oleh Git
require_once '../config.php';

function sendEmail($to, $code) {
    $url = 'https://api.brevo.com/v3/smtp/email';
    $data = [
        // PENTING: Email pengirim HARUS sudah terverifikasi di dashboard Brevo Anda.
        // Gunakan email yang Anda gunakan untuk mendaftar Brevo jika ragu.
        'sender' => ['name' => 'CareerConnect AI', 'email' => 'muhammadbatzhara88@gmail.com'],
        'to' => [['email' => $to]],
        'subject' => 'Kode Verifikasi Akun CareerConnect',
        'htmlContent' => "<html><body><h1>Halo!</h1><p>Kode verifikasi Anda adalah: <strong>$code</strong></p></body></html>"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'api-key: ' . BREVO_API_KEY,
        'Content-Type: application/json'
    ]);
    
    // Disable SSL verification for local dev if needed
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $result = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        file_put_contents('../database/error.log', "[" . date('Y-m-d H:i:s') . "] Curl Error: " . $error . PHP_EOL, FILE_APPEND);
    } else {
        file_put_contents('../database/error.log', "[" . date('Y-m-d H:i:s') . "] Brevo Response: " . $result . PHP_EOL, FILE_APPEND);
    }
    
    return $result;
}

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['email'])) {
    $email = $input['email'];
    $password = $input['password'];
    $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

    // Temp storage for verification
    $tempData = [
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'otp' => $otp,
        'expires' => time() + 600 // 10 minutes
    ];

    file_put_contents("../database/temp_" . md5($email) . ".json", json_encode($tempData));
    
    // Attempt to send email
    sendEmail($email, $otp);

    echo json_encode(['status' => 'success', 'message' => 'OTP sent to email']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
