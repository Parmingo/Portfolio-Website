/**
 * This is a type writer script to type out the name behind the cursor. Adjusting the speed will change how fast it is typed (0 is fast and 100 is slow).
 */
var i = 0;
var txt = "My Projects";
var speed = 90;

function typeWriter() {
    if (i < txt.length) {
        document.querySelector(".my-projects").innerHTML = txt.substring(0, i + 1) + '<span> |</span>';
        i++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = function() {
    typeWriter();
    initializeWebSocket();
};
  

/**
 * Fetches project data from the server-side API and displays it on the page.
 * This function sends a GET request to the '/api/projects' endpoint,
 * then processes the JSON response by calling `displayProjects`.
 * If there is an error in fetching the data, it displays an error message.
 */
function fetchAndDisplayProjects() {
    fetch('/api/projects')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => displayProjects(projects))
        .catch(error => {
            console.error('Error fetching projects:', error);
            document.getElementById('projects-container').innerHTML = `<p class="error-message">Failed to load projects. Please try again later.</p>`;
        });
}

/**
 * Creates HTML elements for each project, sorted by projectID, and inserts them into the DOM.
 * @param {Object[]} projects -- an array of projects to display
 */
function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    // Sort projects by projectID
    projects.sort((a, b) => a.projectID - b.projectID);

    projects.forEach(project => {
        const projectElement = `
            <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div class="card-custom rounded-4 bg-base shadow-effect">
                    <div class="card-custom-image rounded-top">
                        <img class="rounded-top" src="${project.projectImage}" alt="${project.projectName}">
                    </div>
                    <div class="card-custom-content p-4">
                        <h4 class="project-title">${project.projectName}</h4>
                        <h5 class="tech-stack">${project.projectTechStack}</h5>
                        <div class="portfolio-description-wrapper">
                            <p class="portfolio-description">${project.projectDesc}</p>
                        </div>
                        <a href="${project.projectLink}" target="_blank" class="github-link"><i class="fa fa-github"></i></a>
                    </div>
                </div>
            </div>`;
        container.innerHTML += projectElement;
    });
}

/**
 * Initialize the websocket connection and set up handlers for events. Furthermore, it will check if incoming data is an array, if not
 * it will handle it a diifferent format and not display it.
 */
function initializeWebSocket() {
    var ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function() {
        console.log('WebSocket connection established');
    };

    ws.onmessage = function(event) {
      console.log('Message from server:', event.data);
      try {
          const data = JSON.parse(event.data);
  
          // Check if the data is an array (expected project data format)
          if (Array.isArray(data)) {
              displayProjects(data); 
          } else {
              // Handle other types of messages, like initial connection message
              console.log('Received non-project data:', data);
          }
      } catch (e) {
          // Handle parsing error or unexpected message format
          console.error('Error parsing message from server or unexpected message format:', e);
      }
  };

    ws.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    ws.onclose = function(e) {
        console.log('WebSocket connection closed', e);
    };
}

// Fetch and display projects once DOM is fully loaded.
document.addEventListener('DOMContentLoaded', fetchAndDisplayProjects);
