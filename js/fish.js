// a function to generate a random fish and add it to the bubbleContainer
function GenerateRandomFish() {
    // getting the bubbleContainer
    const fishContainer = document.getElementById("bubbleContainer");
    var fish = document.createElement("div");

    // setting the background image from one of the fish images (fish1 to fish4)
    var fishType = Math.floor(Math.random() * 3 + 1);
    fish.style.backgroundImage = "url('images/fish" + fishType + ".png')";

    // setting div to fit the background image
    fish.style.width = "500px";
    fish.style.height = "225px";
    fish.style.backgroundSize = "contain";
    fish.style.backgroundRepeat = "no-repeat";

    // setting the fish's class, position, size, and animation
    fish.className = "fish";
    fish.style.left = "-500px";
    // change the top and scale parameters depending on the fish type
    if(fishType == 1) {
        fish.style.top = Math.random() * 20 + 30 + "%";
        fish.style.transform = "scale(" + (Math.random() + 1) / 6 + ")";
    }
    else if(fishType == 2) {
        fish.style.top = Math.random() * 30 + 40 + "%";
        fish.style.transform = "scale(" + (Math.random() + 1) / 6 + ")";
    }
    else if(fishType == 3) {
        fish.style.top = Math.random() * 30 + 60 + "%";
        fish.style.transform = "scale(" + (Math.random() + 1) / 2 + ")";
    }
    const ascendTime = (Math.random() * 20 + 20);
    fish.style.animation = "fishHorizontal " + ascendTime + "s ease-in-out, fishVertical " + (Math.random() * 1 + 1) + "s ease-in-out infinite alternate";

    // we want to remove the fish after it's done going right
    setTimeout(function() {
        fish.remove();
    }
    , ascendTime * 1000);

    // finally, add the fish to the container
    fishContainer.appendChild(fish);
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
var stopFish = RandomInterval(GenerateRandomFish, 5000, 10000);
