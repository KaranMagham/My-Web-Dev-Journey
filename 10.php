1️⃣ Database Setup

In phpMyAdmin, run this SQL:

CREATE DATABASE simpledb;
USE simpledb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50)
);

🧩 2️⃣ db.php — connect PHP with MySQL
<?php
$conn = mysqli_connect("localhost", "root", "", "simpledb");
if(!$conn){
  die("Connection failed: " . mysqli_connect_error());
}
?>

🧩 3️⃣ register.php — register new user
<?php include("db.php"); ?>

<h2>Register</h2>
<form method="POST">
  Username: <input type="text" name="username"><br><br>
  Password: <input type="text" name="password"><br><br>
  <input type="submit" name="register" value="Register">
</form>

<?php
if(isset($_POST['register'])){
  $u = $_POST['username'];
  $p = $_POST['password'];

  $sql = "INSERT INTO users (username, password) VALUES ('$u', '$p')";
  if(mysqli_query($conn, $sql)){
    echo "User Registered Successfully!";
  } else {
    echo "Error: " . mysqli_error($conn);
  }
}
?>

🧩 4️⃣ login.php — simple login system
<?php
session_start();
include("db.php");
?>

<h2>Login</h2>
<form method="POST">
  Username: <input type="text" name="username"><br><br>
  Password: <input type="text" name="password"><br><br>
  <input type="submit" name="login" value="Login">
</form>

<?php
if(isset($_POST['login'])){
  $u = $_POST['username'];
  $p = $_POST['password'];

  $sql = "SELECT * FROM users WHERE username='$u' AND password='$p'";
  $result = mysqli_query($conn, $sql);

  if(mysqli_num_rows($result) > 0){
    $_SESSION['user'] = $u;
    header("Location: home.php");
  } else {
    echo "Invalid Username or Password!";
  }
}
?>

🧩 5️⃣ home.php — CRUD operations page
<?php
session_start();
include("db.php");

if(!isset($_SESSION['user'])){
  header("Location: login.php");
  exit();
}

echo "<h3>Welcome, ".$_SESSION['user']."</h3>";
echo "<a href='logout.php'>Logout</a><br><br>";
?>

<h2>Add User</h2>
<form method="POST">
  Username: <input type="text" name="username">
  Password: <input type="text" name="password">
  <input type="submit" name="add" value="Add">
</form>

<?php
// Create
if(isset($_POST['add'])){
  $u = $_POST['username'];
  $p = $_POST['password'];
  mysqli_query($conn, "INSERT INTO users (username, password) VALUES ('$u','$p')");
  echo "User Added!<br>";
}

// Read
echo "<h3>All Users</h3>";
$result = mysqli_query($conn, "SELECT * FROM users");
while($row = mysqli_fetch_assoc($result)){
  echo $row['id']." - ".$row['username'].
  " <a href='delete.php?id=".$row['id']."'>Delete</a><br>";
}
?>

🧩 6️⃣ delete.php
<?php
include("db.php");
$id = $_GET['id'];
mysqli_query($conn, "DELETE FROM users WHERE id=$id");
header("Location: home.php");
?>

🧩 7️⃣ logout.php
<?php
session_start();
session_destroy();
header("Location: login.php");
?>