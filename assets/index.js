const path = require("path");
let GPIO = require("onoff").Gpio;
const {Car,CarDir} = require(path.join(__dirname, "/libs//car"));
const WebServer = require(path.join(__dirname, './/webserver'));
const AutoDrive = require(path.join(__dirname, "/libs//auto_drive"));

const car = Car();
let auto = AutoDrive(car);
const statusLed = new GPIO(26, 'out');
const modeLed = new GPIO(19, 'out');

//functions for handling the car

let driveForward = () => {
    auto.stopAuto();
    modeLed.write(0);
    car.drive(CarDir.FORWARD);
}

let driveBackward = () => {
    modeLed.write(0);
    auto.stopAuto(0);
    car.drive(CarDir.REVERSE);
}

let stop = () => {
    auto.stopAuto();
    modeLed.write(0);
    car.brake()
}

let turnLeft = () => {
    auto.stopAuto();
    modeLed.write(0);
    car.turn(CarDir.LEFT);
}

let turnRight = () => {
    modeLed.write(0);
    auto.stopAuto();
    car.turn(CarDir.RIGHT);
}

let autoDrive = () => {
    modeLed.write(1);
    auto.start();
}


function webEventHandler(evt) {
    if (evt.event == "up") return stop();
    switch (evt.task) {
        case "up":
            driveForward();
            break;
        case "down":
            driveBackward();
            break;
        case "left":
            turnLeft();
            break;
        case "right":
            turnRight();
            break;
        case "auto":
            autoDrive();
	    break;
        default:
            stop();
            break;
    }
}

let webServer = WebServer((msg) => {
    console.log(msg);
    statusLed.write(1)
}, webEventHandler
);




