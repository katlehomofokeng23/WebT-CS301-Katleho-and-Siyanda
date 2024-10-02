const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide() {
  slides.forEach(slide => slide.style.display = 'none');
  slides[currentSlide].style.display = 'block';
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide();
}

showSlide(); // Initialize slideshow

// Add event listeners for navigation buttons (if available)
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

if (nextButton) {
  nextButton.addEventListener('click', nextSlide);
}

if (prevButton) {
  prevButton.addEventListener('click', prevSlide);
}

// Accessing the navigator object through the window object.
const nav = window.navigator;

// Displaying the user's browser information using navigator.userAgent.
document.getElementById('browserInfo').innerText = 'You are using: ' + nav.userAgent;

// Setting the page language based on the user's browser language preferences.
// Uses navigator.language if available, falls back to navigator.userLanguage for older browsers.
document.documentElement.lang = nav.language || nav.userLanguage;

document.getElementById('languageInfo').innerText = 'Your language is set to: ' + document.documentElement.lang;

// Function to check the user's online/offline status using navigator.onLine.
function checkOnlineStatus() {
    // Determine if the user is online or offline.
    const status = nav.onLine ? 'online' : 'offline';
    // Update the online status display on the page.
    document.getElementById('onlineStatus').innerText = 'You are currently ' + status;
    // If offline, alert the user that some features might not be available.
    if (!nav.onLine) {
        alert('You are offline. Some features may not work.');
    }
}

// Listen for 'online' and 'offline' events to update the online status.
window.addEventListener('online', checkOnlineStatus);

window.addEventListener('offline', checkOnlineStatus);
// Checking if cookies are enabled in the user's browser using navigator.cookieEnabled.
document.getElementById('cookieStatus').innerText = 'Cookies are ' + (nav.cookieEnabled ? 'enabled' : 'disabled');

// If cookies are disabled, alert the user to enable them for the best experience.
if (!nav.cookieEnabled) {
    alert('Cookies are disabled. Please enable them for the best experience.');
}

// Optimizing performance based on the number of logical processors reported by navigator.hardwareConcurrency.
// Defaults to 2 if the information is not available.
const workerCount = nav.hardwareConcurrency || 2;
document.getElementById('hardwareInfo').innerText = `This device has ${workerCount} logical processors.`;

console.log(`Optimizing performance for ${workerCount} logical processors...`);

// Using navigator.sendBeacon() to send analytics data to the server when the user leaves the page.
// This ensures the data is sent even if the user closes the browser or navigates away.
window.addEventListener('unload', function() {
    // Prepare the analytics data to be sent.
    const analyticsData = {
        timeSpent: (new Date() - performance.timing.navigationStart) / 1000, // Calculate time spent on page
        pageVisited: window.location.href 
    };
    // Send the data using sendBeacon.
    nav.sendBeacon('/analytics', JSON.stringify(analyticsData));
});

// Function to check if the sendBeacon method is supported by the browser.
function isSendBeaconSupported() {
    return 'sendBeacon' in nav;
}

// Log whether sendBeacon is supported.
console.log('sendBeacon is ' + (isSendBeaconSupported() ? 'supported' : 'not supported') + ' in this browser.');
// Functions to navigate to different pages (presumably within the same website).
function goHome() {
    window.location.href = 'JS_index.html';
}

function showAboutUs() {
    window.location.href = 'aboutus.html';
}

// Initial check of the user's online status when the page loads.
checkOnlineStatus();
