<?php
session_start();
$_SESSION['__token'] = md5(uniqid(mt_rand(), true));
?>

<!DOCTYPE html>
<html lang="en" class="dark">

<head>
  <meta name="csrf-token" content="<?= $_SESSION['__token'] ?>">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="One page portfolio website" />
  <meta name="author" content="exi66" />
  <meta name="copyright" content="exi66" />
  <meta name="robots" content="index, follow" />
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="./assets/main.css?v28" />
  <script defer type="module" src="./assets/main.js?v28"></script>
  <title>About me</title>
</head>

<body id="app">
  <noscript>
    Sorry, this site requires javascript
  </noscript>
</body>

</html>