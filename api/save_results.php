<?php
header('Content-Type: application/json');

// Memuat konfigurasi jika diperlukan di masa depan (misal: log level)
// require_once '../config.php';

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['email'], $input['result'])) {
    $email = $input['email'];
    $resultData = $input['result'];
    $timestamp = date('Y-m-d H:i:s');

    $dbDir = "../database";
    $resultsFile = $dbDir . "/results.json";
    
    // Pastikan folder database ada
    if (!is_dir($dbDir)) {
        if (!mkdir($dbDir, 0777, true)) {
            echo json_encode(['status' => 'error', 'message' => 'Folder database tidak ditemukan dan gagal dibuat']);
            exit;
        }
    }

    // Cek izin tulis
    if (!is_writable($dbDir)) {
        echo json_encode(['status' => 'error', 'message' => 'Folder database tidak memiliki izin tulis (Permission Denied)']);
        exit;
    }

    $allResults = [];
    if (file_exists($resultsFile)) {
        $content = file_get_contents($resultsFile);
        $allResults = json_decode($content, true) ?: [];
    }

    // Simpan hasil berdasarkan email pengguna
    // Kita simpan dalam array agar satu user bisa punya banyak riwayat tes jika perlu
    if (!isset($allResults[$email])) {
        $allResults[$email] = [];
    }

    $newResult = [
        'title' => $resultData['title'],
        'description' => $resultData['description'],
        'scores' => $resultData['scores'],
        'date' => $timestamp
    ];

    $allResults[$email][] = $newResult;

    if (file_put_contents($resultsFile, json_encode($allResults, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success', 'message' => 'Hasil berhasil disimpan']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan ke database']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap atau metode salah']);
}
?>
