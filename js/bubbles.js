function GenerateRandomBubble() {
    const bubbleContainer = document.getElementById("bubbleContainer");
    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.top = "0";
    bubble.style.transform = "scale(" + Math.random() / 1.5 + ")";
    const ascendTime = (Math.random() * 5 + 5) * 1.5;
    bubble.style.animation = "bubbleVertical " + ascendTime + "s linear , bubbleHorizontal " + (Math.random() * 1 + 1) + "s ease-in-out infinite alternate";
    // adding the onclick event
    bubble.onclick = function() {
        bubble.remove();
    }
    // but we also want to remove the bubble after it's done ascending
    setTimeout(function() {
        bubble.remove();
    }
    , ascendTime * 1000);
    // finally, add the bubble to the container
    bubbleContainer.appendChild(bubble);
}

// setInterval, but with a random delay
function RandomInterval(func, minDelay, maxDelay) {
    var timeout;
    var runFunc = function() {
        timeout = setTimeout(runFunc, Math.random() * (maxDelay - minDelay) + minDelay);
        func();
    }
    runFunc();
    return function() {
        clearTimeout(timeout);
    }
}

// using the above functions
var stopBubbles = RandomInterval(GenerateRandomBubble, 1000, 2000);
