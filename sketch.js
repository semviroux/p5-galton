const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;

let engine = Engine.create();
engine.timing.timeScale = 0.5;

const BOX_SIZE = 20;
const OBJECTS = [];

let pixelCopy;
let showObjects = false;

function setup() {
    let canvas = createCanvas(640, 800);

    // let ground = Bodies.rectangle(width / 2, height + 20, width, 10, {
    //     isStatic: true,
    // });
    // Composite.add(engine.world, ground);

    background(205);
    loadPixels();
    pixelCopy = pixels.slice();

    createBoard();
    dropBoxes();
}

function draw() {
    Engine.update(engine);

    updatePixels();
    pixels = pixelCopy;

    // filter(ERODE);
    // filter(DILATE);
    // filter(BLUR, 1);
    rectMode(CENTER);
    fill(255, 255, 255, 5);
    rect(width / 2, height / 2, width, height);
    for (let object of OBJECTS) object.updateBackground();

    loadPixels();
    pixelCopy = pixels.slice();

    if (showObjects) for (let object of OBJECTS) object.show();

    for (let i = OBJECTS.length - 1; i >= 0; i--)
        if (OBJECTS[i].deactivated) OBJECTS.splice(i, 1);
}

function createPyramid() {
    const nbRows = 14;
    const space = BOX_SIZE / sqrt(2);
    const y0 = 80;

    for (let row = 0; row < nbRows; row++) {
        let x0 = width / 2 - ((row + 1) * space) / 2;
        let y = y0 + (row * space * sqrt(3)) / 2;
        for (let pin = 0; pin < row + 2; pin++) {
            OBJECTS.push(new Pin(x0 + pin * space, y));
        }
    }
}

function createBoard() {
    const nbRows = 20;
    const space = BOX_SIZE * 1.35 * sqrt(2);
    const y0 = 80;

    for (let row = 0; row < nbRows; row++) {
        let x0 = width / 2 - ((row + 1) * space) / 2;
        let y = y0 + (row * space * sqrt(3)) / 2;
        for (let pin = 0; pin < row + 2; pin++) {
            OBJECTS.push(new Pin(x0 + pin * space, y));
        }
    }
}

async function dropBoxes() {
    while (true) {
        OBJECTS.push(new Box(random(-0.1, 0.1), random(-0.1, 0.1)));
        await sleep(2500);
        if (frameCount > 20000) break;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
}

function mousePressed() {
    showObjects = !showObjects;
}
