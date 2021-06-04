const control = {left: null, right: null, up: null, down: null, auto: null};
let autoButtonState = "up"; 

control.up = document.getElementById("up_img");
control.down = document.getElementById("down_img");
control.left = document.getElementById("left_img");
control.right = document.getElementById("right_img");
control.auto = document.getElementById("auto");


function handleTouchDown(evt){
    handleTouch(evt, "down");
}

function handleTouchUp(evt){

    handleTouch(evt, "up");
    evt.preventDefault()
}

//event handler for arrow touch events
function handleTouch(evt, event){
    let imgString = event == "up" ? "../media/back_button.png" : "../media/back_button_s.png";
    switch(evt.target.id){
        case "up_img":
            httpRequest("GET", "/event", {task: "up", event})
            control.up.style.backgroundImage = `url(${imgString})`;
            break;
        case "down_img":
            httpRequest("GET", "/event", {task: "down", event})
            control.down.style.backgroundImage = `url(${imgString})`;
            break;
        case "left_img":
            httpRequest("GET", "/event", {task: "left", event})
            control.left.style.backgroundImage = `url(${imgString})`;
            break;
        case "right_img":
            httpRequest("GET", "/event", {task: "right", event})
            control.right.style.backgroundImage = `url(${imgString})`;
            break;
        default:
            break;
    }
}

function handleAutoTouch(){
    let autoPos = autoButtonState == "up" ? 45  : 0;
    if(autoButtonState == "up"){
        httpRequest("GET", "/event", {task: "auto", event: "down"})
        control.auto.style.transform = `rotate(${autoPos}deg)`;
        autoButtonState = "down"
    } else {
        httpRequest("GET", "/event", {task: "auto", event: "up"})
        control.auto.style.transform = `rotate(${autoPos}deg)`;
        autoButtonState = "up";
    }
}


//event listeners for each arrow
control.right.addEventListener('touchstart', handleTouchDown);
control.right.addEventListener('touchend', handleTouchUp);
control.right.addEventListener('mousedown', handleTouchDown);
control.right.addEventListener('mouseup', handleTouchUp);

control.left.addEventListener('touchstart', handleTouchDown);
control.left.addEventListener('touchend', handleTouchUp);
control.left.addEventListener('mousedown', handleTouchDown);
control.left.addEventListener('mouseup', handleTouchUp);

control.up.addEventListener('touchstart', handleTouchDown);
control.up.addEventListener('touchend', handleTouchUp);
control.up.addEventListener('mousedown', handleTouchDown);
control.up.addEventListener('mouseup', handleTouchUp);

control.down.addEventListener('touchstart', handleTouchDown);
control.down.addEventListener('touchend', handleTouchUp);
control.down.addEventListener('mousedown', handleTouchDown);
control.down.addEventListener('mouseup', handleTouchUp);

control.auto.addEventListener('click', handleAutoTouch);
control.auto.addEventListener('touch', handleAutoTouch);


