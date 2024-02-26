<?php
session_start();
$_SESSION['__token'] = md5(uniqid(mt_rand(), true));
?>

<!DOCTYPE html>
<html lang="en" class="dark">

<head>

  <head>
    <meta name="csrf-token" content="<?= $_SESSION['__token'] ?>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.ico">
    <link rel="stylesheet" href="./assets/main.css?v9" />
    <script defer type="module" src="./assets/main.js?v9"></script>
    <title>About me</title>
  </head>

<body id="app">
  <noscript>
    Sorry, this site requires javascript
  </noscript>
</body>

</html>