// Rising bubbles in the underwater layer.
// Capped at MAX_BUBBLES concurrent, slower than before,
// and completely disabled for prefers-reduced-motion users.

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        return;
    }

    const container = document.getElementById('bubbleContainer');
    if (!container) {
        return;
    }

    const MAX_BUBBLES = 20;
    const SPAWN_MIN_MS = 1000;
    const SPAWN_MAX_MS = 2200;
    let active = 0;

    function generateBubble() {
        if (active >= MAX_BUBBLES) {
            return;
        }

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.transform = 'scale(' + (Math.random() * 0.45 + 0.25) + ')';

        const ascendTime = (Math.random() * 6 + 9);
        bubble.style.animation =
            'bubbleVertical ' + ascendTime + 's linear, ' +
            'bubbleHorizontal ' + (Math.random() * 1 + 1.5) + 's ease-in-out infinite alternate';

        const cleanup = function () {
            if (bubble.parentElement) {
                bubble.remove();
                active -= 1;
            }
        };
        bubble.addEventListener('click', cleanup);

        active += 1;
        container.appendChild(bubble);
        setTimeout(cleanup, ascendTime * 1000);
    }

    function randomInterval(func, minDelay, maxDelay) {
        let timeout;
        const run = function () {
            timeout = setTimeout(run, Math.random() * (maxDelay - minDelay) + minDelay);
            func();
        };
        run();
        return function () { clearTimeout(timeout); };
    }

    window.stopBubbles = randomInterval(generateBubble, SPAWN_MIN_MS, SPAWN_MAX_MS);
})();
