// Fish drift through the underwater layer behind content.
// Capped at MAX_FISH concurrent, slower + smaller than before,
// and completely disabled for prefers-reduced-motion users.

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        return;
    }

    const container = document.getElementById('fishLayer');
    if (!container) {
        return;
    }

    const MAX_FISH = 30;
    const SPAWN_MIN_MS = 1000;
    const SPAWN_MAX_MS = 4000;
    let active = 0;

    function generateFish() {
        if (active >= MAX_FISH) {
            return;
        }

        const fish = document.createElement('div');
        const fishType = Math.floor(Math.random() * 3) + 1;
        const goingRight = Math.random() < 0.5;

        fish.className = 'fish';
        fish.style.backgroundImage = "url('images/fish" + fishType + ".png')";
        fish.style.width = '500px';
        fish.style.height = '225px';
        fish.style.backgroundSize = 'contain';
        fish.style.backgroundRepeat = 'no-repeat';

        // Distribute across (almost) the full container height. Each type
        // occupies a loose band so small / medium / large fish layer
        // naturally: small up top, mid in the middle, big near the bottom.
        let topPct;
        let scale;
        if (fishType === 1) {
            topPct = Math.random() * 30;              // 0 - 30%
            scale  = (Math.random() + 1) / 8;          // 0.125 - 0.25
        } else if (fishType === 2) {
            topPct = Math.random() * 40 + 25;         // 25 - 65%
            scale  = (Math.random() + 1) / 8;          // 0.125 - 0.25
        } else {
            topPct = Math.random() * 35 + 55;         // 55 - 90%
            scale  = (Math.random() + 1) / 3.5;        // 0.286 - 0.571
        }
        fish.style.top = topPct + '%';

        // Flip horizontally when swimming right-to-left so the fish faces
        // the direction it's travelling.
        const xScale = goingRight ? scale : -scale;
        fish.style.transform = 'scale(' + xScale + ', ' + scale + ')';
        fish.style.left = goingRight ? '-500px' : 'calc(100% + 500px)';

        const ascendTime = Math.random() * 20 + 40;
        const anim = goingRight ? 'fishHorizontal' : 'fishHorizontalReverse';
        fish.style.animation =
            anim + ' ' + ascendTime + 's ease-in-out, ' +
            'fishVertical ' + (Math.random() * 1 + 1.5) + 's ease-in-out infinite alternate';

        const cleanup = function () {
            if (fish.parentElement) {
                fish.remove();
                active -= 1;
            }
        };

        active += 1;
        container.appendChild(fish);
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

    window.stopFish = randomInterval(generateFish, SPAWN_MIN_MS, SPAWN_MAX_MS);
})();
