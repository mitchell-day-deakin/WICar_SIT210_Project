const GPIO = require("onoff").Gpio;
const Event = require("events");

function HcSr04() {
    let startDistance; //start distance for zone
    let endDistance; //end distance of zone - stop, stop, stop
    let isInZone = false;
    let listenerStarted = false;

    //event callbacks
    let inzoneCallback = false;
    let dangerCloseCallback = false;

    let init = (trigAdd, echoAdd, startDist, endDist) => {
        startDistance = startDist ? startDist : 100;
        endDistance = endDist ? endDist : 400;
    }


    let getDistance = () => {
        let distance = Math.random()*800;
        return distance;
    }


    let loop = ()=>{
        setInterval(() => {
            if (!listenerStarted) clearInterval(loop); //if no listener has been defined, return;
            let distance = getDistance();
            console.log("Loop value:"+distance);
            if (distance < startDistance) {
                dangerCloseCallback();
            } else if (distance < endDistance) {
                inzoneCallback();
            }

        }, 2000)
    }


    /**
     * listeners for dangerclose and inzone events from device
     * @param {String} eventType 
     * @param {Callback} callback 
     */
    let on = (eventType, callback) => {
        switch (eventType) {
            case "inzone":
                if (!listenerStarted) loop();
                inzoneCallback = callback;
                break;
            case "dangerclose":
                if (!listenerStarted) loop();
                dangerCloseCallback = callback;
                break;
            default:
                callback({error: true});
        }

    }

    return {
        init,
        on
    }
}

let device = HcSr04();
device.init(1, 2, 100, 400)

device.on("inzone", _ => {
    console.log("in zone")
})

device.on("dangerclose", _ => {
    console.log("danger")
})