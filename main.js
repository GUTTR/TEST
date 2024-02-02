const image = document.getElementById('360Image');
let isDragging = false;
let startX, currentX, previousX;

image.addEventListener('mousedown', startDragging);
image.addEventListener('mousemove', handleDragging);
image.addEventListener('mouseup', stopDragging);
image.addEventListener('mouseleave', stopDragging);

function startDragging(event) {
    isDragging = true;
    startX = event.clientX;
    previousX = startX;
}

function handleDragging(event) {
    if (isDragging) {
        currentX = event.clientX;
        const rotationDelta = (currentX - previousX) * 0.5; // Adjust sensitivity
        image.style.transform = `rotateY(${rotationDelta}deg)`;
        previousX = currentX;
    }
}

function stopDragging() {
    isDragging = false;
}

// Prevent right-click context menu on the image
image.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

