<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "hyperion_db";
$username = "root"; 
$password = "";

try {
 
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "خطا در اتصال به دیتابیس"]);
    exit();
}


$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["action"]) && $data["action"] === "delete") {
        // حذف درخواست
        if (!isset($data["id"]) || !isset($data["username"])) {
            echo json_encode(["status" => "error", "message" => "اطلاعات نامعتبر"]);
            exit();
        }

        $id = $data["id"];
        $username = $data["username"];

        $stmt = $pdo->prepare("DELETE FROM orderfromusers WHERE id = ? AND username = ?");
        $success = $stmt->execute([$id, $username]);

        if ($success) {
            echo json_encode(["status" => "success", "message" => "درخواست حذف شد"]);
        } else {
            echo json_encode(["status" => "error", "message" => "خطا در حذف درخواست"]);
        }
    } else {
        if (!isset($data["username"])) {
            echo json_encode(["status" => "error", "message" => "نام کاربری ارسال نشده"]);
            exit();
        }

        $username = $data["username"];
        $stmt = $pdo->prepare("SELECT * FROM orderfromusers WHERE username = ?");
        $stmt->execute([$username]);
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => "success", "requests" => $requests]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "درخواست نامعتبر"]);
}
?>
