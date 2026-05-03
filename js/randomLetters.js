// Name-scramble effect. Runs once after load and re-triggers
// on hover or focus of the heading. Respects prefers-reduced-motion.

(function () {
    const heading = document.getElementById('heading_text');
    if (!heading) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        heading.innerText = heading.dataset.text;
        return;
    }

    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    const VELOCITY = 3;
    const TICK_MS = 30;
    let running = false;

    function scramble() {
        if (running) {
            return;
        }
        running = true;

        const target = heading.dataset.text;
        let count = 0;

        const interval = setInterval(function () {
            heading.innerText = target
                .split('')
                .map(function (_, index) {
                    if (VELOCITY * index <= count) {
                        return target[index];
                    }
                    if (target[index] === ' ') {
                        return ' ';
                    }
                    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
                })
                .join('');

            if (count >= VELOCITY * target.length) {
                clearInterval(interval);
                heading.innerText = target;
                running = false;
            }

            count += 1;
        }, TICK_MS);
    }

    scramble();

    // Re-trigger on hover or keyboard focus, but rate-limit so it
    // doesn't stack when the user lingers.
    let cooldown = false;
    function maybeRun() {
        if (cooldown || running) {
            return;
        }
        cooldown = true;
        scramble();
        setTimeout(function () { cooldown = false; }, 900);
    }

    heading.addEventListener('mouseenter', maybeRun);
    heading.addEventListener('focus', maybeRun);
    heading.tabIndex = 0;
})();
