// To hold the history of states manually
let customHistory = [];

document.addEventListener('DOMContentLoaded', (event) => {
    // On page load, check the URL and navigate to the appropriate section
    const initialSection = window.location.hash.substring(1) || 'home';
    navigateTo(initialSection, false);
});

function navigateTo(sectionId, addToHistory = true) {
    // Hide all sections
    document.querySelectorAll('.content').forEach(div => {
        div.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');

    // Update URL without reloading the page
    window.history.pushState({sectionId}, '', `#${sectionId}`);

    // Add the current state to custom history if not initial load
    if (addToHistory) {
        customHistory.push(sectionId);
    }
}

function goBack() {
    // Remove the current state from custom history
    customHistory.pop();

    // Get the previous state from custom history
    const lastState = customHistory.pop() || 'home';

    // Navigate to the last state
    navigateTo(lastState, false);
}

// Handle the browser's back/forward buttons
window.onpopstate = function(event) {
    const sectionId = event.state ? event.state.sectionId : 'home';
    navigateTo(sectionId, false);
};

window.addEventListener("popstate", (event) => {
    console.log(
      `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
    );
  });
