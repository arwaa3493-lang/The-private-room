// ===== VISION JS =====

// Select the vision board and add card button
const visionBoard = document.querySelector('.vision-board');
const addCardBtn = document.getElementById('addCardBtn');

// Function to create a new vision card
function createVisionCard(title = 'New Vision') {
    const card = document.createElement('div');
    card.classList.add('vision-card');

    // Editable title
    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.contentEditable = true; // user can edit the title
    h3.style.cursor = 'text';
    card.appendChild(h3);

    // Upload image area
    const label = document.createElement('label');
    label.classList.add('upload-box');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none'; // hide the default input

    const span = document.createElement('span');
    span.textContent = 'Upload an image';
    span.style.cursor = 'pointer';

    // Clicking on the span opens file picker
    span.addEventListener('click', () => input.click());

    // When file is selected, display the image
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Remove previous image if exists
                const existingImg = card.querySelector('img');
                if (existingImg) existingImg.remove();

                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;
                img.style.marginTop = '10px';
                img.style.borderRadius = '12px';

                card.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });

    label.appendChild(input);
    label.appendChild(span);
    card.appendChild(label);

    visionBoard.appendChild(card);
}

// Add event listener for the "+ New Vision Card" button
addCardBtn.addEventListener('click', () => {
    createVisionCard();
});

// Initialize: attach file upload to existing cards in HTML
document.querySelectorAll('.vision-card').forEach(card => {
    const input = card.querySelector('input[type="file"]');
    const span = card.querySelector('span');

    // hide input
    input.style.display = 'none';

    // span click triggers file selection
    span.addEventListener('click', () => input.click());

    // file selection displays image
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Remove previous image if exists
                const existingImg = card.querySelector('img');
                if (existingImg) existingImg.remove();

                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;
                img.style.marginTop = '10px';
                img.style.borderRadius = '12px';

                card.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
});