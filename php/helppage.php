<?php
session_start();


$host = "localhost";
$dbname = "hyperion_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "color" => "white", "message" => "خطا در اتصال به دیتابیس"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = trim($_POST["username"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $message = trim($_POST["message"] ?? "");

 
    if (empty($username) || empty($phone) || empty($message)) {
        echo json_encode(["status" => "error", "color" => "white", "message" => "لطفاً همه فیلدها را پر کنید"]);
        exit();
    }

 

  
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {
        echo json_encode(["status" => "error", "color" => "red", "message" => "کاربری با این نام وجود ندارد"]);
        exit();
    }

 
    $stmt = $pdo->prepare("SELECT id FROM orderfromusers WHERE username = :username AND phone = :phone AND details = :message");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->execute();
    $existingRequest = $stmt->fetch();

    if ($existingRequest) {
        echo json_encode(["status" => "error", "color" => "white", "message" => "این درخواست قبلاً ثبت شده است. لطفاً درخواست جدیدی ارسال کنید."]);
        exit();
    }

  
    $currentDate = date('Y-m-d'); 
    $currentTime = date('H:i:s'); 

    // ذخیره اطلاعات در جدول `orderfromusers`
    $stmt = $pdo->prepare("INSERT INTO orderfromusers (username, phone, details, order_date, order_time, request_type) VALUES (:username, :phone, :message, :order_date, :order_time, :request_type)");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->bindParam(':order_date', $currentDate, PDO::PARAM_STR);
    $stmt->bindParam(':order_time', $currentTime, PDO::PARAM_STR);
    $stmt->bindParam(':request_type', $request_type, PDO::PARAM_STR);

  
    $request_type = "پشتیبانی";
    
    $stmt->execute();

 
    echo json_encode(["status" => "success", "color" => "green", "message" => "درخواست شما با موفقیت ثبت شد", "redirect" => "http://localhost/HYPERION/"]);
    exit();
}


echo json_encode(["status" => "error", "color" => "white", "message" => "درخواست نامعتبر است"]);
exit();
?>
