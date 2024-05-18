<?php
session_start();

$server = 'localhost';
$username = 'root';
$password = '';
$schema = 'mydatabase';

try {
    $pdo = new PDO('mysql:host=' . $server . ';dbname=' . $schema, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT email, username, password FROM user WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $user['password'])) {
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $user['username'];
                header("location: league.html");
                exit;
            } else {
                echo "Invalid password.";
            }
        } else {
            echo "No account found with that email.";
        }
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
