<?php
// Assume we have a database connection established
$userId = 1; // Replace with the actual user ID you want to display

// Fetch user details from the database
$query = "SELECT * FROM users WHERE id = $userId";
$result = mysqli_query($connection, $query);
$user = mysqli_fetch_assoc($result);

// Check if user exists
if (!$user) {
    echo "User not found";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <style>
        .profile-tab {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 20px;
        }
        .profile-details {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="profile-tab">
        <img src="<?php echo htmlspecialchars($user['profile_image_url']); ?>" alt="Profile Picture" class="profile-image">
        <div class="profile-details">
            <h2><?php echo htmlspecialchars($user['name']); ?></h2>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($user['email']); ?></p>
            <p><strong>Username:</strong> <?php echo htmlspecialchars($user['username']); ?></p>
            <p><strong>Location:</strong> <?php echo htmlspecialchars($user['location']); ?></p>
            <p><strong>Bio:</strong> <?php echo nl2br(htmlspecialchars($user['bio'])); ?></p>
            <p><strong>Joined:</strong> <?php echo date('F j, Y', strtotime($user['created_at'])); ?></p>
        </div>
    </div>
</body>
</html>
