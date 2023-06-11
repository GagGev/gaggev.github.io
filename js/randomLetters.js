const heading = document.getElementById('heading_text');

function headingRandLetters() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let count = 0;
    const velocity = 3;
    const interval = setInterval(() => {
        heading.innerText = heading.innerText.split('')
        .map((letter, index) => {
            if (velocity * index <= count) {
                return heading.dataset.text[index];
            }
            
            return letters[Math.floor(Math.random() * letters.length)];
        }).join('');

        if(count >= velocity * heading.dataset.text.length) {
            clearInterval(interval);
        }

        count += 1;
    }, 30);
}

function onLoad() {
    headingRandLetters();
}

onLoad();