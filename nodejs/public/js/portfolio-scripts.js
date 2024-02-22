/**
 * This is a type writer script to type out the name behind the cursor. Adjusting the speed will change how fast it is typed (0 is fast and 100 is slow).
 */
var i = 0;
var txt = "My Projects";
var speed = 90;

function typeWriter() {
    if(i < txt.length) {
        document.querySelector(".my-projects").innerHTML = txt.substring(0, i + 1) + '<span> |</span>';
        i++;
        setTimeout(typeWriter, speed);
    }
}
window.onload = typeWriter;



document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/projects')
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(projects => {
        const container = document.getElementById('projects-container'); 
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
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        const container = document.getElementById('projects-container');
        container.innerHTML = `<p class="error-message">Failed to load projects. Please try again later.</p>`;
      });
});

