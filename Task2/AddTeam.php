<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $manager_name = $_POST['manager_name'];
    $team_name = $_POST['team_name'];
    $played = $_POST['played'];
    $won = $_POST['won'];
    $drawn = $_POST['drawn'];
    $lost = $_POST['lost'];
    $for = $_POST['for'];
    $against = $_POST['against'];
    $gd = $_POST['gd'];
    $points = $_POST['points'];

    $sql = "INSERT INTO LeagueTable (manager_name, team_name, played, won, drawn, lost, `for`, `against`, gd, points)
            VALUES ('$manager_name', '$team_name', $played, $won, $drawn, $lost, $for, $against, $gd, $points)";

    if ($conn->query($sql) === TRUE) {
        $response['status'] = 'success';
        $response['message'] = 'Team Added Successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $sql . '<br>' . $conn->error;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
