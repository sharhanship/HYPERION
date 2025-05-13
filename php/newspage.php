<?php

$host = 'localhost';
$dbname = 'hyperion_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => "اتصال به دیتابیس ناموفق بود: " . $e->getMessage()]);
    exit();
}


$stmt = $pdo->query("SELECT * FROM news ORDER BY id DESC LIMIT 1");
$news = $stmt->fetch(PDO::FETCH_ASSOC);


if ($news) {
    echo json_encode($news);
} else {
    echo json_encode(['error' => 'هیچ خبری موجود نیست.']);
}
?>
