const canvasWidth = 600;
const canvasHeight = 600;

// div the shapes will be appended to
const canvas = document.getElementById('canvas');

// square input
const insertSquare = document.getElementById('insert-square');
const sqSideLengthInput = document.getElementById('sq-side-length');

// circle input
const insertCircle = document.getElementById('insert-cir');
const cirRadiusInput = document.getElementById('cir-radius');

// rectangle input
const insertRectangle = document.getElementById('insert-rect');
const rectWidthInput = document.getElementById('rect-width');
const rectHeightInput = document.getElementById('rect-height');

// triangle input
const insertTriangle = document.getElementById('insert-tri');
const triHeightInput = document.getElementById('tri-height');

//Output spans

const nameOutput = document.getElementById('name-display');
const widthOutput = document.getElementById('width-display');
const heightOutput = document.getElementById('height-display');
const radiusDisplay = document.getElementById('radius-display');
const areaDisplay = document.getElementById('area-display')
const perimeterDisplay = document.getElementById('perimeter-display');

// get node list of output spans
const outputSpans = document.querySelectorAll('.describe');

class Shape {
    constructor(height, width) {
        this.height = parseInt(height);
        this.width = parseInt(width);
        this.shapeDiv = document.createElement('div');
        this.shapeDiv.classList.add('shape-div');
        this.shapeDiv.style.height = `${this.height}px`;
        this.shapeDiv.style.width = `${this.width}px`;
        this.posLeft = this.generatePosition();
        this.posTop = this.generatePosition();
        this.adjustPosition();
        this.shapeDiv.style.left = `${this.posLeft}px`;
        this.shapeDiv.style.top = `${this.posTop}px`;
        this.widthTimesHeight = this.width * this.height;
        this.name = 'Shape';
        this.radius = 0;
        this.area = this.widthTimesHeight;
        this.perimeter = (this.height * 2) + (this.width * 2);
        this.shapeDiv.addEventListener('dblclick', () => this.selfDestruct());
        this.shapeDiv.addEventListener('click', () => this.describe());
        canvas.appendChild(this.shapeDiv);
    }

    selfDestruct () {
        this.shapeDiv.outerHTML = '';
        this.clearDescription();
    }

    generatePosition() {
        let position = Math.floor(Math.random() * 600 + 1);
        return position;
    }

    adjustPosition() {
        if (this.posLeft + this.width > canvasWidth) {
            this.posLeft = canvasWidth - this.width ;  
        }

        if (this.posTop + this.height > canvasHeight) {
            this.posTop = canvasHeight - this.height ;  
        }
    }

    describe() {
        console.log(this.name);
        nameOutput.textContent = this.name;
        widthOutput.textContent = this.width;
        heightOutput.textContent = this.height;
        radiusDisplay.textContent = this.radius;
        areaDisplay.textContent = this.area;
        perimeterDisplay.textContent = this.perimeter;
    }

    clearDescription() {
        outputSpans.forEach((span) => {
            span.textContent = '';
        });
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super(sideLength, sideLength);
        this.name = 'Square';
        this.shapeDiv.classList.add('sq-div');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super(radius * 2, radius * 2);
        this.name = 'Circle';
        this.radius = radius;
        this.area = (Math.PI * this.radius * this.radius).toFixed(1);
        this.perimeter = (2 * Math.PI * this.radius).toFixed(1);
        this.shapeDiv.classList.add('cir-div');
    }
}

class Rectangle extends Shape {
    constructor(height, width) {
        super(height, width);
        this.name = 'Rectangle';
        this.shapeDiv.classList.add('rect-div');
    }
}

class Triangle extends Shape {
    constructor(height) {
        super(height, height);
        console.log(this.height);
        console.log(this.width);
        this.name = 'Triangle';
        this.shapeDiv.style.width = 0;
        this.shapeDiv.style.height = 0;
        this.shapeDiv.style.borderLeftWidth = `${this.height / 2}px`;
        this.shapeDiv.style.borderRightWidth = `${this.height / 2}px`;
        this.shapeDiv.style.borderBottomWidth = `${this.height}px`;
        this.shapeDiv.classList.add('tri-div');
        this.area = .5 * this.area;
        this.perimeter = (2 * this.height + Math.sqrt(2) * this.height).toFixed(1);
    }
}

// Add event listeners to buttons in order to instantiate objects
insertSquare.addEventListener('click', () => {
    console.log(sqSideLengthInput.value);
    let newSquare = new Square(sqSideLengthInput.value);
});

insertCircle.addEventListener('click', () => {
    let newCircle = new Circle(cirRadiusInput.value);
});

insertRectangle.addEventListener('click', () => {
    let newRectangle = new Rectangle(rectHeightInput.value, rectWidthInput.value);
});

insertTriangle.addEventListener('click', () => {
    let newTriangle = new Triangle(triHeightInput.value);
});

