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