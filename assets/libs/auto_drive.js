const path = require("path");
const {CarDir} = require(path.join(__dirname, "/car"));

function AutoDrive(car){
    let isActive = false;
    let inDanger = false


    car.collDetect.on("enterdanger", ()=>{       
	    if(!isActive) return;
        inDanger = true;
        car.turn(CarDir.RIGHT);
    })

    car.collDetect.on("exitdanger", ()=>{
        if(!isActive) return;
        inDanger = false;
        car.drive(CarDir.FORWARD);
    })

    let start = ()=>{
        isActive = true;
	    car.drive(CarDir.FORWARD);
    }

    let stopAuto = ()=>{
        isActive = false;
    }

    return {
        start,
        stopAuto
    }
}

module.exports = AutoDrive