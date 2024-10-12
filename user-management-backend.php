<?php
// Database connection
$db = new mysqli('localhost', 'username', 'password', 'database_name');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Function to update last activity timestamp
function updateLastActivity($userId) {
    global $db;
    $stmt = $db->prepare("UPDATE users SET last_activity = NOW() WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->close();
}

// Function to get active users (active in the last 15 minutes)
function getActiveUsers() {
    global $db;
    $stmt = $db->prepare("SELECT id, username FROM users WHERE last_activity > DATE_SUB(NOW(), INTERVAL 15 MINUTE)");
    $stmt->execute();
    $result = $stmt->get_result();
    $activeUsers = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $activeUsers;
}

// Function to deactivate user account
function deactivateUser($userId) {
    global $db;
    $stmt = $db->prepare("UPDATE users SET is_active = 0 WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->close();
}

// API endpoint to update last activity
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_activity') {
    $userId = $_POST['user_id'];
    updateLastActivity($userId);
    echo json_encode(['success' => true]);
}

// API endpoint to get active users
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_active_users') {
    $activeUsers = getActiveUsers();
    echo json_encode($activeUsers);
}

// API endpoint to deactivate user
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'deactivate_user') {
    $userId = $_POST['user_id'];
    deactivateUser($userId);
    echo json_encode(['success' => true]);
}
?>
