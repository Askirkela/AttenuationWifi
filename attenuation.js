var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var signalThroughAir = {
    "2.4Ghz": [46, 52, 56, 60, 64, 66, 74, 80, 88, 94],
    "5.8GHz": [54, 58, 63, 68, 71, 74, 82, 88, 96, 102]
    };

var signalThroughMaterial = {
    "2.4Ghz": [3, 4, 5, 4, 6, 9, 15, 18, 23, 3, 13, 10, 19],
    "5.8GHz": [4, 5, 9, 7, 10, 13, 25, 30, 35, 8, 20, 20, 32]
    };

var tools = ["source", "receptor", "room", "none"];
var currentTool = "none";
var existingSource = false;
var sourceStrength = 0;
/**
	Selects the signal's source (2.4GHz or 5.8GHz)
 */
function selectSource() {
	if(currentTool === tools[0] && !existingSource) {
		currentTool = tools[0];
		sourceStrength;
		console.log("Current tool : source");
	}
}

/**
	Places the source on the canvas
 */
function placeSource() {
	if(currentTool === tools[0] && !existingSource) {
		source["x"] = mousePos["x"];
		source["y"] = mousePos["y"];
		existingSource = true;
	}
}

/**
	Selects the receptor
 */
function selectReceptor() {
	if(currentTool === tools[1]) {
	}
}

/**
	Places the receptor on the canvas
 */
function placeReceptor() {
	if(currentTool === tools[1]) {
	}
}

/**
	Selects the wall material
 */
function selectMaterial() {
	if(currentTool === tools[2]) {
	}
}

/** 
	Draws a rectangle with the right material
 */
function placeRoom() {
	if(currentTool === tools[2]) {
	}
}

/**
	Calculates the distance between source and receptor
 */
function getDistance(source, receptor) {
	return Math.sqrt(Math.pow(source.x - source.y, 2) + Math.pow(receptor.x - receptor.y));
}

/**
	Calculates the signal's attenuation from source to receptor
 */
function getAttenuation() {

}

/**
	Returns a quality value for the signal
 */
function getSignalStrength() {

}

/*function drawUI() {
	context.beginPath();
	context.rect(10, 10, 10, 10);
	context.fillStyle = "yellow";
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = "black";
	context.stroke();
}*/


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   	};
}

function writeMessage(canvas, message, x, y) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, x, y);
}

var mousePos; 
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
      }, false);
canvas.addEventListener('mouseButtonDown', function(evt) {
	var pos = getMousePos(canvas, evt);
	//if (/*in ui, act as ui*/)
});

