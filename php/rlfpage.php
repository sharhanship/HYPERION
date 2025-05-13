<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$host = 'localhost';
$db = 'hyperion_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';

    if ($action === 'register') {
        $username = htmlspecialchars(trim($data['username']));
        $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
        $password = trim($data['password']);

        if (empty($username) || empty($email) || empty($password)) {
            die(json_encode(['message' => "لطفاً همه فیلدها را پر کنید.", 'status' => "error"]));
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die(json_encode(['message' => "ایمیل معتبر نیست!", 'status' => "error"]));
        }

        if (!preg_match('/^[a-zA-Z0-9_]{3,50}$/', $username)) {
            die(json_encode(['message' => "نام کاربری نامعتبر است.", 'status' => "error"]));
        }

        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
        $stmt->execute(['username' => $username, 'email' => $email]);

        if ($stmt->rowCount() > 0) {
            die(json_encode(['message' => "نام کاربری یا ایمیل قبلاً استفاده شده است.", 'status' => "error"]));
        }

        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);

        die(json_encode(['message' => "ثبت نام موفقیت‌آمیز بود!", 'status' => "success"]));
    }

    if ($action === 'login') {
        $username = htmlspecialchars(trim($data['username']));
        $password = trim($data['password']);

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['password'] === $password) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role']; // assuming role column exists in users table
            
            // Check if the user is an admin
            if ($user['role'] === 'admin') {
                die(json_encode([
                    'message' => "ورود موفقیت‌آمیز!",
                    'status' => "success",
                    'script' => "setTimeout(function() {
                        window.location.href = 'http://localhost/HYPERION/alphaside/adminpage.html';
                    }, 2000);"
                ]));
            } else {
                die(json_encode([
                    'message' => "ورود موفقیت‌آمیز!",
                    'status' => "success",
                    'script' => "setTimeout(function() {
                        window.location.href = 'http://localhost/HYPERION/';
                    }, 2000);"
                ]));
            }
        } else {
            die(json_encode(['message' => "کاربری با این مشخصات یافت نشد.", 'status' => "error"]));
        }
    }

} catch (PDOException $e) {
    die(json_encode(['message' => "خطای پایگاه داده: " . $e->getMessage(), 'status' => "error"]));
}
?>