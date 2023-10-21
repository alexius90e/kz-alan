<?php
  if (! empty($_POST["send"])) {
      $stadium = $_POST["stadium"];
      $balanceHolder = $_POST["balanceHolder"];
      $fieldSize = $_POST["fieldSize"];
      $address = $_POST["address"];
      $contacts = $_POST["contacts"];


      $toEmail = "pandabatumi@gmail.com";

      $mailHeaders = "From: " . $contacts . "<" . $stadium . ">\r\n";
      if (mail($toEmail, $stadium, $balanceHolder, $fieldSize, $address, $contacts, $mailHeaders)) {
          $message = "Your contact information is received successfully.";
          $type = "success";
      }

  }
?>