<?php

$host = 'localhost'; 
$dbname = 'hyperion_db';
$username = 'root'; 
$password = ''; 

try {
    // این روش عشقه
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // داداش تورو خدا دیباگ کن
} catch (PDOException $e) {
    echo "اتصال به دیتابیس ناموفق بود: " . $e->getMessage();
    exit();
}

//برسی درخواست گرفتن لیست ادمای تو مدرسه
if (isset($_POST['fetchUsers'])) {
    $stmt = $pdo->query("SELECT * FROM users"); 
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
}

//ایا برای دریافت لیست کسی خبر داده؟ منظورم لیست درخواست
if (isset($_POST['fetchOrders'])) {
    $stmt = $pdo->query("SELECT * FROM orderfromusers"); 
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orders);
}

// ایا کسی گفته کاربر رو پاک کنی؟
if (isset($_POST['deleteUser'])) {
    $userId = $_POST['userId'];
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $stmt->execute(['id' => $userId]);
    echo 'success';
}

// اینجا چک میشه که درخواستی برای پاک کردن اومده یا نه
if (isset($_POST['deleteOrder'])) {
    $orderId = $_POST['orderId'];
    $stmt = $pdo->prepare("DELETE FROM orderfromusers WHERE id = :id");
    $stmt->execute(['id' => $orderId]);
    echo 'success';
}

// اینو نمیگم سوکرته
if (isset($_POST['addNews'])) {
    $title = $_POST['title'];
    $author = $_POST['author'];
    $publish_date = $_POST['publish_date'];
    $content = $_POST['content'];

    // بوروسی موکنیم که ایا خبر هست یا نه
    $stmt = $pdo->query("SELECT COUNT(*) FROM news");
    $newsCount = $stmt->fetchColumn();

    if ($newsCount > 0) {
        //میگه داشم اگر خبری هم بود تو خاکش کن خبر جدید حایگزین کن
        $stmt = $pdo->prepare("UPDATE news SET title = :title, author = :author, publish_date = :publish_date, content = :content ORDER BY id DESC LIMIT 1");
    } else {
        // اینجا داشمون میگه اگه خبری نبود خبری درست کن شما
        $stmt = $pdo->prepare("INSERT INTO news (title, author, publish_date, content) VALUES (:title, :author, :publish_date, :content)");
    }

    $stmt->execute([
        'title' => $title,
        'author' => $author,
        'publish_date' => $publish_date,
        'content' => $content
    ]);

    echo "success";
}
?>
