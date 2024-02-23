// This is a type writer script to type out the name behind the cursor. 
var i = 0;
var txt = "My Blog";
var speed = 90;

function typeWriter() {
    if(i < txt.length) {
        document.querySelector(".my-blog").innerHTML = txt.substring(0, i + 1) + '<span> |</span>';
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Fetches blog posts data from the server-side API and displays it on the page.
function fetchAndDisplayPosts() {
    fetch('/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => displayPosts(posts))
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            document.getElementById('posts-container').innerHTML = `<p class="text-white error-message">Failed to load blog posts. Please try again later.</p>`;
        });
}

// Creates HTML elements for each post and inserts them into the DOM.
function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = `
            <div class="blog-post col-md-4" data-aos="fade-up">
                <div class="card-custom rounded-4 bg-base shadow-effect">
                    <div class="card-custom-image rounded-top">
                        <img class="rounded-top" src="${post.postImage}" alt="test">
                    </div>
                    <div class="card-custom-content p-4">
                        <p class="blog-date text-date mb-2">${post.postDate}</p>
                        <h5 class="blog-title mb-4">${post.postTitle}</h5>
                        <div class="blog-description-wrapper">
                            <p class="blog-description">${post.postDesc}</p>
                        </div>
                        <a href="${post.postPath}" class="link-custom" target="_blank">Read More</a>
                    </div>
                </div>
            </div>`;
        container.innerHTML += postElement;
    });
    truncateText();
}

// Truncates text if it's longer than 100 characters for blog posts.
function truncateText() {
    document.querySelectorAll('.blog-description').forEach(function(elem) {
        var maxLength = 100;
        var truncated = elem.innerText;

        if (truncated.length > maxLength) {
            truncated = truncated.substr(0, maxLength) + '...';
        }

        elem.innerText = truncated;
    });
}

// Initialize the websocket connection and set up handlers for events.
function initializeWebSocket() {
    var ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function() {
        console.log('WebSocket connection established');
    };

    ws.onmessage = function(event) {
      console.log('Message from server:', event.data);
      try {
          const data = JSON.parse(event.data);
  
          if (Array.isArray(data)) {
              displayPosts(data);
          } else {
              console.log('Received non-post data:', data);
          }
      } catch (e) {
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

// When the DOM is fully loaded, initialize the typewriter effect,
// fetch and display posts, and set up the WebSocket connection.
document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
    fetchAndDisplayPosts();
    initializeWebSocket();
});
