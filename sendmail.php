<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include PHPMailer files directly
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if (
    $_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_POST['name'], $_POST['email'], $_POST['message'])
    && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    $ownerEmail = 'johnvalentineestrada@gmail.com'; // <-- Your Gmail here
    $smtpUser = 'juandelacruz12212000@gmail.com'; // <-- Your Gmail here
    $smtpPass = 'hrxm tvhj sgbo qurk'; // <-- Your App Password here

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = nl2br(htmlspecialchars($_POST['message']));

    // Send to site owner
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;
        // $mail->SMTPDebug  = 2; // Uncomment for debugging

        $mail->setFrom($smtpUser, 'Portfolio Contact Form');
        $mail->addAddress($ownerEmail, 'Site Owner');
        $mail->isHTML(true);
        $mail->Subject = 'New Portfolio Contact Message';
        $mail->Body    =
            "<strong>Name:</strong> $name<br>" .
            "<strong>Email:</strong> $email<br>" .
            "<strong>Message:</strong><br>$message";

        $mail->send();

        // Send confirmation to user
        $confirm = new PHPMailer(true);
        $confirm->isSMTP();
        $confirm->Host       = 'smtp.gmail.com';
        $confirm->SMTPAuth   = true;
        $confirm->Username   = $smtpUser;
        $confirm->Password   = $smtpPass;
        $confirm->SMTPSecure = 'tls';
        $confirm->Port       = 587;
        $confirm->setFrom($smtpUser, 'Portfolio Contact Form');
        $confirm->addAddress($email, $name);
        $confirm->isHTML(true);
        $confirm->Subject = 'Thank you for contacting me!';
        $confirm->Body    = "Hi $name,<br><br>Thank you for reaching out! I have received your message and will get back to you soon.<br><br><em>Your message:</em><br>$message<br><br>Best regards,<br>John Valentine A. Estrada";

        $confirm->send();

        echo json_encode(['success' => true, 'message' => 'Message has been sent!']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request or missing/invalid fields.']);
} 