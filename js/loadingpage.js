
window.addEventListener("load", function () {
    const loadingFrame = document.getElementById("loading-frame");
    loadingFrame.style.opacity = "0";
    setTimeout(() => {
        loadingFrame.remove();
    }, 800);
});
