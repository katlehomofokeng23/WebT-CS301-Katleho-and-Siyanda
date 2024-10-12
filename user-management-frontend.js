// Function to update user activity
function updateActivity() {
    const userId = getCurrentUserId(); // Implement this function to get the current user's ID
    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=update_activity&user_id=' + userId
    });
}

// Function to get active users
function getActiveUsers() {
    fetch('api.php?action=get_active_users')
        .then(response => response.json())
        .then(data => {
            // Update the UI with the list of active users
            const activeUsersList = document.getElementById('active-users-list');
            activeUsersList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username;
                activeUsersList.appendChild(li);
            });
        });
}

// Function to deactivate user account
function deactivateUser(userId) {
    if (confirm('Are you sure you want to deactivate this account?')) {
        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=deactivate_user&user_id=' + userId
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User account deactivated successfully.');
                // Update the UI or refresh the page
            }
        });
    }
}

// Update activity every 5 minutes
setInterval(updateActivity, 5 * 60 * 1000);

// Get active users every minute
setInterval(getActiveUsers, 60 * 1000);

// Initial calls
updateActivity();
getActiveUsers();
