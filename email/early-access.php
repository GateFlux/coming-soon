<?php
/**
 * Early Access API Endpoint
 * 
 * Handles early access email submissions using PHPMailer.
 * 
 * Security features:
 * - CORS restricted to production domain
 * - Server-side email validation
 * - Header injection prevention
 * - Input sanitization
 * 
 * @version 1.0.0
 */

declare(strict_types=1);

// Error handling - don't expose errors in production
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Set headers early
header('Content-Type: application/json; charset=utf-8');

// Load PHPMailer - try multiple paths
$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',      // email/vendor (recommended)
    __DIR__ . '/../vendor/autoload.php',   // coming-soon/vendor
];

$autoloaderFound = false;
foreach ($autoloadPaths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $autoloaderFound = true;
        break;
    }
}

if (!$autoloaderFound) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server configuration error. Please contact support.'
    ]);
    error_log('Early Access: Composer autoloader not found. Run: cd api && composer install');
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * SMTP Configuration
 * 
 * IMPORTANT: In production, move these to environment variables
 * or a secure configuration file outside webroot.
 */
define('SMTP_HOST', 'smtp.mailgun.org');
define('SMTP_PORT', 465);
define('SMTP_USERNAME', 'notifications@mg.gateflux.co');
define('SMTP_PASSWORD', 'PR@M33La1504@');
define('SMTP_ENCRYPTION', 'ssl'); // Use 'ssl' for port 465, 'tls' for port 587

// Recipient configuration
define('NOTIFICATION_EMAIL', 'contact@gateflux.co');
define('FROM_EMAIL', 'notifications@gateflux.co');
define('FROM_NAME', 'GateFlux Early Access');

// CORS configuration
define('ALLOWED_ORIGIN', 'https://gateflux.co');

// Rate limiting placeholder
// TODO: Implement rate limiting (e.g., using Redis or database)
// Recommended: 5 requests per IP per hour

// ============================================================================
// CORS & SECURITY HEADERS
// ============================================================================

// Set additional security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS headers - restrict to production domain
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === ALLOWED_ORIGIN) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================

/**
 * Validate email address
 * 
 * @param string $email Email to validate
 * @return bool Whether email is valid
 */
function validateEmail(string $email): bool
{
    // Check basic format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    
    // Check length (RFC 5321)
    if (strlen($email) > 254) {
        return false;
    }
    
    // Check for header injection attempts
    if (preg_match('/[\r\n]/', $email)) {
        return false;
    }
    
    return true;
}

/**
 * Sanitize input string
 * 
 * @param string $input Input to sanitize
 * @return string Sanitized string
 */
function sanitizeInput(string $input): string
{
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Get JSON input
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON input'
    ]);
    exit;
}

// Validate email presence
if (!isset($input['email']) || empty(trim($input['email']))) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Email address is required'
    ]);
    exit;
}

$email = sanitizeInput($input['email']);

// Validate email format
if (!validateEmail($email)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]);
    exit;
}

// ============================================================================
// CSRF TOKEN VALIDATION (Ready structure)
// ============================================================================

// TODO: Implement CSRF token validation
// $csrfToken = $input['csrf_token'] ?? '';
// if (!validateCsrfToken($csrfToken)) {
//     http_response_code(403);
//     echo json_encode([
//         'success' => false,
//         'message' => 'Invalid security token'
//     ]);
//     exit;
// }

// ============================================================================
// SEND EMAIL
// ============================================================================

try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_ENCRYPTION;
    $mail->Port       = SMTP_PORT;
    
    // Timeout settings
    $mail->Timeout    = 30;
    $mail->SMTPDebug  = SMTP::DEBUG_OFF;
    
    // Recipients
    $mail->setFrom(FROM_EMAIL, FROM_NAME);
    $mail->addAddress(NOTIFICATION_EMAIL);
    $mail->addReplyTo($email);
    
    // Content
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'New Early Access Signup - GateFlux';
    
    // Get request metadata
    $timestamp = date('Y-m-d H:i:s T');
    $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] 
        ?? $_SERVER['REMOTE_ADDR'] 
        ?? 'Unknown';
    $userAgent = sanitizeInput($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown');
    
    // Build HTML email body
    $htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #0f3d9f; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { color: #0f3d9f; margin: 0; font-size: 24px; }
        .content { background: #f8fafc; padding: 20px; border-radius: 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { font-size: 16px; color: #1e293b; margin-top: 4px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Early Access Signup</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value">{$email}</div>
            </div>
            <div class="field">
                <div class="label">Submitted At</div>
                <div class="value">{$timestamp}</div>
            </div>
            <div class="field">
                <div class="label">IP Address</div>
                <div class="value">{$ipAddress}</div>
            </div>
        </div>
        <div class="footer">
            This notification was sent from the GateFlux coming soon page.
        </div>
    </div>
</body>
</html>
HTML;
    
    // Plain text alternative
    $textBody = <<<TEXT
New Early Access Signup - GateFlux
===================================

Email Address: {$email}
Submitted At: {$timestamp}
IP Address: {$ipAddress}

---
This notification was sent from the GateFlux coming soon page.
TEXT;
    
    $mail->Body    = $htmlBody;
    $mail->AltBody = $textBody;
    
    // Send email
    $mail->send();
    
    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true
    ]);
    
} catch (Exception $e) {
    // Log error (in production, use proper logging)
    error_log("Early access email failed: " . $mail->ErrorInfo);
    
    // Error response (don't expose internal details)
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to process your request. Please try again later.'
    ]);
}
