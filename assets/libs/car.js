const path = require("path");
const Motor = require(path.join(__dirname, "/motor"));
const CollDetection = require(path.join(__dirname, "/coll_detection"));

//Enum for directions of the car
let CarDir = {
    FORWARD: "forward",
    REVERSE: "reverse",
    LEFT: "left",
    RIGHT: "right",
    STOPPED: "stopped"
}


//Car controls the motors
function Car(){
    let inDanger = false;

    let leftMotor = Motor(12, 16);
    let rightMotor = Motor(21, 20);
    let collDetect = CollDetection(10);

    
    collDetect.on("enterdanger", ()=>{
        inDanger = true;
        brake();
    })

    collDetect.on("exitdanger", () => {
        inDanger = false;
    })

    let drive = (dir)=>{
        if(dir == CarDir.FORWARD){
            if(inDanger) return;
            leftMotor.forward();
            rightMotor.forward();
        } else if(dir == CarDir.REVERSE) {
            leftMotor.backward();
            rightMotor.backward();
        }
    }

    let turn = (dir)=>{
        if(dir == CarDir.LEFT){
            leftMotor.backward();
            rightMotor.forward();
        } else if(dir == CarDir.RIGHT){
            leftMotor.forward();
            rightMotor.backward();
        }
    }

    let brake = ()=>{
        leftMotor.stop();
        rightMotor.stop();
    }

    return {
        drive,
        turn,
        brake,
        collDetect
    }
}

module.exports = {
    Car,
    CarDir
}