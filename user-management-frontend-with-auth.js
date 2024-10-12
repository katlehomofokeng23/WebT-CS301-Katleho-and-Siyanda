let currentUserId = null;

function checkSession() {
    return fetch('login.php?action=check_session')
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                currentUserId = data.user_id;
                return true;
            }
            return false;
        });
}

function getCurrentUserId() {
    return currentUserId;
}

function login(username, password) {
    return fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUserId = data.user_id;
            initUserManagement();
        } else {
            alert(data.message);
        }
    });
}

function initUserManagement() {
    // Update activity every 5 minutes
    setInterval(updateActivity, 5 * 60 * 1000);

    // Get active users every minute
    setInterval(getActiveUsers, 60 * 1000);

    // Initial calls
    updateActivity();
    getActiveUsers();
}

// ... (rest of the code from the previous JavaScript artifact)

// Check session on page load
checkSession().then(isLoggedIn => {
    if (isLoggedIn) {
        initUserManagement();
    } else {
        // Show login form
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('user-management').style.display = 'none';
    }
});
