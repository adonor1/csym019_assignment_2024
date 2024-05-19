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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $match_date = $_POST['match_date'];
    $fixture = $_POST['fixture'];
    $home_team = $_POST['home_team'];
    $home_goal = $_POST['home_goal'];
    $away_team = $_POST['away_team'];
    $away_goal = $_POST['away_goal'];

    $sql = "UPDATE fixtures SET match_date='$match_date', fixture='$fixture', home_team='$home_team', home_goal=$home_goal, away_team='$away_team', away_goal=$away_goal WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

$conn->close();
?>
