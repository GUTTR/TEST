const viewerContainer = document.getElementById('viewer-container');
const image = document.getElementById('360-image');

let isDragging = false;
let previousX = 0;

// Add touch events for dragging on mobile
viewerContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousX = e.touches[0].clientX;
});

viewerContainer.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - previousX;
        image.style.transform += `rotateY(${deltaX}deg)`;
        previousX = e.touches[0].clientX;
    }
});

viewerContainer.addEventListener('touchend', () => {
    isDragging = false;
});

// Add device orientation event for mobile users
window.addEventListener('deviceorientation', (e) => {
    const alpha = e.alpha || 0;
    image.style.transform = `rotateY(${alpha}deg)`;
});

// Add pinch-to-zoom support
let initialDistance = 0;

viewerContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
});

viewerContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        const delta = currentDistance - initialDistance;
        const scale = Math.max(0.5, Math.min(2, delta / 100));

        image.style.transform = `scale(${scale}) rotateY(${alpha}deg)`;
    }
});

viewerContainer.addEventListener('touchend', () => {
    initialDistance = 0;
});

