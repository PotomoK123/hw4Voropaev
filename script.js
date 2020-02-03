class Figure {
    constructor(x, y, velocityX, velocityY, color, type, number, speed) {
        this.x = x;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.y = y;
        this.color = color;
        this.type = type;
        this.number = number;
        this.speed = speed;

    }
    changeDirection() {
        let randomVelocity = Math.random();
        if (this.velocityX > 0 && this.velocityY > 0) {
            this.velocityX = -randomVelocity * this.speed;
            this.velocityY = (-1 + randomVelocity) * this.speed;
        } else if (this.velocityX > 0 && this.velocityY < 0) {
            this.velocityX = -randomVelocity * this.speed;
            this.velocityY = (1 - randomVelocity) * this.speed;
        } else if (this.velocityX < 0 && this.velocityY < 0) {
            this.velocityX = randomVelocity * this.speed;
            this.velocityY = (1 - randomVelocity) * this.speed;
        } else {
            this.velocityX = randomVelocity * this.speed;
            this.velocityY = (-1 + randomVelocity) * this.speed;
        }
    }
}
class Circle extends Figure {
    constructor(radius, ...args) {
        super(...args);
        this.radius = radius;
    }
    draw(context, canvas) {
        context.beginPath();
        context.fillStyle = this.color;
        context.lineWidth = 5;
        context.strokeStyle = "#000";
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
        this.update(canvas);
    }
    clear(context) {
        context.beginPath();
        context.fillStyle = "#ddd";
        context.lineWidth = 5;
        context.strokeStyle = "#ddd";
        context.arc(this.x - this.velocityX, this.y - this.velocityY, this.radius + 5, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
    }
    update(canvas) {

        if (this.x + this.radius >= canvas.width) {
            let randomVelocity = -1 * Math.random();
            this.velocityX = randomVelocity * this.speed;
            this.velocityY > 0 ? this.velocityY = (1 + randomVelocity) * this.speed : this.velocityY = (-1 - randomVelocity) * this.speed;
        } else if (this.x - this.radius <= 0) {
            let randomVelocity = Math.random();
            this.velocityX = randomVelocity * this.speed;
            this.velocityY > 0 ? this.velocityY = (1 - randomVelocity) * this.speed : this.velocityY = (-1 + randomVelocity) * this.speed;
        }
        if (this.y + this.radius >= canvas.height) {
            let randomVelocity = -1 * Math.random();
            this.velocityY = randomVelocity * this.speed;
            this.velocityX > 0 ? this.velocityX = (1 + randomVelocity) * this.speed : this.velocityX = (-1 - randomVelocity) * this.speed;
        } else if (this.y - this.radius <= 0) {
            let randomVelocity = Math.random();
            this.velocityY = randomVelocity * this.speed;
            this.velocityX > 0 ? this.velocityX = (1 - randomVelocity) * this.speed : this.velocityX = (-1 + randomVelocity) * this.speed;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}
class Square extends Figure {
    constructor(width, ...args) {
        super(...args);
        this.width = width;
    }
    draw(context, canvas) {
        context.beginPath();
        context.fillStyle = this.color;
        context.lineWidth = 5;
        context.strokeStyle = "#000";
        context.rect(this.x, this.y, this.width, this.width);
        context.fill();
        context.stroke();
        this.update(canvas);
    }
    clear(context) {
        context.beginPath();
        context.fillStyle = "#ddd";
        context.lineWidth = 5;
        context.strokeStyle = "#ddd";
        context.rect(this.x - 5, this.y - 5, this.width + 10, this.width + 10);
        context.fill();
        context.stroke();
    }
    update(canvas) {

        if (this.x + this.width >= canvas.width) {
            let randomVelocity = -1 * Math.random();
            this.velocityX = randomVelocity * this.speed;
            this.velocityY > 0 ? this.velocityY = (1 + randomVelocity) * this.speed : this.velocityY = (-1 - randomVelocity) * this.speed;
        } else if (this.x <= 0) {
            let randomVelocity = Math.random();
            this.velocityX = randomVelocity * this.speed;
            this.velocityY > 0 ? this.velocityY = (1 - randomVelocity) * this.speed : this.velocityY = (-1 + randomVelocity) * this.speed;
        }
        if (this.y + this.width >= canvas.height) {
            let randomVelocity = -1 * Math.random();
            this.velocityY = randomVelocity * this.speed;
            this.velocityX > 0 ? this.velocityX = (1 + randomVelocity) * this.speed : this.velocityX = (-1 - randomVelocity) * this.speed;
        } else if (this.y <= 0) {
            let randomVelocity = Math.random();
            this.velocityY = randomVelocity * this.speed;
            this.velocityX > 0 ? this.velocityX = (1 - randomVelocity) * this.speed : this.velocityX = (-1 + randomVelocity) * this.speed;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}
function trackCollisions(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].number != arr[i].number) {
                if (arr[j].type == arr[i].type && arr[j].radius) {
                    if (arr[i].radius + arr[j].radius + 10 > Math.sqrt(Math.pow(arr[i].x - arr[j].x, 2) + Math.pow(arr[i].y - arr[j].y, 2))) {

                        arr[i].changeDirection();
                        arr[j].velocityX = -arr[i].velocityX;
                        arr[j].velocityY = -arr[i].velocityY;
                        //arr[i].velocityX = -arr[i].velocityX;
                        // arr[i].velocityY = -arr[i].velocityY;
                        //arr[j].velocityX = -arr[j].velocityX;
                        //arr[j].velocityY = -arr[j].velocityY;
                        return;
                    }
                } else if (arr[j].type == arr[i].type && arr[j].width) {
                    if ((Math.pow((arr[i].x - arr[j].x), 2) < Math.pow(arr[i].width, 2) || Math.pow((arr[i].x - arr[j].x), 2) < Math.pow(arr[j].width, 2)) && (Math.pow((arr[i].y - arr[j].y), 2) < Math.pow(arr[i].width, 2) || Math.pow((arr[i].y - arr[j].y), 2) < Math.pow(arr[j].width, 2))) {
                        arr[i].changeDirection();
                        arr[j].velocityX = -arr[i].velocityX;
                        arr[j].velocityY = -arr[i].velocityY;
                        return;
                    }
                }
            }
        }
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function randomColor() {
    let color = "rgb(" + getRandomInt(255) + ", " + getRandomInt(255) + ", " + getRandomInt(255) + ")";
    return color;
}
function init() {
    let canvas = document.querySelector("#myCanvas");
    let context = canvas.getContext("2d");
    let figures = [];
    let speed = 1;
    let x = 0;
    let circles = 0;
    let squares = 0;
    let timer = setInterval(() => {
        let randomInt = getRandomInt(20) + 20;

        if (Math.random() > 0.5 && circles < 10) {
            figures.push(new Circle(randomInt, randomInt, randomInt, 1, 1, randomColor(), "circle", x, speed));
            circles++;
        } else if (squares < 10) {
            figures.push(new Square(randomInt, 0, 0, 1, 1, randomColor(), "square", x, speed));
            squares++;
        } else {
            figures.push(new Circle(randomInt, randomInt, randomInt, 1, 1, randomColor(), "circle", x, speed));
        }
        console.log(figures[x]);
        x++;
        if (x >= 20) {
            clearInterval(timer);
            console.log(figures);
        }
    }, 5000);
    setInterval(() => {
        for (let i = 0; i < figures.length; i++) {
            figures[i].clear(context);
            //context.clearRect(circles[i].x - circles[i].radius - 10, circles[i].y - circles[i].radius - 10, circles[i].x + circles[i].radius + 10, circles[i].y + circles[i].radius + 10);
            figures[i].draw(context, canvas);
        }

    }, 4);

    setInterval(() => {
        trackCollisions(figures);
    }, 10);
}

init();