let root = {
    waveColor: {
        r: 125,
        g: 52,
        b: 253
    },
    rainbowSpeed: 0.5,
    rainbow: true,
    matrixSpeed: 50,
    useCustomCharacters: false,
    customCharacterSet: "",
    fontSize: 14
};

let defaultCharacterSet
    = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789";

let c = document.getElementById("c");
let ctx = c.getContext("2d");

let hueFw = false;
let hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

let konkani = (root.useCustomCharacters)
    ? root.customCharacterSet
    : defaultCharacterSet;
let characters = konkani.split("");
let font_size = root.fontSize;

let columns = c.width / font_size;    // number of columns for the rain
let gradient = ctx.createLinearGradient(0, 10, 0, 200);

// an array of drops - one per column
let drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

// drawing the characters
function draw() {
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail

    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = root.fontSize + "px arial";


    // looping over drops
    for (var i = 0; i < drops.length; i++) {
        // background color
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillRect(i * root.fontSize, drops[i] * root.fontSize, root.fontSize, root.fontSize);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size

        if (root.rainbow) {
            hue += (hueFw) ? 0.01 : -0.01;
            var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
            var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
            var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
            ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
            ctx.fillStyle = 'rgba(' + root.waveColor.r + ',' + root.waveColor.g + ',' + root.waveColor.b + ')';
        }

        ctx.fillText(text, i * root.fontSize, drops[i] * root.fontSize);
        // Incrementing Y coordinate
        drops[i]++;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * root.fontSize > c.height && Math.random() > 0.975)
            drops[i] = 0;
    }
}

window.onresize = () => {
    location.reload();
}

setInterval(draw, root.matrixSpeed);

function livelyPropertyListener(name, val) {
    switch (name) {
        case "matrixColor":
            root.waveColor = hexToRgb(val);
            break;
        case "rainBow":
            root.rainbow = val;
            break;
        case "rainbowSpeed":
            root.rainbowSpeed = val / 100;
            break;
        case "useCustomCharacters":
            root.useCustomCharacters = val;
            break;
        case "customCharacters":
            root.customCharacterSet = val;
            break;
    }
    updatePropertyValues();
}

function updatePropertyValues() {
    konkani = (root.useCustomCharacters)
        ? root.customCharacterSet
        : defaultCharacterSet;
    characters = konkani.split("");
    font_size = root.fontSize;

    columns = c.width / font_size;    // number of columns for the rain
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

