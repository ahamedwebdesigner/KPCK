
window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
});


window.addEventListener('load',main);
function main(ele){
    console.log(ele.target);
}

window.onload = function() { // iterate through the queued functions
    console.log("Hellow this is good");
};


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});