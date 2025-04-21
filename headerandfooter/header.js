
const typingText = ["Hyperion", "هایپریون"];
const typingElement = document.getElementById("typing-effect");
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < typingText[textIndex].length) {
        typingElement.textContent += typingText[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 400);
    } else {
        setTimeout(erase, 400);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = typingText[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 200);
    } else {
        textIndex = (textIndex + 1) % typingText.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typingElement.textContent = " ";
    type();
});


window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 0);
});

document.addEventListener('dragstart', function (event) {
    event.preventDefault();
});

document.addEventListener('drop', function (event) {
    event.preventDefault();
});


const adminPanelBtn = document.getElementById('admin-panel-btn');
const slideMenu = document.getElementById('slide-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

adminPanelBtn.addEventListener('click', () => {
    slideMenu.classList.toggle('open');
});

closeMenuBtn.addEventListener('click', () => {
    slideMenu.classList.remove('open');
});


