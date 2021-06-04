const Gpio = require('pigpio').Gpio;
let startTime = new Date().getTime();

function CollDetection(start) {
    let startDistance = start; //start distance for zone
    const SPEED = 1e6/34321;

    let listenerStarted = false;
    let distance = 1000;
    let oldDistance = 1000; //used to determine if the car had gone from danger zone back out

    //hc-sr04 trigger and echo Gpios
    const trigger = new Gpio(5, {mode: Gpio.OUTPUT});
    const echo = new Gpio(6, {mode: Gpio.INPUT, alert: true});

    //event callbacks
    let inzoneCallback = false;
    let dangerCloseCallback = false;


    //starts the echo Gpio listener and listens for send and recieve ticks
    let getDistance = () => {
        let startTick;
        echo.on('alert', (level, tick)=>{
            if(level == 1){
                startTick = tick;
            } else {
                const tickDiff = (tick >> 0) - (startTick >> 0);
                distance = tickDiff/2/SPEED;
            }
	    //console.log(distance, oldDistance);
        })
    }

    getDistance();


    //runs a loop that triggers the trigger, and check the distance value
    //runs the dangerCloseCallback when it enters the danger zone.
    //runs the inzoneCallback when it leaves the danger zone
    let loop = ()=>{
        setInterval(() => {
            trigger.trigger(10,1);
            if (!listenerStarted) clearInterval(loop); //if no listener has been defined, return;
            if (distance < startDistance && oldDistance > startDistance) {
		        dangerCloseCallback();
            } else if (distance > startDistance && oldDistance < startDistance) {
                inzoneCallback();
            }
            //save the new distance in old distance, to compare against in the next loop
            oldDistance = distance;

        }, 300);
    }


    /**
     * listeners for dangerclose and inzone events from device
     * @param {String} eventType 
     * @param {CallbackFunction} callback 
     */
    let on = (eventType, callback) => {
        switch (eventType) {
            case "exitdanger":
                if (!listenerStarted) loop();
		        listenerStarted = true;
                inzoneCallback = callback;
                break;
            case "enterdanger":
                if (!listenerStarted) loop();
		        listenerStarted = true;
                dangerCloseCallback = callback;
                break;
            default:
                callback({error: true});
        }
    }
    return {
        on
    }
}

module.exports = CollDetection


//testing code
/*let device = CollDetection(5,15);

device.on("exitdanger", _ => {
    console.log("in zone")
})

device.on("enterdanger", _ => {
    console.log("danger")
})*/