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
    $match_date = $_POST['match_date'];
    $fixture = $_POST['fixture'];
    $home_team = $_POST['home_team'];
    $home_goal = $_POST['home_goal'];
    $away_team = $_POST['away_team'];
    $away_goal = $_POST['away_goal'];

    $sql = "INSERT INTO fixtures (match_date, fixture, home_team, home_goal, away_team, away_goal) VALUES ('$match_date', '$fixture', '$home_team', $home_goal, '$away_team', $away_goal)";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
