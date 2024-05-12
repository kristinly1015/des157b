let brushSize = 5;
let selectedColor = '#000000';

function setup() {
    let canvas = createCanvas(600, 390);
    canvas.parent('canvasbox');
    background(255);

    $('#selectcolor').change(function() {
        selectedColor = $(this).val();
    });

    $('#thickslider').change(function() {
        brushSize = $(this).val();
    });
}

function draw() {
    if (mouseIsPressed) {
        stroke(selectedColor); // Set stroke color
        strokeWeight(brushSize); // Set stroke weight
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}