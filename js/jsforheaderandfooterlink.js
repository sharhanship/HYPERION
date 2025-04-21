
document.addEventListener("DOMContentLoaded", () => {

    fetch('http://localhost/HYPERION/headerandfooter/header.html')
        .then(response => response.text())
        .then(data => {
            const headerDiv = document.querySelector('div#header');
            headerDiv.innerHTML = data;

            const script = document.createElement('script');
            script.src = 'http://localhost/HYPERION/headerandfooter/header.js';
            script.onload = () => {
                startTypingAnimation();
            };
            script.onerror = () => {
                console.error('Error loading header.js.');
            };
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading header:', error));


    fetch('http://localhost/HYPERION/headerandfooter/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('div#footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});


function startTypingAnimation() {
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

    typingElement.textContent = " "; 
    type();
}


