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

$sql = "SELECT id, match_date, fixture, home_team, home_goal, away_team, away_goal FROM fixtures";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr data-id='" . $row["id"] . "'>
                <td class='match_date'>" . $row["match_date"] . "</td>
                <td class='fixture'>" . $row["fixture"] . "</td>
                <td class='home_team'>" . $row["home_team"] . "</td>
                <td class='home_goal'>" . $row["home_goal"] . "</td>
                <td class='away_team'>" . $row["away_team"] . "</td>
                <td class='away_goal'>" . $row["away_goal"] . "</td>
                <td>
                    <button class='edit-btn'>Edit</button>
                    <button class='delete-btn'>Delete</button>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='7'>No results found</td></tr>";
}

$conn->close();
?>
