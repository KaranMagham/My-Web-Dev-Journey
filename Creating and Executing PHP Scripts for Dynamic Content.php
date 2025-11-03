<?php
// Display a greeting message
echo "<h2>Welcome to PHP Basics!</h2>";

// Display current date and time
echo "Today is " . date("l, F j, Y, g:i A") . "<br>";

// Simple arithmetic
$num1 = 5;
$num2 = 15;
$sum = $num1 + $num2;

echo "The sum of $num1 and $num2 is: $sum";
?>

<form method="post" action="process.php">
  Name: <input type="text" name="name"><br>
  Age: <input type="number" name="age"><br>
  <input type="submit" value="Submit">
</form>
<?php
if (isset($_POST['name']) && isset($_POST['age'])) {
    $name = $_POST['name'];
    $age = $_POST['age'];

    echo "<h2>User Information</h2>";
    echo "Name: $name <br>";
    echo "Age: $age <br>";
}

// Example for $_GET usage
if (isset($_GET['city'])) {
    $city = $_GET['city'];
    echo "City: $city";
}
?>
<?php
// Indexed array
$fruits = ["Apple", "Banana", "Mango", "Orange"];

echo "<h2>Fruit List:</h2>";
foreach ($fruits as $fruit) {
    echo "- $fruit <br>";
}

// Associative array
$marks = [
    "Alice" => 90,
    "Bob" => 85,
    "Charlie" => 78
];

echo "<h2>Student Marks:</h2>";
foreach ($marks as $student => $score) {
    echo "$student scored $score marks<br>";
}
?>
