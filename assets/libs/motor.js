const path = require("path");
const GPIO = require("onoff").Gpio;

/**
 * Motor controls a DC motor. Go forward, reverse or stop
 * @param {int} addOne The address of the first input controller of the motor
 * @param {int} addTwo The address of the second input controller of the motor
 * @returns Object
 */
function Motor(addOne, addTwo){
    let fGpio = new GPIO(addOne, 'out');
    let bGpio = new GPIO(addTwo, 'out');

    let forward = ()=>{
        bGpio.write(0, (err)=>{
            if (err) throw err;
            fGpio.write(1);
        });
    }

    let backward = ()=>{
        fGpio.write(0, (err)=>{
            if (err) throw err;
            bGpio.write(1);
        });
    }

    let stop = ()=>{
        fGpio.write(0);
        bGpio.write(0);
    }

    return {
        forward,
        backward,
        stop
    }
}

module.exports = Motor;