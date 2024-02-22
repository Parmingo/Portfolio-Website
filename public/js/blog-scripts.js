/**
 * This is to truncate ... if the text length is above 100 for blog posts. 
 */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.blog-description').forEach(function(elem) {
        var maxLength = 100;
        var truncated = elem.innerText;

        if (truncated.length > maxLength) {
            truncated = truncated.substr(0, maxLength) + '...';
        }

        elem.innerText = truncated;
    });
});

/**
 * This is a type writer script to type out the name behind the cursor. Adjusting the speed will change how fast it is typed (0 is fast and 100 is slow).
 */
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
window.onload = typeWriter;