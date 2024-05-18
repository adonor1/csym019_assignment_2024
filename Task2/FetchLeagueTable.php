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

$sql = "SELECT id, manager_name, team_name, played, won, drawn, lost, `for`, `against`, gd, points FROM LeagueTable";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td><input type='checkbox' class='teamCheckbox' value='" . $row["id"] . "'></td>
                <td></td>
                <td>" . $row["manager_name"] . "</td>
                <td>" . $row["team_name"] . "</td>
                <td>" . $row["played"] . "</td>
                <td>" . $row["won"] . "</td>
                <td>" . $row["drawn"] . "</td>
                <td>" . $row["lost"] . "</td>
                <td>" . $row["for"] . "</td>
                <td>" . $row["against"] . "</td>
                <td>" . $row["gd"] . "</td>
                <td>" . $row["points"] . "</td>
                <td><button class='delete-btn'>Delete</button></td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='13'>No results found</td></tr>";
}

$conn->close();
?>
